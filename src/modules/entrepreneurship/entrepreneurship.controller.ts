import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntrepreneurshipService } from './entrepreneurship.service';
import CreateEntrepreneurshipDTO from './dto/create-entrepreneurship.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import User from '../user/user.entity';
import GetFiltersEntrepreneurshipDTO from './dto/get-filter-entrepreneurship.dto';

@Controller('entrepreneurship')
export class EntrepreneurshipController {
    constructor(
        private readonly entrepreneurshipService:EntrepreneurshipService
    ){}
    
    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    async createEntrepreneurship(
        @Body() createEntrepreneurshipDTO:CreateEntrepreneurshipDTO,
        @GetUser() user:User
    ){
        return await this.entrepreneurshipService.createEntrepreneurship(user,createEntrepreneurshipDTO);
    }

    @Get('/')
    @UsePipes(ValidationPipe)
    async getEntrepreneurships(
        @Body() getFiltersEntrepreneurshipDTO:GetFiltersEntrepreneurshipDTO
    ){
        return await this.entrepreneurshipService.getEntrepreneurships(getFiltersEntrepreneurshipDTO);
    }
}
