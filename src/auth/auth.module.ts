import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './../user/user.module';
import { JwtProvider } from './jwt/jwt.provider';
import { ServicesModule } from './../services/services.module';

@Module({
  imports:[
    UserModule,
    JwtProvider,
    ServicesModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
