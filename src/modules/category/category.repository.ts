import { EntityRepository, Repository } from "typeorm";
import Category from "./category.entity";
import CreateCategoryDTO from "./dto/create-category.dto";

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

}