import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './../user/user.module';
import { JwtProvider } from './jwt/jwt.provider';

@Module({
  imports:[
    UserModule,
    JwtProvider
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
