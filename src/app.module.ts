import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { configuration } from './configuration/configuration.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { EntrepreneurshipModule } from './entrepreneurship/entrepreneurship.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    UserModule,
    AuthModule,
    ServicesModule,
    EntrepreneurshipModule,
  ]
})
export class AppModule {
  static PORT:number|string;
  constructor(configService:ConfigService){
    AppModule.PORT = configService.get(configuration.PORT);
  }
}
