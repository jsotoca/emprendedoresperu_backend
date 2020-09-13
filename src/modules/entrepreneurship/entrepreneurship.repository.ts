import { EntityRepository, Repository } from "typeorm";
import Entrepreneurship from "./entrepreneurship.entity";
import CreateEntrepreneurshipDTO from "./dto/create-entrepreneurship.dto";
import User from "../user/user.entity";
@EntityRepository(Entrepreneurship)
export default class EntrepreneurshipRepository extends Repository<Entrepreneurship> {
    
    async createEntrepreneurship(user:User,createEntrepreneurshipDTO:CreateEntrepreneurshipDTO){
        const entrepreneurship = new Entrepreneurship();
        for(let field in createEntrepreneurshipDTO) entrepreneurship[field] = createEntrepreneurshipDTO[field];
        entrepreneurship.user = user;
        try {
            await entrepreneurship.save();
            return entrepreneurship;
        } catch (error) {
            throw error;
        }
    }
    
}