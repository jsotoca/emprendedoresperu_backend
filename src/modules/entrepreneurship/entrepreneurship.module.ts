import { Module } from '@nestjs/common';
import { EntrepreneurshipController } from './entrepreneurship.controller';
import { EntrepreneurshipService } from './entrepreneurship.service';
import { UserModule } from '../../modules/user/user.module';

@Module({
  imports:[UserModule],
  controllers: [EntrepreneurshipController],
  providers: [EntrepreneurshipService]
})
export class EntrepreneurshipModule {}
