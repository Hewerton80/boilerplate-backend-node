import { compare } from "bcrypt"
import { getCustomRepository, Repository } from "typeorm"
import { User } from "../models/Users.model"
import { UsersRepository } from "../repositories/UsersRepository"
import { IUserUptate } from "../types/UserType"

class UsersService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)
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

    async updateUser(userUpdate: IUserUptate) {
        const { id, ...rest } = userUpdate;
        await this.usersRepository.update(id, rest);
    }

    async comparePassword(password: string, encrypted: string) {
        return compare(password, encrypted);
    }
}

export { UsersService }