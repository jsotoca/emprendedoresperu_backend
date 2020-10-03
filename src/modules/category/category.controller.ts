import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './../../auth/decorators/roles.decorator';
import { RolesGuard } from './../../auth/guards/roles.guard';
import CreateCategoryDTO from './dto/create-category.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import GetFiltersCategoriesDTO from './dto/get-filter-category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Post('/')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(['ADMIN'])
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'icon', maxCount: 1 },
        { name: 'image', maxCount: 1 },
    ]))
    async createCategory(
        @Body() createCategoryDTO:CreateCategoryDTO,
        @UploadedFiles() files,
    ){
        return await this.categoryService.createCategory(createCategoryDTO,files.icon[0],files.image[0]);
    }

    @Get('/')
    async getCategories(
        @Body() getFiltersCategoriesDTO:GetFiltersCategoriesDTO
    ){
        return await this.categoryService.getCategories(getFiltersCategoriesDTO);
    }
}
