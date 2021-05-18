import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/Users";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

}