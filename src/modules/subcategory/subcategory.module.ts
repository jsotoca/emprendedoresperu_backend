import { ServicesModule } from './../../services/services.module';
import { SubcategoryService } from './subcategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubcategoryController } from './subcategory.controller';
import SubcategoryRepository from './subcategory.repository';
import { CategoryModule } from '../category/category.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([SubcategoryRepository]),
        CategoryModule,
        ServicesModule
    ],
    providers: [SubcategoryService],
    exports: [SubcategoryService],
    controllers: [SubcategoryController]
})
export class SubcategoryModule {}
