import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { configuration } from './../../configuration/configuration.keys';

export const JwtProvider = JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async(config:ConfigService)=>({
        secret:config.get<string>(configuration.TOKEN_SECRET),
        signOptions:{
            expiresIn:'7d'
        }
    })
});