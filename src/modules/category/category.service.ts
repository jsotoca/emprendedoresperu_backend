import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryRepository from './category.repository';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository:CategoryRepository
    ){}

    async getCategory(id:number){
        return await this.categoryRepository.findOne(id);
    }
}
