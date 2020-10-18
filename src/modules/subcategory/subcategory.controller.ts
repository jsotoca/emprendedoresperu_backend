import { Roles } from './../../auth/decorators/roles.decorator';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { SubcategoryService } from './subcategory.service';
import { Controller, Post, UseGuards, UseInterceptors, Body, UploadedFiles, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import CreateSubcategoryDTO from './dto/create-subcategory.dto';
import GetFiltersSubcategoriesDTO from './dto/get-filter-subcategory';

@Controller('subcategory')
export class SubcategoryController {
    
    constructor(
        private readonly subcategoryService:SubcategoryService
    ){}
    
    @Post('/')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(['ADMIN'])
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'icon', maxCount: 1 },
        { name: 'image', maxCount: 1 },
    ]))
    async createSubcategory(
        @Body() createSubcategoryDTO:CreateSubcategoryDTO,
        @UploadedFiles() files,
    ){
        return await this.subcategoryService.createSubcategory(createSubcategoryDTO,files.icon[0],files.image[0]);
    }

    @Get('/')
    async getSubcategories(
        @Body() getFiltersSubcategoriesDTO:GetFiltersSubcategoriesDTO
    ){
        return await this.subcategoryService.getSubcategories(getFiltersSubcategoriesDTO);
    }

    @Get('/search/:id')
    async searchSubcategories(
        @Param('id') id:number
    ){
        return await this.subcategoryService.getSubcategory(id);
    }

    @Get('/category/:id')
    async searchSubcategoriesByCategorie(
        @Param('id') id:number
    ){
        return await this.subcategoryService.searchSubcategoriesByCategorie(id);
    }
}
