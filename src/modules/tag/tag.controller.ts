import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from './../../auth/decorators/roles.decorator';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { TagService } from './tag.service';
import { Controller, Post, UseGuards, Body, UseInterceptors, UploadedFile, Get, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateTagDTO from './dto/create-tag.dto';
import GetFiltersTagsDTO from './dto/get-filters-tag.dto';

@Controller('tag')
export class TagController {
    
    constructor(
        private readonly tagService:TagService
    ){}

    @Post('/')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(['ADMIN'])
    @UseInterceptors(FileInterceptor('icon'))
    async createTag(
        @Body() createTagDTO:CreateTagDTO,
        @UploadedFile() icon
    ){
        return await this.tagService.createTag(createTagDTO,icon);
    }

    @Get('/')
    @UsePipes(ValidationPipe)
    async getTags(
        @Body() getFiltersTagsDTO:GetFiltersTagsDTO
    ){
        return await this.tagService.getTags(getFiltersTagsDTO);
    }

    @Get('/search/:id')
    @UsePipes(ValidationPipe)
    async getEntrepreneurship(
        @Param('id') id:number
    ){
        return await this.tagService.getTag(id);
    }

}
