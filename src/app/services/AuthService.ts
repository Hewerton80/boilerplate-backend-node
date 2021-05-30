import { getCustomRepository, Repository } from "typeorm"
import { sign } from 'jsonwebtoken';
import { User } from "../models/Users.model"
import { hash } from 'bcrypt';
import { UsersRepository } from "../repositories/UsersRepository"
import { IJwt } from "../types/AuthTypes"
import { UsersService } from "./UsersService"
import { BadRequestException, ConflictException } from "../../config/errors";

export class AuthService {
    userService: UsersService
    constructor() {
        this.userService = new UsersService();
    }

    async signIn(phone: string, password: string) {
        const user = await this.userService.getUserByPhone(phone);
        if(!user){
            console.log('user: ',user)
            throw new BadRequestException('credenciais inválidas')
        }
        const passwordMatche = await this.userService.comparePassword(password, String(user.password) ) 
        if (!passwordMatche) {
            throw new BadRequestException('credenciais inválidas')
        }      
        const token = this.generateToken({ id: user.id, name: user.name, phone });
        delete user.password;
        return {
            user,
            token
        }
    }

    async signUp(name: string, phone: string, password: string) {
        let user = await this.userService.getUserByPhone(phone);
        if(user){
            throw new ConflictException('credenciais inválidas')
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

        return {
            user,
            token
        }
    }

    generateToken({ id, name, phone }: IJwt) {
        return sign({ id, name, phone }, String(process.env.TOKEN_SECRET), { expiresIn: "7d" });
    }


}