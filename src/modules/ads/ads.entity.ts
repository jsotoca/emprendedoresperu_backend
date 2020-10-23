import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "../user/user.entity";

@Entity('ads')
export default class Ads extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    image:string;

    @Column({nullable:false})
    position:number;

    @Column({nullable:false,default: ()=>true})
    actived:boolean;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)'})
    created_at:Date;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)',onUpdate:'CURRENT_TIMESTAMP(6)'})
    updated_at:Date;

    toJSON(){
        return classToPlain(this);
    }
}