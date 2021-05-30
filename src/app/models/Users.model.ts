import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

import { Group } from "./Groups.model";
import { Messages } from "./Messages.model";
import { UserGroup } from "./UserGroup.model";

@Entity("users")
export class User extends BaseEntity {

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
    name: string;

    @Column({
        type: 'varchar'
    })
    phone: string;

    @Column({
        type: 'varchar'
    })
    password?: string;

    @Column({
        type: 'boolean',
        default: true
    })
    is_online: boolean;

    @CreateDateColumn()
    last_access_at: Date;

    @CreateDateColumn()
    created_at?: Date;

    @OneToMany(() => Messages, message => message.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    messages: Messages[];

    @OneToMany(() => UserGroup, userGroup => userGroup.user, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user_groups: UserGroup[];

    groups?: Group[];
}