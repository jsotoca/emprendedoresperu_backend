import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export default class SignUpDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(120)
    fullname:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    @MaxLength(9)
    phone:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(65)
    email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:'La contraseña debe contener al menos 6 caracteres entre letras, 1 digito al menos y 1 caracter.'}
    )
    password:string;

    @IsOptional()
    @IsString()
    avatar:string;

}