import { CategoryService } from './../category/category.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import SubcategoryRepository from './subcategory.repository';
import S3Service from '../../services/aws/s3.service';
import CreateSubcategoryDTO from './dto/create-subcategory.dto';
import GetFiltersSubcategoriesDTO from './dto/get-filter-subcategory';
import Category from '../category/category.entity';

@Injectable()
export class SubcategoryService {
    constructor(
        @InjectRepository(SubcategoryRepository)
        private readonly subcategoryRepository:SubcategoryRepository,
        private readonly categoryService:CategoryService,
        private readonly S3:S3Service
    ){}

    async createSubcategory(createSubcategoryDTO:CreateSubcategoryDTO,icon:any,image:any){
        const category:Category = await this.categoryService.getCategory(createSubcategoryDTO.category);
        const subcategory = await this.subcategoryRepository.createSubcategory(createSubcategoryDTO,category);
        if(subcategory && (icon && image)){
            const { Location:iconUrl }= await this.S3.uploadImage(icon,'icons');
            subcategory.icon = iconUrl;
            const { Location:imageUrl }= await this.S3.uploadImage(image,'categories');
            subcategory.image = imageUrl;
            try {
                await subcategory.save();
            } catch (error) {
                throw error;
            }
        }
        return {ok:true,subcategory};
    }

    async getSubcategories(getFiltersSubcategoriesDTO:GetFiltersSubcategoriesDTO){
        return this.subcategoryRepository.getSubcategories(getFiltersSubcategoriesDTO);
    }

    async getSubcategory(id:number){
        return await this.subcategoryRepository.findOne(id);
    }
}
