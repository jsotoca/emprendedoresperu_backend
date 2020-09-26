import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import CategoryRepository from './category.repository';
import { ServicesModule } from './../../services/services.module';
import { CategoryController } from './category.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([CategoryRepository]),
        ServicesModule
    ],
    providers: [CategoryService],
    exports: [CategoryService],
    controllers: [CategoryController]
})
export class CategoryModule {}
