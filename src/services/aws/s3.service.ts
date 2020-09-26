import { configuration } from './../../configuration/configuration.keys';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
const AmazonS3URI = require('amazon-s3-uri');

@Injectable()
export default class S3Service {

    private readonly bucket:string;
    private readonly s3:S3;

    constructor(
        private config:ConfigService
    ){
        this.bucket = this.config.get<string>(configuration.AWS_S3_BUCKET);
        this.s3 = new S3({
            accessKeyId:this.config.get<string>(configuration.AWS_ACCESS_KEY_ID),
            secretAccessKey:this.config.get<string>(configuration.AWS_ACCESS_SECRET_KEY)
            
        });
    }
   
    async uploadImage(file:any,album:string){
        const name:string = uuidv4();
        const url = `imagenes/${album}/${name}`+extname(file.originalname);
        return await this.upload(file,url);
    }

    async upload(file:any,url:string){
        const params = {
            Body: file.buffer,
            Bucket: this.bucket,
            Key: url,
            ACL: 'public-read',
        }
        try {
            const data = await this.s3.upload(params).promise();
            return data;
        } catch (error) {
            throw error();
        }
    }

    async getDataObject(url:string){
        try {
            const { key } = AmazonS3URI(url);
            return key;
        } catch (error) {
            throw error;
        }
    }

    async deleteImagen(url:string){
        const key:string = await this.getDataObject(url);
        const params = {
            Bucket: this.bucket,
            Key: key,
        }
        this.s3.deleteObject(params,((err,data)=>{
            if(err) throw err;
            else console.log('deleted image');
        }));
    }
}