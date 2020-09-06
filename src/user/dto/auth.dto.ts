import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export default class AuthCrendentialsDTO {
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
}