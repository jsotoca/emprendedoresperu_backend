import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import User from "../../modules/user/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector:Reflector
    ){}
    
    canActivate(ctx:ExecutionContext){
        const roles = this.reflector.get<string[]>('roles',ctx.getHandler());
        if(!roles)return true;
        const request = ctx.switchToHttp().getRequest();
        const user:User = request.user;
        const idx = roles.indexOf(user.role);
        return idx !== -1;
    }
}