
import { io } from "../../server";
import { Group } from "../models/Groups";
import { GroupsService } from "../services/GroupService";
import { UsersService } from "../services/UsersService";
import { ExtendedSocket, IJwt } from "../types/AuthTypes";
// import { GroupService } from "../services/GroupService";


io.on("connect", async (socket) => {
    const groupsService = new GroupsService();
    const usersService = new UsersService();
    socket.on("create_privaty_group", async (userId: string, callback) => {

        const me = socket?.user as IJwt;
        // verifica se já existe um grupo com os dois usuários
        let privateGroup = await groupsService.getPrivateGroupByUsers(me.id, userId); 

        if(!privateGroup){
            privateGroup = await groupsService.createPrivateGroup(me.id, userId)
        }
        await privateGroup.getUsers();
        callback(privateGroup);

    });

})