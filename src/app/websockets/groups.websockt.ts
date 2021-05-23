
import { getManager } from "typeorm";
import { io } from "../../server";
import { GroupsService } from "../services/GroupService";
import { UsersService } from "../services/UsersService";
import { IJwt } from "../types/AuthTypes";
// import { GroupService } from "../services/GroupService";


io.on("connect", async (socket) => {
    const groupsService = new GroupsService();
    const usersService = new UsersService();
    const me = socket?.user as IJwt;

    socket.on("create_private_group", async (userId: string, callback) => {
        
        // verifica se já existe um grupo com os dois usuários
        let privateGroup = await groupsService.getPrivateGroupByUsers(me.id, userId); 

        if(!privateGroup){
            privateGroup = await groupsService.createPrivateGroup(me.id, userId)
        }
        await privateGroup.getUsers();
        const user = privateGroup.users?.find(u => u.id !== me.id);
        privateGroup.name = String(user?.name);
        privateGroup.lastMsg = '';
        privateGroup.lastMsgTime = '';
        privateGroup.countMsgsUnread = 0;
        callback(privateGroup);
    });

    socket.on("get_my_groups", async (page: number, callback) => {
        const groups = await groupsService.getGroupsByUser(me.id, 'all'); 
        await Promise.all(groups.map(async gp =>{
            await gp.getUsers() ;
            return gp;
        }));
        groups.forEach(gp =>{
            if(gp.is_private){
                const user = gp.users?.find(u => u.id !== me.id);
                gp.name = String(user?.name);
            }
            gp.lastMsg = '';
            gp.lastMsgTime = '12:45';
            gp.countMsgsUnread = 0;
        })

        callback(groups);
    });

})