import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
import { Category } from '../enums/category.enum';

export default class GetFiltersEntrepreneurshipDTO {

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    page:number;

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    limit:number;
    
    @IsOptional()
    @IsEnum(Category)
    category:Category

    @IsOptional()
    search:string;


}