import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EntrepreneurshipController } from './entrepreneurship.controller';
import { EntrepreneurshipService } from './entrepreneurship.service';
import { UserModule } from '../../modules/user/user.module';
import EntrepreneurshipRepository from './entrepreneurship.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([EntrepreneurshipRepository])
    ,UserModule
  ],
  controllers: [EntrepreneurshipController],
  providers: [EntrepreneurshipService]
})
export class EntrepreneurshipModule {}
