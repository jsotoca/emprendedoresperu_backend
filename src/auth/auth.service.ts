import { DealService } from './../modules/deal/deal.service';
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
import { EntrepreneurshipService } from 'src/modules/entrepreneurship/entrepreneurship.service';
import GetFiltersUsersDTO from 'src/modules/user/dto/get-filters-user.dto';
import EditUserDTO from 'src/modules/user/dto/edit-user.dto';

@Injectable()
export class AuthService {

    private userRepository: UserRepository;

    constructor(
        private readonly connection: Connection,
        private readonly jwtService:JwtService,
        private readonly mailer:NodemailerService,
        private readonly entrepreneurshipService:EntrepreneurshipService,
        private readonly DealService:DealService
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

    async signInAdmin(authCrendentialsDTO:AuthCrendentialsDTO){
        const user:User = await this.userRepository.signInAdmin(authCrendentialsDTO);
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

    async getUsers(getFiltersUsersDTO:GetFiltersUsersDTO){
        return this.userRepository.getUsers(getFiltersUsersDTO);
    }

    async detailsAccount(user:User){
        const entrepreneurships = await this.entrepreneurshipService.getEntrepreneurshipsByUser(user.id);
        const deals = await this.DealService.getDealsByUser(user.id);
        return {
            user,
            entrepreneurships,
            deals
        }
    }

    async editUser(editUserDTO:EditUserDTO,user:User){
        try {
            const {id,fullname,phone,password} = editUserDTO;
            if(user.id != id) throw new UnauthorizedException();
            const editUser = await this.userRepository.findOne(id);
            if(!editUser) throw new UnauthorizedException();
            try {
                if(fullname) editUser.fullname = fullname;
                if(phone) editUser.phone = phone;
                if(password) editUser.password = password;
                else delete editUser.password;
                await editUser.save();
                return true;
            } catch (error) {
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async unsubscribeUser(editUserDTO:EditUserDTO,user:User){
        try {
            if(user.id != editUserDTO.id) throw new UnauthorizedException();
            await this.userRepository.update(editUserDTO.id,{actived:false});
            return true;
        } catch (error) {
            throw error;
        }
    }
}
