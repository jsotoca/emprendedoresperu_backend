import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import User from './../../user/user.entity';
import { configuration } from './../../configuration/configuration.keys';

@Injectable()
export default class NodemailerService {
    constructor(
        private mailerService:MailerService,
        private config:ConfigService
    ){}

    sendMailRegister(user:User){
        const resp = this.mailerService.sendMail({
            to: user.email,
            from: '"Emprendedores Perú No-Responder" <no-reply@sipandigital.com>',
            subject: '¡🚀Bienvenido a la comunidad de "Emprendedores Perú" 🚀!',
            template: 'register',
            context: {
                user:user.fullname
            },
        }).then(()=>{console.log('email enviando')}).catch(()=>{console.log('email enviando')});
    }

    sendMailResetPassword(names:string,email:string,token:string){
        const env_url = this.config.get<string>(configuration.ENV_URL);
        const url = `${env_url}/auth/resetpassword/${email}/${token}`;
        this.mailerService.sendMail({
            to: email,
            from: '"Emprendedores Perú No-Responder" <no-reply@sipandigital.com>',
            subject: 'Resetear Contraseña en "Emprendedores Perú" 🚀',
            template: 'resetpassword',
            context: {
                names,
                url
            },
        }).then(()=>{console.log('email enviando')}).catch(()=>{console.log('email enviando')});
    }
}