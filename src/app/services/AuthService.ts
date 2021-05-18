import { getCustomRepository, Repository } from "typeorm"
import { sign } from 'jsonwebtoken';
import { User } from "../models/Users"
import { hash } from 'bcrypt';
import { UsersRepository } from "../repositories/UsersRepository"
import { IJwt } from "../types/AuthTypes"
import { UsersService } from "./UsersService"
import { BadRequestException } from "../../config/errors";

export class AuthService {
    userService: UsersService
    constructor() {
        this.userService = new UsersService();
    }

    async login(name: string, phone: string, password: string) {
        let user = await this.userService.getUserByPhone(phone);
        
        if (user && (await this.userService.comparePassword(password, String(user.password)))) {
            const token = this.generateToken({ id: user.id, name, phone });
            user.name = name;
            try {
                await user.save(); 
            }
            catch(err){
                throw new BadRequestException('opsss')
            }
            delete user.password;
            return {
                user,
                token
            }
        }
        user = new User();
        user.name = name;
        user.phone = phone;
        user.password = await hash(password, 10);

        try {
            await user.save(); 
        }
        catch(err){
            throw new BadRequestException('opsss')
        }        
        const token = this.generateToken({ id: user.id, name, phone });
        delete user.password;
        // console.log(user)
        return {
            user,
            token
        }
    }

    generateToken({ id, name, phone }: IJwt) {
        return sign({ id, name, phone }, String(process.env.TOKEN_SECRET), { expiresIn: "7d" });
    }


}