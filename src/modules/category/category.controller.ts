import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './../../auth/decorators/roles.decorator';
import { RolesGuard } from './../../auth/guards/roles.guard';
import CreateCategoryDTO from './dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import GetFiltersCategoriesDTO from './dto/get-filter-category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Post('/')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(['ADMIN'])
    @UseInterceptors(FileInterceptor('image'))
    async createCategory(
        @Body() createCategoryDTO:CreateCategoryDTO,
        @UploadedFile() image
    ){
        return await this.categoryService.createCategory(createCategoryDTO,image);
    }

    @Get('/')
    async getCategories(
        @Body() getFiltersCategoriesDTO:GetFiltersCategoriesDTO
    ){
        return await this.categoryService.getCategories(getFiltersCategoriesDTO);
    }
}
