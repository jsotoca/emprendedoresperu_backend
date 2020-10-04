import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Entrepreneurship from "../entrepreneurship/entrepreneurship.entity";

@Entity('district')
export default class District extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({nullable:false})
    district:string;

    @OneToMany(type=>Entrepreneurship,entrepreneurship=>entrepreneurship.district,{eager:true})
    @Exclude({toPlainOnly:true})
    entrepreneurships:Entrepreneurship[];

    toJSON(){
        return classToPlain(this);
    }
}