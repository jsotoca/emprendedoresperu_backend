import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configuration } from './../../configuration/configuration.keys';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from 'src/modules/user/user.repository';
import { JwtPayload } from './jwt.payload';
import { Connection } from 'typeorm';
@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly connection: Connection,
        private config:ConfigService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get<string>(configuration.TOKEN_SECRET)
        });
        this.userRepository = this.connection.getCustomRepository(UserRepository);
    }

    async validate(payload:JwtPayload){
        const { id } = payload;
        const user = await this.userRepository.findOne({id});
        if(!user || !user.actived) throw new UnauthorizedException('token invalido');
        return user;
    }
}