import { RolesGuard } from './../../auth/guards/roles.guard';
import { UserService } from './user.service';
import { Controller, Get, Patch, UseGuards, UsePipes, ValidationPipe, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import User from './user.entity';
import EditUserDTO from './dto/edit-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from './user.roles';
import GetFiltersUsersDTO from './dto/get-filters-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @Get('/')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles([UserRoles.ADMIN])
    @UsePipes(ValidationPipe)
    async getUsers(
        @Body() getFiltersUsersDTO:GetFiltersUsersDTO,
    ){
        return await this.userService.getUsers(getFiltersUsersDTO);
    }


    @Patch('/')
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    async editUser(
        @Body() editUserDTO:EditUserDTO,
        @GetUser() user:User
    ){
        return await this.userService.editUser(editUserDTO,user);
    }

    @Delete('/')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles([UserRoles.USER])
    @UsePipes(ValidationPipe)
    async unsubscribeUser(
        @Body() editUserDTO:EditUserDTO,
        @GetUser() user:User
    ){
        return await this.userService.unsubscribeUser(editUserDTO,user);
    }

}
