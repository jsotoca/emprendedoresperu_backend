import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import S3Service from 'src/services/aws/s3.service';
import User from '../user/user.entity';
import { UserRoles } from '../user/user.roles';
import AdsRepository from './ads.repository';
import CreateAdsDTO from './dto/create-ads.dto';
import GetFiltersAdsDTO from './dto/get-filter-ads.dto';

@Injectable()
export class AdsService {

    constructor(
        @InjectRepository(AdsRepository)
        private readonly adsRepository:AdsRepository,
        private readonly S3:S3Service
    ){}

    async createAds(createAdsDTO:CreateAdsDTO,image:any){
        const ads = await this.adsRepository.createAds(createAdsDTO);
        if(ads && image){
            const { Location:imageUrl }= await this.S3.uploadImage(image,'ads');
            ads.image = imageUrl;
            try {
                await ads.save();
            } catch (error) {
                throw error;
            }
        }
        return {ok:true,ads};
    }

    async getAdss(getFiltersAdsDTO:GetFiltersAdsDTO){
        return await this.adsRepository.getAdss(getFiltersAdsDTO);
    }

    async changeStatus(id:number,user:User){
        try {
            if(user.role != UserRoles.ADMIN) throw new UnauthorizedException();
            const ads = await this.adsRepository.findOne(id);
            ads.actived = !ads.actived;
            await ads.save();
            return true;
        } catch (error) {
            throw error;
        }
    }

}
