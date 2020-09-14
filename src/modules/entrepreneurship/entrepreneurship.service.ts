import { CategoryService } from './../category/category.service';
import { Injectable } from '@nestjs/common';
import CreateEntrepreneurshipDTO from './dto/create-entrepreneurship.dto';
import User from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import EntrepreneurshipRepository from './entrepreneurship.repository';
import GetFiltersEntrepreneurshipDTO from './dto/get-filter-entrepreneurship.dto';
import Category from '../category/category.entity';

@Injectable()
export class EntrepreneurshipService {

    constructor(
        @InjectRepository(EntrepreneurshipRepository)
        private readonly entrepreneurshipRepository:EntrepreneurshipRepository,
        private readonly categoryService:CategoryService
    ){}

    async createEntrepreneurship(
        createEntrepreneurshipDTO:CreateEntrepreneurshipDTO,
        user:User
    ){
        const category:Category = await this.categoryService.getCategory(createEntrepreneurshipDTO.category);
        delete createEntrepreneurshipDTO.category;
        const entrepreneurship = await this.entrepreneurshipRepository.createEntrepreneurship(createEntrepreneurshipDTO,user,category);
        return {ok:true,entrepreneurship};
    }

    async getEntrepreneurships(getFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO,userId?:string){
        return this.entrepreneurshipRepository.getEntrepreneurships(getFiltersEntrepreneurshipDTO,userId);
    }
}
