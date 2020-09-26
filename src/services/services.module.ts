import { Module } from '@nestjs/common';
import S3Service from './aws/s3.service';
import { MailerProvider } from './nodemailer/mailer.provider';
import NodemailerService from './nodemailer/mailer.service';

@Module({
    imports:[
        MailerProvider,
        S3Service
    ],
    exports:[
        MailerProvider,
        NodemailerService,
        S3Service
    ],
    providers:[
        NodemailerService,
        S3Service
    ]
})
export class ServicesModule {}
