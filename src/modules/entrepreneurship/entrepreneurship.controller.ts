import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntrepreneurshipService } from './entrepreneurship.service';
import CreateEntrepreneurshipDTO from './dto/create-entrepreneurship.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import User from '../user/user.entity';
import GetFiltersEntrepreneurshipDTO from './dto/get-filter-entrepreneurship.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from './../../auth/decorators/roles.decorator';
import { RolesGuard } from './../../auth/guards/roles.guard';
import EditEntrepreneurshipDTO from './dto/edit-entrepreneurship.dto';

@Controller('entrepreneurship')
export class EntrepreneurshipController {
    constructor(
        private readonly entrepreneurshipService:EntrepreneurshipService
    ){}
    
    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
    ]))
    async createEntrepreneurship(
        @Body() createEntrepreneurshipDTO:CreateEntrepreneurshipDTO,
        @GetUser() user:User,
        @UploadedFiles() files,
    ){
        return await this.entrepreneurshipService.createEntrepreneurship(createEntrepreneurshipDTO,user,files.logo[0],files.cover[0]);
    }

    @Patch('/')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
    ]))
    async editEntrepreneurship(
        @Body() editEntrepreneurshipDTO:EditEntrepreneurshipDTO,
        @GetUser() user:User,
        @UploadedFiles() files,
    ){
        const logo = (files.logo)?files.logo[0]:null;
        const cover = (files.cover)?files.cover[0]:null;
        return await this.entrepreneurshipService.editEntrepreneurship(editEntrepreneurshipDTO,user,logo,cover);
    }

    @Get('/')
    @UsePipes(ValidationPipe)
    async getEntrepreneurships(
        @Body() getFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO
    ){
        return await this.entrepreneurshipService.getEntrepreneurships(getFiltersEntrepreneurshipDTO);
    }

    @Get('/search/:id')
    @UsePipes(ValidationPipe)
    async getEntrepreneurship(
        @Param('id') id:number
    ){
        return await this.entrepreneurshipService.getEntrepreneurship(id);
    }

}
