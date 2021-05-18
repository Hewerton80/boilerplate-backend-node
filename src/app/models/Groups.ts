import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Message } from "./Messages";
import { UserGroup } from "./UserGroup";
import { User } from "./Users";

@Entity("groups")
export class Group extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
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
    @JoinColumn({name: "author_id"})
    user: User;

    @OneToMany(() => Message, message => message.group, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    messages: Message[];

    @OneToMany(() => UserGroup, userGroup => userGroup.group, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user_groups: UserGroup[];

    users?: User[];
}