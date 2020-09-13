import { EntityRepository, Repository } from "typeorm";
import User from "./user.entity";
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import SignUpDTO from "./dto/signup.dto";
import AuthCrendentialsDTO from "./dto/auth.dto";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    async signUp(signupDTO:SignUpDTO){
        const { fullname, email, password, phone } = signupDTO;
        const user = new User();
        user.fullname = fullname;
        user.email = email;
        user.password = password;
        user.phone = phone;
        try {
            await user.save();
            return user;
        } catch (error) {
            if(error.errno === 1062) throw new ConflictException('Email ya registrado.');
            else throw new InternalServerErrorException('Error con el servidor al momento de registrar.');
        }
    }

    async signIn(authCredentialsDTO:AuthCrendentialsDTO){
        const {email,password} = authCredentialsDTO;
        const user = await this.findOne({email});
        if(user && user.comparePasswords(password) && user.actived) return user;
        else throw new UnauthorizedException('Usuario y/o contraseña incorrectas.');
    }
}