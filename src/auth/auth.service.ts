import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Connection } from 'typeorm';
import UserRepository from '../modules/user/user.repository';
import User from '../modules/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload';
import AuthCrendentialsDTO from '../modules/user/dto/auth.dto';
import SignUpDTO from '../modules/user/dto/signup.dto';
import NodemailerService from '../services/nodemailer/mailer.service';
import { sign,verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    private userRepository: UserRepository;

    constructor(
        private readonly connection: Connection,
        private readonly jwtService:JwtService,
        private readonly mailer:NodemailerService
    ) {
        this.userRepository = this.connection.getCustomRepository(UserRepository);
    }

    async signUp(signUpDTO:SignUpDTO,avatar?:any){
        const user:User = await this.userRepository.signUp(signUpDTO);
        const token = this.generateToken({id:user.id});
        this.mailer.sendMailRegister(user);
        return {ok:true,user,token};
    }

    async signIn(authCrendentialsDTO:AuthCrendentialsDTO){
        const user:User = await this.userRepository.signIn(authCrendentialsDTO);
        const token = this.generateToken({id:user.id});
        return {ok:true,user,token};
    }

    async forgotPassword(email:string){
        const user = await this.userRepository.findOne({email});
        if(!user)throw new NotFoundException('email no encontrado en la base de datos.');
        const token = this.generateResetToken(user);
        this.mailer.sendMailResetPassword(user.fullname,email,token);
        return {ok:true,message:'email enviado'};
    }

    async resetPassword(password:string,email:string,token:string){
        const user = await this.userRepository.findOne({email});
        if(!user) throw new UnauthorizedException('credenciales no validas');
        const payload = this.decodedResetToken(user,token);
        if(!payload) throw new UnauthorizedException('credenciales no validas');
        const id = payload['id'];
        if(user.id !== id) throw new UnauthorizedException('credenciales no validas');
        try {
            user.password = password;
            await user.save();
            return {ok:true,message:'password actualizado'};
        } catch (error) {
            throw error('error al momento de actualizar la contraseña');
        }
    }

    generateToken(payload:JwtPayload){
        return this.jwtService.sign(payload);
    }

    generateResetToken(user:User){
        const {id,password,created_at} = user;
        const secret = password+"-"+created_at;
        const token = sign({id},secret,{expiresIn:'1h'});
        return token;
    }

    decodedResetToken(user:User,token:string){
        const {password,created_at} = user;
        const secret = password+"-"+created_at;
        return verify(token,secret);
    }
}
