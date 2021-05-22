import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Group } from "./Groups";
import { Message } from "./Messages";
import { UserGroup } from "./UserGroup";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')    
    id: string;

    @Column({
        type: 'varchar'
    })
    name: string;

    @Column({
        type: 'varchar'
    })
    phone: string;

    @Column({
        type: 'varchar'
    })
    password?: string;

    @CreateDateColumn()
    created_at?: Date;

    @OneToMany(() => Message, message => message.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    messages: Message[];

    @OneToMany(() => UserGroup, userGroup => userGroup.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user_groups: UserGroup[];

    groups?: Group[];
}