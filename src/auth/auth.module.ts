import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './../user/user.module';
import { JwtProvider } from './jwt/jwt.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from 'src/user/user.repository';

@Module({
  imports:[
    UserModule,
    JwtProvider
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
