import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { configuration } from './configuration/configuration.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { EntrepreneurshipModule } from './modules/entrepreneurship/entrepreneurship.module';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { TagModule } from './modules/tag/tag.module';
import { DistrictModule } from './modules/district/district.module';
import { DealModule } from './modules/deal/deal.module';
import { ProductModule } from './modules/product/product.module';
import { AdsModule } from './modules/ads/ads.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    UserModule,
    AuthModule,
    ServicesModule,
    EntrepreneurshipModule,
    CategoryModule,
    SubcategoryModule,
    TagModule,
    DistrictModule,
    DealModule,
    ProductModule,
    AdsModule,
  ]
})
export class AppModule {
  static PORT:number|string;
  constructor(configService:ConfigService){
    AppModule.PORT = configService.get(configuration.PORT);
  }
}
