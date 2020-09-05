import { configuration } from './configuration/configuration.keys';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(
    private readonly configservice:ConfigService
  ){}

  getHello(): string {
    return `Bienvenido al backend de ${this.configservice.get(configuration.APPLICATION_NAME)} 🚀`;
  }
}
