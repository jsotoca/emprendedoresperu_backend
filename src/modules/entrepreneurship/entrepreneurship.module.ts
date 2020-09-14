import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EntrepreneurshipController } from './entrepreneurship.controller';
import { EntrepreneurshipService } from './entrepreneurship.service';
import { UserModule } from '../../modules/user/user.module';
import EntrepreneurshipRepository from './entrepreneurship.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([EntrepreneurshipRepository]),
    UserModule,
    CategoryModule
  ],
  controllers: [EntrepreneurshipController],
  providers: [EntrepreneurshipService]
})
export class EntrepreneurshipModule {}
