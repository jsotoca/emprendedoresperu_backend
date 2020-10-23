import { ServicesModule } from './../../services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import AdsRepository from './ads.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdsRepository]),
    ServicesModule
  ],
  providers: [AdsService],
  controllers: [AdsController]
})
export class AdsModule {}
