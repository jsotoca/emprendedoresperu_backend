import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Exclude, classToPlain } from 'class-transformer';
import { UserRoles } from './user.roles';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import Entrepreneurship from "../entrepreneurship/entrepreneurship.entity";

@Entity('user')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @OneToMany(type=>Entrepreneurship,entrepreneurship=>entrepreneurship.user,{eager:true})
    @Exclude({toPlainOnly:true})
    entrepreneurships:Entrepreneurship[];

    @Column({nullable:false})
    fullname:string;

    @Column({nullable:false})
    phone:string;

    @Column({nullable:false,unique:true})
    email:string;

    @Column({nullable:false})
    @Exclude({toPlainOnly:true})
    password:string;

    @Column({default:'no-avatar.png'})
    avatar:string;

    @Column({nullable:false,default:UserRoles.USER})
    role:UserRoles;

    @Column({nullable:false,default: ()=>true})
    actived:boolean;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)'})
    created_at:Date;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)',onUpdate:'CURRENT_TIMESTAMP(6)'})
    updated_at:Date;

    toJSON(){
        return classToPlain(this);
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        if(this.password){
            const salt = genSaltSync(10);
            const passwordHash = hashSync(this.password,salt);
            this.password = passwordHash;
        }
    }

    comparePasswords(password:string){
        return compareSync(password,this.password);
    }
}