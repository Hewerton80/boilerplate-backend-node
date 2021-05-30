import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/Users.model";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

}