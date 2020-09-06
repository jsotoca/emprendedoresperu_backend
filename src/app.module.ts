import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { configuration } from './configuration/configuration.keys';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule
  ]
})
export class AppModule {
  static PORT:number|string;
  constructor(configService:ConfigService){
    AppModule.PORT = configService.get(configuration.PORT);
  }
}
