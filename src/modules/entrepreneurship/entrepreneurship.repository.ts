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
        let {page, limit, category, subcategory, search} = GetFiltersEntrepreneurshipDTO;
        if(page) page = Number(page);
        if(limit) limit = Number(limit);
        if(!page)page=1;if(!limit)limit=100;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('entrepreneurship')
                    .leftJoinAndSelect('entrepreneurship.subcategory', 'subcategory')
                    .leftJoinAndSelect('entrepreneurship.district', 'district')
                    .leftJoinAndSelect('entrepreneurship.tags', 'tag')
                    .leftJoinAndSelect('subcategory.category', 'category')
                    .offset(skip)
                    .limit(limit)
                    .orderBy('entrepreneurship.created_at','DESC');
        query.where('actived = true');
        query.andWhere('isVerified = true');
        if(category) query.andWhere('category = :category',{category});
        if(subcategory) query.andWhere('subcategory = :subcategory',{subcategory});
        if(search){
            query.andWhere('entrepreneurship.name like :search and actived = true  and isVerified = true',{search:`%${search}%`});  
            query.orWhere('entrepreneurship.description like :search and actived = true  and isVerified = true',{search:`%${search}%`});  
            query.orWhere('entrepreneurship.slogan like :search and actived = true  and isVerified = true',{search:`%${search}%`});  
            query.orWhere('category.name like :search and actived = true  and isVerified = true',{search:`%${search}%`});  
            query.orWhere('subcategory.name like :search and actived = true  and isVerified = true',{search:`%${search}%`});  
        }
        const entrepreneurships = await query.getManyAndCount();
        return {
            total:entrepreneurships[1],
            page,
            limit,
            data:entrepreneurships[0]
        };
    }

    async getEntrepreneurshipsDashboard(GetFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO){
        let {page, limit,search} = GetFiltersEntrepreneurshipDTO;
        if(!page)page=1;if(!limit)limit=5;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('entrepreneurship')
                    .orderBy('entrepreneurship.created_at','DESC')
                    .offset(skip)
                    .limit(limit);
        if(search) query.andWhere('entrepreneurship.name like :search',{search:`%${search}%`});
        const entrepreneurships = await query.getManyAndCount();
        return {
            total:entrepreneurships[1],
            page,
            limit,
            data:entrepreneurships[0]
        };
    }

    async getEntrepreneurship(id,user){
        const entreprenership = await this.createQueryBuilder('entrepreneurship')
        .where("entrepreneurship.id = :id", { id })
        .andWhere("entrepreneurship.user = :user", { user })
        .getOne();
        return entreprenership;    
    }
    
    async searchEntrepreneurship(id){
        const entreprenership = await this.createQueryBuilder('entrepreneurship')
        .innerJoinAndSelect('entrepreneurship.subcategory', 'subcategory')
        .innerJoinAndSelect('entrepreneurship.district', 'district')
        .innerJoinAndSelect('entrepreneurship.tags', 'tag')
        .leftJoinAndSelect('subcategory.category', 'category')
        .where("entrepreneurship.id = :id", { id })
        .getOne();
        return entreprenership;    
    }

    async getEntrepreneurshipsByUser(user:number){
        const query = this.createQueryBuilder('entrepreneurship')
                    .innerJoinAndSelect('entrepreneurship.user', 'user')
                    .orderBy('entrepreneurship.created_at','DESC')
        query.where('entrepreneurship.user = :user',{user});
        query.andWhere('entrepreneurship.actived = true');
        return await query.getMany();
    }

}