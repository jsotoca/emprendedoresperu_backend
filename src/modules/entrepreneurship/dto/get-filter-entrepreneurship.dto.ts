import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsInt } from 'class-validator';

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
    @Type(() => Number)
    @IsInt()
    subcategory:number;

    @IsOptional()
    search:string;


}