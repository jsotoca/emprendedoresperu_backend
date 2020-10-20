import { UserRoles } from './user.roles';
import UserRepository from 'src/modules/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import EditUserDTO from './dto/edit-user.dto';
import User from './user.entity';
import GetFiltersUsersDTO from './dto/get-filters-user.dto';
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository:UserRepository
    ){}

    async getUsers(getFiltersUsersDTO:GetFiltersUsersDTO){
        return this.userRepository.getUsers(getFiltersUsersDTO);
    }

    async editUser(editUserDTO:EditUserDTO,user:User){
        try {
            if(user.id != editUserDTO.id) throw new UnauthorizedException();
            this.userRepository.update(editUserDTO.id,editUserDTO);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async unsubscribeUser(editUserDTO:EditUserDTO,user:User){
        try {
            if(user.id != editUserDTO.id) throw new UnauthorizedException();
            this.userRepository.update(editUserDTO.id,{actived:false});
            return true;
        } catch (error) {
            throw error;
        }
    }
    
}
