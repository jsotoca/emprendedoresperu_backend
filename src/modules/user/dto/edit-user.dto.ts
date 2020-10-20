import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional, IsInt } from 'class-validator';

export default class EditUserDTO {

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    id:number;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(120)
    fullname:string;

    @IsOptional()
    @IsString()
    @MinLength(9)
    @MaxLength(9)
    phone:string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:'La contraseña debe contener al menos 6 caracteres entre letras, 1 digito al menos y 1 caracter.'}
    )
    password:string;

}