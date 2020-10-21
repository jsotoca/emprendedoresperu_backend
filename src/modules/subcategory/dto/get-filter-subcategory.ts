import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsInt } from 'class-validator';

export default class GetFiltersSubcategoriesDTO {

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
    category:number;

    @IsOptional()
    search:string;


}