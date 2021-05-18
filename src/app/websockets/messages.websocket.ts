import { io } from "../../server";
import { Message } from "../models/Messages";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) => {
    const messagesService = new MessagesService();

    socket.on("admin_list_messages_by_user", async (params, callback) => {
        // const { user_id } = params;
        // let allMessages:Message[] = []
        // try{
        //     allMessages = await messagesService.listByUser(user_id);
        // }
        // catch(err){
        //     console.log('catch admin_list_messages_by_user aqui')
        // }
        // callback(allMessages);
    });

})