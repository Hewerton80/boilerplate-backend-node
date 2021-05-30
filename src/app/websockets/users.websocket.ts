
import { io } from "../../server";
import { UsersService } from "../services/UsersService";
import { ExtendedSocket, IJwt } from "../types/AuthTypes";

io.on("connect", async (socket) => {
    const extendedSocket = socket as ExtendedSocket;
    const me = extendedSocket?.user as IJwt;
    const userService = new UsersService();

    extendedSocket.on("change_status_user", async (status: number, callback) => {

        try {
            await userService.updateUser({ id: me.id, is_online: true });
        }
        catch (err) {
            console.log('erro quando o usuário foi logar')
        }

        callback(status);
    });

    extendedSocket.on("disconnect", async (reason) => {
        console.log('reason: ', reason);
        try {
            await userService.updateUser({ id: me.id, is_online: false });
        }
        catch (err) {
            console.log('erro quando o usuário foi deslogar')
        }
    });

});