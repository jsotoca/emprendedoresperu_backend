import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import CategoryRepository from './category.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([CategoryRepository])
    ],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule {}
