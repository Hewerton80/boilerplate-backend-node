import { Repository, EntityRepository } from "typeorm";
import { Messages } from "../models/Messages.model";

@EntityRepository(Messages)
export class MessageRepository extends Repository<Messages> {

}