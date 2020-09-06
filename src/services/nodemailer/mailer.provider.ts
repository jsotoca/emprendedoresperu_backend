import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './../../configuration/configuration.keys';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export  const MailerProvider =  MailerModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: async(config:ConfigService)=>({
        transport:config.get<string>(configuration.SMTP_TRANSPORT),
        defaults:{
            from:'"Emprendedores Perú No-Responder" <no-reply@sipandigital.com>'
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