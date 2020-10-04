import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DistrictRepository from './district.repository';
import GetFiltersDistrictsDTO from './dto/get-filters-disctricts.dto';

@Injectable()
export class DistrictService {
    constructor(
        @InjectRepository(DistrictRepository)
        private readonly districtRepository:DistrictRepository
    ){}

    async getDistricts(getFiltersDistrictsDTO:GetFiltersDistrictsDTO){
        return await this.districtRepository.getDistricts(getFiltersDistrictsDTO);
    }

    async getDistrict(id:number){
        return await this.districtRepository.findOne({id});
    }
}
