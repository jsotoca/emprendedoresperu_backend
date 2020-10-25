import { EntityRepository, Repository } from "typeorm";
import Category from "./category.entity";
import CreateCategoryDTO from "./dto/create-category.dto";
import GetFiltersCategoriesDTO from "./dto/get-filter-category.dto";

@EntityRepository(Category)
export default class CategoryRepository extends Repository<Category> {

    async createCategory(
        createCategoryDTO:CreateCategoryDTO
    ){
        const category = new Category();
        const { name } = createCategoryDTO;
        category.name = name;
        try {
            await category.save();
            return category;
        } catch (error) {
            throw error;
        }
    }

    async getCategories(getFiltersCategoriesDTO:GetFiltersCategoriesDTO){
        let {page, limit, search} = getFiltersCategoriesDTO;
        // if(!page)page=1;if(!limit)limit=35;
        const skip = (page-1)*limit;
        const query = this.createQueryBuilder('category')
                    .leftJoinAndSelect('category.subcategories', 'subcategory')
                    .orderBy('category.name','ASC')
                    // .offset(skip)
                    // .limit(limit);
        if(search) query.andWhere('name like :search',{search:`%${search}%`});
        const categories = await query.getManyAndCount();
        return {
            total:categories[1],
            page,
            limit,
            data:categories[0]
        };
    }

}