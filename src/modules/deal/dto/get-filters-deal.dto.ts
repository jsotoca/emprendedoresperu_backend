import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export default class GetFiltersDealDTO {

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