import { Repository, EntityRepository } from "typeorm";
import { Group } from "../models/Groups.model";

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {

}