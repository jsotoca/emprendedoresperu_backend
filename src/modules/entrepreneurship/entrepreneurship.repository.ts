import { EntityRepository, Repository } from "typeorm";
import Entrepreneurship from "./entrepreneurship.entity";
import CreateEntrepreneurshipDTO from "./dto/create-entrepreneurship.dto";
import User from "../user/user.entity";
import GetFiltersEntrepreneurshipDTO from "./dto/get-filter-entrepreneurship.dto";
import Subcategory from "../subcategory/subcategory.entity";
import Tag from "../tag/tag.entity";
import District from "../district/district.entity";
@EntityRepository(Entrepreneurship)
export default class EntrepreneurshipRepository extends Repository<Entrepreneurship> {

    async createEntrepreneurship(
        createEntrepreneurshipDTO:CreateEntrepreneurshipDTO,
        user:User,
        subcategory:Subcategory,
        district:District,
        tags:Tag[]
    ){
        const entrepreneurship = new Entrepreneurship();
        for(let field in createEntrepreneurshipDTO) entrepreneurship[field] = createEntrepreneurshipDTO[field];
        entrepreneurship.user = user;
        entrepreneurship.subcategory = subcategory;
        entrepreneurship.district = district;
        entrepreneurship.tags = tags;
        try {
            await entrepreneurship.save();
            return entrepreneurship;
        } catch (error) {
            throw error;
        }
    }

    async getEntrepreneurships(GetFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO,userId?:string){
        let {page, limit, subcategory, search} = GetFiltersEntrepreneurshipDTO;
        if(!page)page=1;if(!limit)limit=5;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('entrepreneurship')
                    .innerJoinAndSelect('entrepreneurship.subcategory', 'subcategory')
                    .innerJoinAndSelect('entrepreneurship.district', 'district')
                    .innerJoinAndSelect('entrepreneurship.tags', 'tag')
                    .orderBy('entrepreneurship.created_at','DESC')
                    .offset(skip)
                    .limit(limit);
        if(userId) query.where('userId = :userId',{userId});
        if(subcategory) query.andWhere('subcategory = :subcategory',{subcategory});
        if(search) query.andWhere('entrepreneurship.name like :search OR description like :search OR slogan like :search OR subcategory like :search',{search:`%${search}%`});
        const entrepreneurships = await query.getManyAndCount();
        return {
            total:entrepreneurships[1],
            page,
            limit,
            data:entrepreneurships[0]
        };
    }
    
    async searchEntrepreneurship(id){
        const entreprenership = await this.createQueryBuilder('entrepreneurship')
        .innerJoinAndSelect('entrepreneurship.subcategory', 'subcategory')
        .innerJoinAndSelect('entrepreneurship.district', 'district')
        .innerJoinAndSelect('entrepreneurship.tags', 'tag')
        .where("entrepreneurship.id = :id", { id })
        .getOne();
        return entreprenership;    
    }

    async getEntrepreneurshipsByUser(user:number){
        const query = this.createQueryBuilder('entrepreneurship')
                    .innerJoinAndSelect('entrepreneurship.user', 'user')
                    .orderBy('entrepreneurship.created_at','DESC')
        query.where('entrepreneurship.user = :user',{user});
        return await query.getMany();
    }

}