import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt } from 'class-validator';

export default class CreateSubcategoryDTO {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(225)
    name:string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    category:number;
}