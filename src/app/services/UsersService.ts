import { compare } from "bcrypt"
import { getCustomRepository, Repository } from "typeorm"
import { Group } from "../models/Groups"
import { User } from "../models/Users"
import { GroupRepository } from "../repositories/GroupsRepository"
import { UsersRepository } from "../repositories/UsersRepository"

class UsersService {
    private usersRepository: Repository<User>
    private groupRepository: Repository<Group>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)
        this.groupRepository = getCustomRepository(GroupRepository)
    }

    async getUserByPhone(phone: string, myPhone?: string) {
        const query = this.usersRepository.createQueryBuilder('user')
        query.andWhere('user.phone = :phone', { phone })

        if (myPhone) {
            query.andWhere('user.phone != :myPhone', { myPhone })
        }

        const user = await query.getOne();
        return user;
    }

    // async getUsersByGroup(groupId: string) {
    //     const users = this.usersRepository.createQueryBuilder('users')
    //         .leftJoinAndSelect('users.user_groups', 'user_groups')
    //         .leftJoinAndSelect('user_groups.user', 'user')
    //         .where('user_groups.group_id = :group_id', { group_id: groupId })
    //         .select([
    //             'users.id',
    //             'users.name',
    //             'users.phone',
    //         ])
    //         .getMany()
    //     return users;
    // }

    async comparePassword(password: string, encrypted: string) {
        return compare(password, encrypted);
    }
}

export { UsersService }