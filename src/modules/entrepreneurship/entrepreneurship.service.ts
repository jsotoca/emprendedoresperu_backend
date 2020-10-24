import { DistrictService } from './../district/district.service';
import { TagService } from './../tag/tag.service';
import { SubcategoryService } from './../subcategory/subcategory.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import CreateEntrepreneurshipDTO from './dto/create-entrepreneurship.dto';
import User from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import EntrepreneurshipRepository from './entrepreneurship.repository';
import GetFiltersEntrepreneurshipDTO from './dto/get-filter-entrepreneurship.dto';
import S3Service from '../../services/aws/s3.service';
import Subcategory from '../subcategory/subcategory.entity';
import District from '../district/district.entity';
import EditEntrepreneurshipDTO from './dto/edit-entrepreneurship.dto';
import { UserRoles } from '../user/user.roles';

@Injectable()
export class EntrepreneurshipService {

    constructor(
        @InjectRepository(EntrepreneurshipRepository)
        private readonly entrepreneurshipRepository:EntrepreneurshipRepository,
        private readonly subcategoryService:SubcategoryService,
        private readonly districtService:DistrictService,
        private readonly tagService:TagService,
        private readonly S3:S3Service
    ){}

    async createEntrepreneurship(
        createEntrepreneurshipDTO:CreateEntrepreneurshipDTO,
        user:User,
        logo?:any,
        cover?:any
    ){
        const subcategory:Subcategory = await this.subcategoryService.getSubcategory(createEntrepreneurshipDTO.subcategory);
        const district:District = await this.districtService.getDistrict(createEntrepreneurshipDTO.district);
        delete createEntrepreneurshipDTO.subcategory;
        delete createEntrepreneurshipDTO.district;
        const { tags } = createEntrepreneurshipDTO;
        const entreprenurshipTags = [];
        for (let i = 0; i < tags.length; i++) {
            const tag = await this.tagService.getTag(tags[i]);
            entreprenurshipTags.push(tag);
        }
        delete createEntrepreneurshipDTO.tags;
        const entrepreneurship = await this.entrepreneurshipRepository.createEntrepreneurship(createEntrepreneurshipDTO,user,subcategory,district,entreprenurshipTags);
        if(entrepreneurship && (logo || cover)){
            if(logo){
                const { Location }= await this.S3.uploadImage(logo,`${user.id}/logo`);
                entrepreneurship.logo = Location;
            }
            if(cover){
                const { Location }= await this.S3.uploadImage(cover,`${user.id}/cover`);
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

    async editEntrepreneurship(
        editEntrepreneurshipDTO:EditEntrepreneurshipDTO,
        user:User,
        logo?:any,
        cover?:any
    ){
        const { id } = editEntrepreneurshipDTO;
        const entrepreneurship = await this.entrepreneurshipRepository.getEntrepreneurship(id,user.id);
        if(!entrepreneurship) throw new UnauthorizedException();
        //ah caray no es necesario guardar el logo ni el cover de vuelta pero bueee
        if(!logo) editEntrepreneurshipDTO.logo = entrepreneurship.logo;
        else {
            const { Location } = await this.S3.uploadImage(logo,`${user.id}/logo`);
            editEntrepreneurshipDTO.logo = Location;
        }
        if(!cover) editEntrepreneurshipDTO.cover = entrepreneurship.cover;
        else {
            const { Location } = await this.S3.uploadImage(cover,`${user.id}/cover`);
            editEntrepreneurshipDTO.cover = Location;
        }
        const subcategory:Subcategory = await this.subcategoryService.getSubcategory(editEntrepreneurshipDTO.subcategory);
        const district:District = await this.districtService.getDistrict(editEntrepreneurshipDTO.district);
        const { tags } = editEntrepreneurshipDTO;
        const entreprenurshipTags = [];
        for (let i = 0; i < tags.length; i++) {
            const tag = await this.tagService.getTag(tags[i]);
            entreprenurshipTags.push(tag);
        }
        entrepreneurship.user = user;
        entrepreneurship.subcategory = subcategory;
        entrepreneurship.district = district;
        entrepreneurship.tags = entreprenurshipTags;
        entrepreneurship.logo = editEntrepreneurshipDTO.logo;
        entrepreneurship.cover = editEntrepreneurshipDTO.cover;

        delete editEntrepreneurshipDTO.subcategory;
        delete editEntrepreneurshipDTO.district;
        delete editEntrepreneurshipDTO.tags;
        delete editEntrepreneurshipDTO.urlLogo;
        delete editEntrepreneurshipDTO.urlCover;

        await entrepreneurship.save();

        const body = {};

        for(let field in editEntrepreneurshipDTO){
            if(editEntrepreneurshipDTO[field]) body[field] = editEntrepreneurshipDTO[field];
        } 

        console.log(body);

        await this.entrepreneurshipRepository.update(id,body);
        
        return entrepreneurship;
    }

    async getEntrepreneurships(getFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO,userId?:string){
        return this.entrepreneurshipRepository.getEntrepreneurships(getFiltersEntrepreneurshipDTO,userId);
    }

    async getEntrepreneurshipsDashboard(getFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO){
        return this.entrepreneurshipRepository.getEntrepreneurshipsDashboard(getFiltersEntrepreneurshipDTO);
    }

    async getEntrepreneurship(id:number){
        const entrepreneurship = await this.entrepreneurshipRepository.searchEntrepreneurship(id);
        return {ok:true,entrepreneurship};
    }

    async getEntrepreneurshipsByUser(user:number){
        return this.entrepreneurshipRepository.getEntrepreneurshipsByUser(user);
    }

    async verifyEntrepreneurship(id:number,user:User){
        try {
            if(user.role != UserRoles.ADMIN) throw new UnauthorizedException();
            this.entrepreneurshipRepository.update(id,{isVerified:true,actived:true});
            return true;
        } catch (error) {
            throw error;
        }
    }

    async desverifyEntrepreneurshipDashboard(id:number,user:User){
        try {
            if(user.role != UserRoles.ADMIN) throw new UnauthorizedException();
            this.entrepreneurshipRepository.update(id,{isVerified:false});
            return true;
        } catch (error) {
            throw error;
        }
    }

    async unsubscribeEntrepreneurshipDashboard(id:number,user:User){
        try {
            if(user.role != UserRoles.ADMIN) throw new UnauthorizedException();
            this.entrepreneurshipRepository.update(id,{isVerified:false,actived:false});
            return true;
        } catch (error) {
            throw error;
        }
    }

    async desverifyEntrepreneurship(id:number,user:User){
        try {
            const entrepreneurship = await this.entrepreneurshipRepository.findOne(
                id,
                {relations:['user']}
            );
            if(user.id != entrepreneurship.user.id) throw new UnauthorizedException();
            entrepreneurship.isVerified = false;
            await entrepreneurship.save();
            return entrepreneurship;
        } catch (error) {
            throw error;
        }
    }

    async unsubscribeEntrepreneurship(id:number,user:User){
        try {
            const entrepreneurship = await this.entrepreneurshipRepository.findOne(
                id,
                {relations:['user']}
            );
            if(user.id != entrepreneurship.user.id) throw new UnauthorizedException();
            entrepreneurship.isVerified = false;
            entrepreneurship.actived = false;
            await entrepreneurship.save();
            return entrepreneurship;
        } catch (error) {
            throw error;
        }
    }
}
