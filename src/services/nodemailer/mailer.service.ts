import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import User from './../../modules/user/user.entity';
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
            from: '"Emprendedores Perú No-Responder" <noresponder@sipandigital.com>',
            subject: '¡🚀Bienvenido a la comunidad de "Emprendedores Perú" 🚀!',
            template: 'register',
            context: {
                user:user.fullname
            },
        }).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
    }

    sendMailResetPassword(names:string,email:string,token:string){
        const url = `https://publilam.com/resetpassword?email=${email}&token=${token}`;
        this.mailerService.sendMail({
            to: email,
            from: '"Publilam No-Responder" <noresponder@publilam.com>',
            subject: 'Resetear Contraseña en "Publilam" 🚀',
            template: 'resetpassword',
            context: {
                names,
                url
            },
        }).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
    }
}