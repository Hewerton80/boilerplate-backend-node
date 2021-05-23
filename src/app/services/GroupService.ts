import { compare } from "bcrypt"
import { getCustomRepository, Repository } from "typeorm"
import { Group } from "../models/Groups"
import { UserGroup } from "../models/UserGroup"
import { GroupRepository } from "../repositories/GroupsRepository"
import { UserGroupRepository } from "../repositories/UsersGroupsRepository"

class GroupsService {
    private groupsRepository: Repository<Group>
    private groupUsersRepository: Repository<UserGroup>

    constructor() {
        this.groupsRepository = getCustomRepository(GroupRepository);
        this.groupUsersRepository = getCustomRepository(UserGroupRepository);
    }


    async createPrivateGroup(authorId: string, otherUserId: string) {
        const privateGroup = new Group();
        privateGroup.is_private = true;
        privateGroup.name = 'private';
        privateGroup.author_id = authorId;

        await privateGroup.save();

        const authorGroup = new UserGroup();
        authorGroup.user_id = authorId;
        authorGroup.group_id = privateGroup.id;

        const otherUserGroup = new UserGroup();
        otherUserGroup.user_id = otherUserId;
        otherUserGroup.group_id = privateGroup.id;

        await Promise.all([
            authorGroup.save(),
            otherUserGroup.save()
        ]);

        return privateGroup;
    }

    async getGroupsByUser(userId: string, type: 'private' | 'public' | 'all') {
        const query = this.groupsRepository.createQueryBuilder('groups')
            .leftJoinAndSelect('groups.user_groups', 'user_groups')
            .andWhere('user_groups.user_id = :user_id', { user_id: userId })
            .select([
                'groups.id',
                'groups.name',
                'groups.is_private',
                'groups.created_at'
            ])
        if (type === 'private') {
            query.andWhere('groups.is_private = :is_private', { is_private: true })
                // .leftJoinAndSelect('user_groups.user', 'user')
                // .leftJoinAndMapOne('user_groups.user', 'user_groups.user', 'user', 'user.id != :user_id', { user_id: userId })
                // .addSelect(['user'])
        }
        else if(type === 'public'){
            query.andWhere('groups.is_private = :is_private', { is_private: false })
        }
        const groups = await query.getMany()
        return groups;
    }
    async getPrivateGroupByUsers(meId: string, otherUserId: string) {
        const myGroups = await this.getGroupsByUser(meId, 'private');
        // console.log(myGroups)
        const groupFound = await this.groupsRepository.createQueryBuilder('groups')
            .leftJoinAndSelect('groups.user_groups', 'user_groups')
            .andWhere('user_groups.user_id = :user_id', { user_id: otherUserId })
            .andWhere('groups.is_private = :is_private', { is_private: true })
            .andWhereInIds(myGroups.map(gp => gp.id))
            .select([
                'groups.id',
                'groups.name',
                'groups.is_private',
            ])
            .getOne()
        return groupFound;
    }

}

export { GroupsService }