export type StatusMsgType = 'pendend' | 'sended' | 'received' | 'readed';

export interface IMessageCreate {
    id?: string;
    user_id: string;
    group_id: string;
    text: string,
    created_at: Date,
    status: StatusMsgType,
}