import { CategoryService } from './../category/category.service';
import { Injectable } from '@nestjs/common';
import CreateEntrepreneurshipDTO from './dto/create-entrepreneurship.dto';
import User from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import EntrepreneurshipRepository from './entrepreneurship.repository';
import GetFiltersEntrepreneurshipDTO from './dto/get-filter-entrepreneurship.dto';
import Category from '../category/category.entity';
import S3Service from '../../services/aws/s3.service';

@Injectable()
export class EntrepreneurshipService {

    constructor(
        @InjectRepository(EntrepreneurshipRepository)
        private readonly entrepreneurshipRepository:EntrepreneurshipRepository,
        private readonly categoryService:CategoryService,
        private readonly S3:S3Service,
    ){}

    async createEntrepreneurship(
        createEntrepreneurshipDTO:CreateEntrepreneurshipDTO,
        user:User,
        logo?:any,
        cover?:any
    ){
        const category:Category = await this.categoryService.getCategory(createEntrepreneurshipDTO.category);
        delete createEntrepreneurshipDTO.category;
        const entrepreneurship = await this.entrepreneurshipRepository.createEntrepreneurship(createEntrepreneurshipDTO,user,category);
        if(entrepreneurship && (logo || cover)){
            if(logo){
                const { Location }= await this.S3.uploadImage(logo,'logo',user.id);
                entrepreneurship.logo = Location;
            }
            if(cover){
                const { Location }= await this.S3.uploadImage(logo,'cover',user.id);
                entrepreneurship.cover = Location;
            }
            try {
                await entrepreneurship.save();
            } catch (error) {
                throw error;
            }
        }
        return {ok:true,entrepreneurship};
    }

    async getEntrepreneurships(getFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO,userId?:string){
        return this.entrepreneurshipRepository.getEntrepreneurships(getFiltersEntrepreneurshipDTO,userId);
    }

    async getEntrepreneurship(id:number){
        const entrepreneurship = await this.entrepreneurshipRepository.findOne(
            id,
            {relations:['category']}
        );
        return {ok:true,entrepreneurship};
    }
}
