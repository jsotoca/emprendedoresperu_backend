import { ServicesModule } from './../../services/services.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DealRepository from './deal.repository';
import { DealService } from './deal.service';
import { EntrepreneurshipModule } from '../entrepreneurship/entrepreneurship.module';
import { DealController } from './deal.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DealRepository]),
    ServicesModule,
    EntrepreneurshipModule
  ],
  providers: [DealService],
  controllers: [DealController]
})
export class DealModule {}
