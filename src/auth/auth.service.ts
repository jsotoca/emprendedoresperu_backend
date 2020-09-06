import { Injectable } from '@nestjs/common';
import UserRepository from 'src/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import SignUpDTO from 'src/user/dto/signup.dto';
import User from 'src/user/user.entity';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository
    ){}

    async signUp(signUpDTO:SignUpDTO,avatar?:any){
        const user:User = await this.userRepository.signUp(signUpDTO);
        return {ok:true,user};
    }

    async signIn(){}

    async forgotPassword(){}

    async resetPassword(){}
}
