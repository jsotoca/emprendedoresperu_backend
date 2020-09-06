import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { UserRoles } from './user.roles';

@Entity('user')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:false})
    fullname:string;

    @Column({nullable:false})
    phone:string;

    @Column({nullable:false})
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
}