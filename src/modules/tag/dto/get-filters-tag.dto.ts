import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export default class GetFiltersTagsDTO {

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    page:number;

    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    limit:number;

    @IsOptional()
    search:string;

}