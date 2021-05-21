import { compare } from "bcrypt"
import { getCustomRepository, Repository } from "typeorm"
import { User } from "../models/Users"
import { UsersRepository } from "../repositories/UsersRepository"

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

    async comparePassword(password: string, encrypted: string) {
        return compare(password, encrypted);
    }
}

export { UsersService }