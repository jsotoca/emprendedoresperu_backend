import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export default class CreateCategoryDTO {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(225)
    name:string;

}