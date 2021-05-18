import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Group } from "./Groups";
import { User } from "./Users";

@Entity("users_groups")
@Index(["user_id", "group_id"])
export class UserGroup extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @ManyToOne(() => User, user => user.user_groups)
    @JoinColumn({name: "user_id"})
    user: User;

    @ManyToOne(() => Group, group => group.user_groups)
    @JoinColumn({name: "group_id"})
    group: Group;

}