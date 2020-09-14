import { EntityRepository, Repository } from "typeorm";
import Entrepreneurship from "./entrepreneurship.entity";
import CreateEntrepreneurshipDTO from "./dto/create-entrepreneurship.dto";
import User from "../user/user.entity";
import GetFiltersEntrepreneurshipDTO from "./dto/get-filter-entrepreneurship.dto";
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

    async getEntrepreneurships(GetFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO,userId?:string){
        let {page, limit, category, search} = GetFiltersEntrepreneurshipDTO;
        if(!page)page=1;if(!limit)limit=5;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder()
                    .orderBy('created_at','DESC')
                    .offset(skip)
                    .limit(limit);
        if(userId) query.where('userId = :userId',{userId});
        if(category) query.andWhere('category = :category',{category});
        if(search) query.andWhere('name like :search OR description like :search OR slogan like :search OR category like :search',{search:`%${search}%`});
        const entrepreneurships = await query.getManyAndCount();
        return {
            total:entrepreneurships[1],
            page,
            limit,
            data:entrepreneurships[0]
        };
    }
    
}