import { createQueryBuilder, getCustomRepository, Repository } from "typeorm"
import { Message } from "../models/Messages"
import { MessagesRepository } from "../repositories/MessagesRepository"
import { IMessageCreate } from "../types/MessageType"

class MessagesService {
    private messagesRepository: Repository<Message>
    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository)
    }
    async create({
        id,
        user_id,
        group_id,
        created_at,
        text
    }: IMessageCreate) {
        const msg = new Message();
        msg.id = String(id);
        msg.user_id = user_id;
        msg.text = text;
        msg.group_id = group_id;
        msg.created_at = created_at;
        await msg.save();
        return msg;
    }
    async getMessagesByGroup(groupId: string){
        const messages = await this.messagesRepository.createQueryBuilder('message')
            .leftJoin('message.group', 'group')
            .where('group.id = :group_id', {group_id: groupId})
            .getMany()
        return messages; 
    }
}

export { MessagesService }