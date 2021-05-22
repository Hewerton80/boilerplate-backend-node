import { Repository, EntityRepository } from "typeorm";
import { Group } from "../models/Groups";

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {

}