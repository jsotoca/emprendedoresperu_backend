import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './../modules/user/user.module';
import { JwtProvider } from './jwt/jwt.provider';
import { ServicesModule } from './../services/services.module';
import JwtStrategy from './jwt/jwt.strategy';
import { EntrepreneurshipModule } from 'src/modules/entrepreneurship/entrepreneurship.module';
import { DealModule } from 'src/modules/deal/deal.module';

@Module({
  imports:[
    UserModule,
    JwtProvider,
    ServicesModule,
    EntrepreneurshipModule,
    DealModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy
  ]
})
export class AuthModule {}
