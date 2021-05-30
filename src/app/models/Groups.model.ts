import { BaseEntity, Column, CreateDateColumn, Entity, getCustomRepository, getManager, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

import { Messages } from "./Messages.model";
import { UserGroup } from "./UserGroup.model";
import { User } from "./Users.model";
import { v4 } from 'uuid';
import { MessageRepository } from "../repositories/MessagesRepository";
@Entity("groups")
export class Group extends BaseEntity {

    constructor() {
        super()
        if (!this.id) {
            this.id = v4();
        }
    }
    @PrimaryColumn({
        primary: true
    })
    id: string;

    @Column({
        type: 'varchar'
    })
    author_id: string;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'boolean'
    })
    is_private: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "author_id" })
    user: User;

    @OneToMany(() => Messages, message => message.group, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    messages: Messages[];

    @OneToMany(() => UserGroup, userGroup => userGroup.group, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user_groups: UserGroup[];

    users?: User[];

    is_online?: boolean;
    last_access_at?: Date;
    lastMsg: string;
    lastMsgTime: string;
    countMsgsUnread: number;

    async getUsers() {
        const usersRepository = getCustomRepository(UsersRepository)
        const users = await usersRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.user_groups', 'user_groups')
            .where('user_groups.group_id = :group_id', { group_id: this.id })
            .select([
                'users.id',
                'users.name',
                'users.phone',
                'users.is_online',
                'users.last_access_at',
            ])
            .getMany()
        this.users = users;
    }

    async getLastMsg() {
        const maneger = getManager()
        const message = await maneger.createQueryBuilder(Messages, 'message')
            .where('message.group_id = :group_id', { group_id: this.id })
            .select([
                'message.text',
                'message.group_id',
                'message.created_at',
            ])
            .orderBy('message.created_at', 'DESC')
            .getOne()
        this.lastMsg = String(message?.text || '');
        this.lastMsgTime = String(message?.created_at || this.created_at);
    }

    async hasUser(userId: string) {
        const usersRepository = getCustomRepository(UsersRepository)
        const usersCount = await usersRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.user_groups', 'user_groups')
            .leftJoinAndSelect('user_groups.user', 'user')
            .andWhere('user_groups.group_id = :group_id', { group_id: this.id })
            .andWhere('user_groups.user_id = :user_id', { user_id: userId })
            .getCount()
        return usersCount > 0;
    }
}