import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt, IsDate } from 'class-validator';

export default class CreateDealDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    name:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(225)
    description:string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    start_date:string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date) 
    end_date:string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    entrepreneurship:number;

}