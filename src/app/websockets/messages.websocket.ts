import { io } from "../../server";
import { IMessageCreate, StatusMsgType } from "../types/MessageType";
import { MessagesService } from "../services/MessagesService";
import { ExtendedSocket, IJwt } from "../types/AuthTypes";

io.on("connect", async (socket) => {
    const extendedSocket = socket as ExtendedSocket;
    const me = extendedSocket?.user as IJwt;
    const messagesService = new MessagesService();

    extendedSocket.on("send_message", async (message: IMessageCreate, callback) => {
        const msg = await messagesService.create(message);
        extendedSocket.broadcast.to(message.group_id).emit('receive_message', msg);
        callback(msg);
    });

    extendedSocket.on("get_messages_by_group", async (page: number, groupId: string, callback) => {
        const status = 'readed';
        const messages = await messagesService.getMessagesByGroup(groupId, page);
        const ids = messages.filter(msg => msg.user_id !== me.id && msg.status !== status).map(msg => msg.id);
        await messagesService.updateStatusMessages(ids, status);
        messages.forEach(msg => {
            if(msg.user_id !== me.id && msg.status !== status){
                msg.status = status;
            }
        })
        extendedSocket.broadcast.to(groupId).emit('update_status_messages', { ids, status });
        callback(messages);
    });

    extendedSocket.on("update_status_message", async (message: IMessageCreate, status: StatusMsgType, callback) => {
        const ids = [message.id];
        await messagesService.updateStatusMessages(ids as string[], status);
        extendedSocket.to(message.group_id).emit('update_status_messages', { ids, status })
        callback(status);
    });
})