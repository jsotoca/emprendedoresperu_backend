import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import S3Service from 'src/services/aws/s3.service';
import Entrepreneurship from '../entrepreneurship/entrepreneurship.entity';
import { EntrepreneurshipService } from '../entrepreneurship/entrepreneurship.service';
import Deal from './deal.entity';
import DealRepository from './deal.repository';
import CreateDealDTO from './dto/create-deal.dto';
import GetFiltersDealDTO from './dto/get-filters-deal.dto';

@Injectable()
export class DealService {
    constructor(
        @InjectRepository(DealRepository)
        private readonly dealRepository:DealRepository,
        private readonly S3:S3Service,
        private readonly entrepreneurshipService:EntrepreneurshipService
    ){}

    async createDeal(createDealDTO:CreateDealDTO,image:any){
        const { entrepreneurship } = await this.entrepreneurshipService.getEntrepreneurship(createDealDTO.entrepreneurship);
        const deal = await this.dealRepository.createDeal(createDealDTO,entrepreneurship);
        if(deal && image){
            const { Location:imageUrl }= await this.S3.uploadImage(image,'deals');
            deal.image = imageUrl;
            try {
                await deal.save();
            } catch (error) {
                throw error;
            }
        }
        return {ok:true,deal};
    }

    async getDeals(getFiltersDealDTO:GetFiltersDealDTO){
        return this.dealRepository.getDeals(getFiltersDealDTO);
    }

    async getDeal(id:number){
        return await this.dealRepository.findOne(
            id,
            {relations:['entrepreneurship']}
        );
    }

    async getDealsByUser(user:number){
        return this.dealRepository.getDealsByUser(user);
    }
}
