import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDTO from '../user/dto/signup.dto';

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

}
