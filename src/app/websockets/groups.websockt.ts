
import { io } from "../../server";
import { GroupsService } from "../services/GroupService";
import { MessagesService } from "../services/MessagesService";
import { ExtendedSocket, IJwt } from "../types/AuthTypes";

io.on("connect", async (socket) => {

    const extendedSocket = socket as ExtendedSocket;
    const me = extendedSocket?.user as IJwt;
    const groupsService = new GroupsService();
    const messageService = new MessagesService();
    extendedSocket.join(me.id);

    extendedSocket.on("get_my_groups", async (page: number, callback) => {
        const groups = await groupsService.getGroupsByUser(me.id, 'all');
        console.log(groups)
        await Promise.all(groups.map(async gp => {
            await gp.getUsers();
            await gp.getLastMsg();
            return gp;
        }));

        groups.forEach(gp => {
            extendedSocket.join(gp.id);
            if (gp.is_private) {
                const user = gp.users?.find(u => u.id !== me.id);
                gp.name = String(user?.name);
                gp.is_online = user?.is_online;
                gp.last_access_at = user?.last_access_at;
            }
        });

        if(groups.length > 0){
            const groupsIds = groups.map(gp => gp.id);
            messageService.getMessagesByGroups(groupsIds, me.id, 'sended')
                .then(async allMessagesthetIReceived => {
                    const allMsgsIds = allMessagesthetIReceived.map(msg => msg.id);
                    const status = 'received';
                    await messageService.updateStatusMessages(allMsgsIds, 'received');
                    extendedSocket.broadcast.to(groupsIds).emit('update_status_messages', { ids: allMsgsIds, status });
                });
        }

        callback(groups);
    });

    extendedSocket.on("create_private_group", async (userId: string, callback) => {

        // verifica se já existe um grupo com os dois usuários
        let privateGroup = await groupsService.getPrivateGroupByUsers(me.id, userId);

        if (!privateGroup) {
            privateGroup = await groupsService.createPrivateGroup(me.id, userId)
        }
        await privateGroup.getUsers();
        const user = privateGroup.users?.find(u => u.id !== me.id);
        privateGroup.name = String(user?.name);
        privateGroup.lastMsg = '';
        privateGroup.lastMsgTime = String(privateGroup.created_at);
        privateGroup.countMsgsUnread = 0;
        extendedSocket.broadcast.to(userId).emit('add_to_private_group', {
            ...privateGroup,
            name: me.name
        })
        callback(privateGroup);
    });

});