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

    async getGroupsByUser(userId: string, isPrivaty: boolean) {
        const groups = await this.groupsRepository.createQueryBuilder('groups')
            .leftJoinAndSelect('groups.user_groups', 'user_groups')
            .andWhere('user_groups.user_id = :user_id', { user_id: userId })
            .andWhere('groups.is_private = :is_private', { is_private: isPrivaty })
            .select([
                'groups.id',
                'groups.name',
                'groups.is_private',
            ])
            .getMany()
        return groups;
    }
    async getPrivateGroupByUsers(meId: string, otherUserId: string) {
        const myGroups = await this.getGroupsByUser(meId, true);
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
}

export { GroupsService }