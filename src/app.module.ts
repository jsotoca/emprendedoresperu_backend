import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { configuration } from './configuration/configuration.keys';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static PORT:number|string;
  constructor(configService:ConfigService){
    AppModule.PORT = configService.get(configuration.PORT);
  }
}
