
import { io } from "../../server";
import { UsersService } from "../services/UsersService";
import { ExtendedSocket, IJwt } from "../types/AuthTypes";

io.on("connect", async (socket) => {
    const extendedSocket = socket as ExtendedSocket;
    const me = extendedSocket?.user as IJwt;
    const userService = new UsersService();

    extendedSocket.on("change_status_user", async (status: number, callback) => {
        await userService.updateUser({ id: me.id, is_online: true });
        
        callback(status);
    });

    extendedSocket.on("disconnecting", async (reason) => {
        console.log('reason: ', reason);
        const myRooms: string[] = [];
        extendedSocket.rooms.forEach(room => {
            if (room !== me.id) {
                myRooms.push(room);
            }
        })
        console.log(myRooms);
        const is_online = false;
        const last_access_at = new Date();
        await userService.updateUser({
            id: me.id,
            is_online,
            last_access_at
        });
        extendedSocket.broadcast.to(myRooms).emit('update_user_status', {
            groupsIds: myRooms,
            is_online,
            last_access_at
        });
    });

});