import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../models/Messages"
import { MessagesRepository } from "../repositories/MessagesRepository"
import { IMessageCreate, StatusMsgType } from "../types/MessageType"

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
    async getMessagesByGroup(groupId: string, page: number) {
        const limitDocsPerPage = 30;
        const messages = await this.messagesRepository.createQueryBuilder('message')
            .leftJoin('message.group', 'group')
            .where('group.id = :group_id', { group_id: groupId })
            .getMany()
        return messages;
    }

    async getMessagesByGroups(groupsIds: string[], meId: string, status: StatusMsgType) {
        let sqlFormat = groupsIds.map(id => `'${id}'`).join(', ')
        const messages = await this.messagesRepository.createQueryBuilder('message')
            .leftJoin('message.group', 'group')
            .andWhere(`group.id IN (${sqlFormat})`)
            .andWhere('message.status = :status', { status })
            .andWhere('message.user_id != :user_id', { user_id: meId })
            .select([
                'message.id',
                'message.group_id'
            ])
            .getMany()
        return messages;
    }

    async updateStatusMessages(ids: string[], status: StatusMsgType) {
        await this.messagesRepository.createQueryBuilder('message')
            .update()
            .set({
                status
            })
            .whereInIds(ids)
            .execute()
    }
}

export { MessagesService }