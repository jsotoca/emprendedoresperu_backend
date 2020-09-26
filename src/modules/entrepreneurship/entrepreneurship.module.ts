import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EntrepreneurshipController } from './entrepreneurship.controller';
import { EntrepreneurshipService } from './entrepreneurship.service';
import { UserModule } from '../../modules/user/user.module';
import EntrepreneurshipRepository from './entrepreneurship.repository';
import { CategoryModule } from '../category/category.module';
import { ServicesModule } from './../../services/services.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([EntrepreneurshipRepository]),
    UserModule,
    CategoryModule,
    ServicesModule
  ],
  controllers: [EntrepreneurshipController],
  providers: [EntrepreneurshipService]
})
export class EntrepreneurshipModule {}
