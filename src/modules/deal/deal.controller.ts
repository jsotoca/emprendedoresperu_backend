import { FileInterceptor } from '@nestjs/platform-express';
import { DealService } from './deal.service';
import { Controller, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Body, UploadedFile, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateDealDTO from './dto/create-deal.dto';
import GetFiltersDealDTO from './dto/get-filters-deal.dto';

@Controller('deal')
export class DealController {
    constructor(
        private readonly dealService:DealService
    ){}

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(ValidationPipe)
    async createDeal(
        @Body() createDealDTO:CreateDealDTO,
        @UploadedFile() image:any
    ){
        return this.dealService.createDeal(createDealDTO,image);
    }

    @Get('/')
    @UsePipes(ValidationPipe)
    async getTags(
        @Body() getFiltersDealDTO:GetFiltersDealDTO
    ){
        return await this.dealService.getDeals(getFiltersDealDTO);
    }

    @Get('/search/:id')
    @UsePipes(ValidationPipe)
    async getEntrepreneurship(
        @Param('id') id:number
    ){
        return await this.dealService.getDeal(id);
    }

}
