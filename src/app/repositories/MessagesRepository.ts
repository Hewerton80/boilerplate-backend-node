import { Repository, EntityRepository } from "typeorm";
import { Message} from "../models/Messages";

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {

}