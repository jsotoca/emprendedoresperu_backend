import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './../../configuration/configuration.keys';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export  const MailerProvider =  MailerModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async(config:ConfigService)=>({
        transport: config.get<string>(configuration.SMTP_TRANSPORT),
        requireTLS: true,
        secure:true,
        defaults:{
            from:'"Emprendedores Perú No-Responder" <noresponder@sipandigital.com>'
        },
        template: {
          dir: './templates/email',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
    })
});