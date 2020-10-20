import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsInt } from 'class-validator';

export default class GetFiltersUsersDTO {

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