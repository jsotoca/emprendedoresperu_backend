import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import TagRepository from './tag.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([TagRepository])
    ]
})
export class TagModule {}
