import { EntityRepository, Repository } from "typeorm";
import Category from "./category.entity";

@EntityRepository(Category)
export default class CategoryRepository extends Repository<Category> {
}