import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsEnum, IsNumber, IsNumberString, IsInt } from 'class-validator';

export default class CreateEntrepreneurshipDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(225)
    name:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(225)
    description:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(225)
    slogan:string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    category:number;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    @MaxLength(9)
    phone:string;

    @IsOptional()
    @IsString()
    @MaxLength(225)
    address:string;

    @IsOptional()
    @IsString()
    @MaxLength(25)
    location:string;

    @IsOptional()
    @IsString()
    @MaxLength(225)
    logo:string;

    @IsOptional()
    @IsString()
    @MaxLength(225)
    cover:string;

}