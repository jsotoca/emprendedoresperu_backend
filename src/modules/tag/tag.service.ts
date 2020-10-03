import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TagRepository from './tag.repository';
import CreateTagDTO from './dto/create-tag.dto';
import GetFiltersTagsDTO from './dto/get-filters-tag.dto';
import S3Service from '../../services/aws/s3.service';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagRepository)
        private readonly tagRepository:TagRepository,
        private readonly S3:S3Service
    ){}

    async createTag(createTagDTO:CreateTagDTO,icon:any){
        const tag = await this.tagRepository.createTag(createTagDTO);
        if(tag && (icon)){
            const { Location:iconUrl }= await this.S3.uploadImage(icon,'icons');
            tag.icon = iconUrl;
            try {
                await tag.save();
            } catch (error) {
                throw error;
            }
        }
        return {ok:true,tag};
    }

    async getTags(getFiltersTagsDTO:GetFiltersTagsDTO){
        return await this.tagRepository.getTags(getFiltersTagsDTO);
    }

    async getTag(id:number){
        return this.tagRepository.findOne({id});
    }
}
