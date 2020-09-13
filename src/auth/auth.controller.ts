import { Controller, Post, Body, ValidationPipe, Param, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDTO from '../modules/user/dto/signup.dto';
import AuthCrendentialsDTO from '../modules/user/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){}

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) signUpDTO:SignUpDTO
    ){
        return await this.authService.signUp(signUpDTO);
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) authCrendentialsDTO:AuthCrendentialsDTO
    ){
        return await this.authService.signIn(authCrendentialsDTO);
    }

    @Post('/forgotpassword')
    async forgortPassword(
        @Body('email') email:string
    ){
        return await this.authService.forgotPassword(email);
    }

    @Post('/resetpassword/:email/:token')
    async resetPassword(
        @Body('password') password:string,
        @Param('email') email:string,
        @Param('token') token:string,
    ){
        return await this.authService.resetPassword(password,email,token);
    }

    @Get('/demo')
    @UseGuards(AuthGuard('jwt'))
    saludo(){
        return {message:'hola mundo'}
    }

}
