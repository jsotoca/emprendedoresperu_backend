import { RolesGuard } from './../../auth/guards/roles.guard';
import { AdsService } from './ads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Body, UploadedFile, Get, Query, Patch, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateAdsDTO from './dto/create-ads.dto';
import { UserRoles } from '../user/user.roles';
import { Roles } from 'src/auth/decorators/roles.decorator';
import GetFiltersAdsDTO from './dto/get-filter-ads.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import User from '../user/user.entity';

@Controller('ads')
export class AdsController {

    constructor(
        private readonly adsService:AdsService
    ){}

    @Post('/')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles([UserRoles.ADMIN])
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(ValidationPipe)
    async createDeal(
        @Body() createAdsDTO:CreateAdsDTO,
        @UploadedFile() image:any
    ){
        return this.adsService.createAds(createAdsDTO,image);
    }


    @Get('/')
    async getAds(
        @Query() getFiltersAdsDTO:GetFiltersAdsDTO
    ){
        return await this.adsService.getAdss(getFiltersAdsDTO);
    }

    @Patch('/status/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles([UserRoles.ADMIN])
    @UsePipes(ValidationPipe)
    async verifyEntrepeneurship(
        @Param('id') id:number,
        @GetUser() user:User
    ){
        return await await this.adsService.changeStatus(id,user);
    }
}
