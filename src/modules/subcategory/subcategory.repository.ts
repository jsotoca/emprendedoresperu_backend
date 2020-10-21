import { EntityRepository, Repository } from "typeorm";
import Category from "../category/category.entity";
import CreateSubcategoryDTO from "./dto/create-subcategory.dto";
import GetFiltersSubcategoriesDTO from "./dto/get-filter-subcategory";
import Subcategory from "./subcategory.entity";

@EntityRepository(Subcategory)
export default class SubcategoryRepository extends Repository<Subcategory> {

    async createSubcategory(
        CreateSubcategoryDTO:CreateSubcategoryDTO,
        category:Category
    ){
        const subcategory = new Subcategory();
        const { name } = CreateSubcategoryDTO;
        subcategory.name = name;
        subcategory.category = category;
        try {
            await subcategory.save();
            return subcategory;
        } catch (error) {
            throw error;
        }
    }

    async getSubcategories(getFilterSubcategoriesDTO:GetFiltersSubcategoriesDTO){
        let {page, limit, category, search} = getFilterSubcategoriesDTO;
        if(!page)page=1;if(!limit)limit=40;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('subcategory')
                    .leftJoinAndSelect('subcategory.category', 'category')
                    .orderBy('subcategory.name','ASC')
                    .offset(skip)
                    .limit(limit);
        if(category) query.andWhere('category like :category',{category:`%${category}%`});
        if(search) query.andWhere('name like :search',{search:`%${search}%`});
        const subcategories = await query.getManyAndCount();
        return {
            total:subcategories[1],
            page,
            limit,
            data:subcategories[0]
        };
    }

    async searchSubcategoriesByCategorie(id){
        const entreprenership = await this.createQueryBuilder('subcategory')
        .innerJoinAndSelect('subcategory.category', 'category')
        .where("category.id = :id", { id })
        .getMany();
        return entreprenership;    
    }

}