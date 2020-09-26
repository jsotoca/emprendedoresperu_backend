import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryRepository from './category.repository';
import CreateCategoryDTO from './dto/create-category.dto';
import S3Service from '../../services/aws/s3.service';
import GetFiltersCategoriesDTO from './dto/get-filter-category.dto';
@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository:CategoryRepository,
        private readonly S3:S3Service
    ){}

    async createCategory(createCategoryDTO:CreateCategoryDTO,image:any){
        const category = await this.categoryRepository.createCategory(createCategoryDTO);
        if(category && image){
            const { Location }= await this.S3.uploadImage(image,'categories');
            category.image = Location;
            try {
                await category.save();
            } catch (error) {
                throw error;
            }
        }
        return {ok:true,category};
    }

    async getCategories(getFiltersCategoriesDTO:GetFiltersCategoriesDTO){
        return this.categoryRepository.getCategories(getFiltersCategoriesDTO);
    }

    async getCategory(id:number){
        return await this.categoryRepository.findOne(id);
    }
}
