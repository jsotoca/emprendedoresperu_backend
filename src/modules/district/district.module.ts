import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import DistrictRepository from './district.repository';

@Module({
  imports:[TypeOrmModule.forFeature([DistrictRepository])],
  providers: [DistrictService],
  exports: [DistrictService],
  controllers: [DistrictController]
})
export class DistrictModule {}
