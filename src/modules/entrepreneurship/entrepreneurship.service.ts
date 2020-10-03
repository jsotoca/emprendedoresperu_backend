import { SubcategoryService } from './../subcategory/subcategory.service';
import { Injectable } from '@nestjs/common';
import CreateEntrepreneurshipDTO from './dto/create-entrepreneurship.dto';
import User from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import EntrepreneurshipRepository from './entrepreneurship.repository';
import GetFiltersEntrepreneurshipDTO from './dto/get-filter-entrepreneurship.dto';
import S3Service from '../../services/aws/s3.service';
import Subcategory from '../subcategory/subcategory.entity';

@Injectable()
export class EntrepreneurshipService {

    constructor(
        @InjectRepository(EntrepreneurshipRepository)
        private readonly entrepreneurshipRepository:EntrepreneurshipRepository,
        private readonly subcategoryService:SubcategoryService,
        private readonly S3:S3Service,
    ){}

    async createEntrepreneurship(
        createEntrepreneurshipDTO:CreateEntrepreneurshipDTO,
        user:User,
        logo?:any,
        cover?:any
    ){
        const subcategory:Subcategory = await this.subcategoryService.getSubcategory(createEntrepreneurshipDTO.subcategory);
        delete createEntrepreneurshipDTO.subcategory;
        const entrepreneurship = await this.entrepreneurshipRepository.createEntrepreneurship(createEntrepreneurshipDTO,user,subcategory);
        if(entrepreneurship && (logo || cover)){
            if(logo){
                const { Location }= await this.S3.uploadImage(logo,`${user.id}/logo`);
                entrepreneurship.logo = Location;
            }
            if(cover){
                const { Location }= await this.S3.uploadImage(logo,`${user.id}/cover`);
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
            {relations:['subcategory']}
        );
        return {ok:true,entrepreneurship};
    }
}
