import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import UserRepository from '../user/user.repository';
import User from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload';
import AuthCrendentialsDTO from 'src/user/dto/auth.dto';
import SignUpDTO from '../user/dto/signup.dto';

@Injectable()
export class AuthService {

    private userRepository: UserRepository;

    constructor(
        private readonly connection: Connection,
        private readonly jwtService:JwtService
    ) {
        this.userRepository = this.connection.getCustomRepository(UserRepository);
    }

    async signUp(signUpDTO:SignUpDTO,avatar?:any){
        const user:User = await this.userRepository.signUp(signUpDTO);
        const token = this.generateToken({id:user.id});
        return {ok:true,user,token};
    }

    async signIn(authCrendentialsDTO:AuthCrendentialsDTO){
        const user:User = await this.userRepository.signIn(authCrendentialsDTO);
        const token = this.generateToken({id:user.id});
        return {ok:true,user,token};
    }

    async forgotPassword(){}

    async resetPassword(){}

    generateToken(payload:JwtPayload){
        return this.jwtService.sign(payload);
    }
}
