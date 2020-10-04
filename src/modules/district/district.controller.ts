import { DistrictService } from './district.service';
import { Controller, Get, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import GetFiltersDistrictsDTO from './dto/get-filters-disctricts.dto';

@Controller('district')
export class DistrictController {
    constructor(
        private readonly districtService:DistrictService
    ){}

    @Get('/')
    @UsePipes(ValidationPipe)
    async getDistricts(
        @Body() getFiltersDistrictsDTO:GetFiltersDistrictsDTO
    ){
        return await this.districtService.getDistricts(getFiltersDistrictsDTO);
    }
}
