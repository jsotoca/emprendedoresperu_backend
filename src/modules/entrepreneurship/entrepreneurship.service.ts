import { Injectable } from '@nestjs/common';
import CreateEntrepreneurshipDTO from './dto/create-entrepreneurship.dto';
import User from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import EntrepreneurshipRepository from './entrepreneurship.repository';

@Injectable()
export class EntrepreneurshipService {

    constructor(
        @InjectRepository(EntrepreneurshipRepository)
        private readonly entrepreneurshipRepository:EntrepreneurshipRepository
    ){}

    async createEntrepreneurship(user:User,createEntrepreneurshipDTO:CreateEntrepreneurshipDTO){
        const entrepreneurship = await this.entrepreneurshipRepository.createEntrepreneurship(user,createEntrepreneurshipDTO);
        return {ok:true,entrepreneurship};
    }
}
