import { Module } from '@nestjs/common';
import { MailerProvider } from './nodemailer/mailer.provider';
import NodemailerService from './nodemailer/mailer.service';

@Module({
    imports:[
        MailerProvider
    ],
    exports:[
        MailerProvider,
        NodemailerService
    ],
    providers:[
        NodemailerService
    ]
})
export class ServicesModule {}
