import { io } from "../../server";
import { IMessageCreate } from "../types/MessageType";
// import { Message } from "../models/Messages";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) => {
    const messagesService = new MessagesService();

    socket.on("send_message", async (message: IMessageCreate, callback) => {
        const msg = await messagesService.create(message);
        msg.status = 'sended'
        socket.to(message.group_id).emit('receive_message', msg);
        callback(msg);
    });

    socket.on("get_messages", async (groupId: string, callback) => {
        socket.join(groupId);
        const messages = await messagesService.getMessagesByGroup(groupId);
        messages.forEach(msg => {
            msg.status = 'sended';
        })
        callback(messages);
    });

})