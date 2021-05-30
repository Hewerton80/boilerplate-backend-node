import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

import { Group } from "./Groups.model";
import { User } from "./Users.model";

@Entity("users_groups")
@Index(["user_id", "group_id"])
export class UserGroup extends BaseEntity {

    constructor(){
        super()
        if(!this.id){
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