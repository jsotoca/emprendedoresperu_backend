import { ServicesModule } from './../../services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import TagRepository from './tag.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([TagRepository]),
        ServicesModule
    ],
    controllers: [TagController],
    providers: [TagService],
    exports: [TagService]
})
export class TagModule {}
