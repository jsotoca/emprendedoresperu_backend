import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, RelationId, JoinColumn } from "typeorm";
import { classToPlain, Exclude } from "class-transformer";
import User from "../../modules/user/user.entity";

@Entity('entrepreneurship')
export default class Entrepreneurship extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    description:string;

    @Column({nullable:false})
    slogan:string;
    
    @Column({nullable:false})
    phone:string;

    @Column({nullable:true})
    address:string;

    @Column({nullable:true})
    location:string;

    @Column({nullable:true, default:'no-logo.png'})
    logo:string;

    @Column({nullable:true, default:'no-cover.png'})
    cover:string;

    @Column({nullable:false,default: ()=>true})
    actived:boolean;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)'})
    created_at:Date;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)',onUpdate:'CURRENT_TIMESTAMP(6)'})
    updated_at:Date;

    @ManyToOne(type=>User,user=>user.entrepreneurships,{eager:false})
    @JoinColumn({ name: "user" })
    @Exclude({toPlainOnly:true})
    user:User;

    toJSON(){
        return classToPlain(this);
    }

}