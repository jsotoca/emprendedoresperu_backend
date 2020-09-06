import { Injectable } from '@nestjs/common';
import UserRepository from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import SignUpDTO from '../user/dto/signup.dto';
import User from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository,
        private readonly jwtService:JwtService
    ){}

    async signUp(signUpDTO:SignUpDTO,avatar?:any){
        const user:User = await this.userRepository.signUp(signUpDTO);
        const token = this.generateToken({id:user.id});
        return {ok:true,user,token};
    }

    async signIn(){}

    async forgotPassword(){}

    async resetPassword(){}

    generateToken(payload:JwtPayload){
        return this.jwtService.sign(payload);
    }
}
