import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";

import { Group } from "./Groups";
import { StatusMsgType } from "../types/MessageType";

@Entity("messages")
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')    
    id: string;

    @Column({
        type: 'varchar'
    })    
    text: string;

    @Column({
        type: 'varchar'
    })
    user_id: string;

    @Column({
        type: 'varchar'
    })
    group_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn({name: "user_id"})
    user: User;

    @ManyToOne(() => Group, group => group.messages)
    @JoinColumn({name: "group_id"})
    group: Group;

    status?: StatusMsgType;

}