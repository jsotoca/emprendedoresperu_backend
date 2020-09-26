import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Entrepreneurship from "../entrepreneurship/entrepreneurship.entity";

@Entity('category')
export default class Category extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable:false,unique:true})
    name:string;

    @Column({nullable:false})
    image:string;

    @OneToMany(type=>Entrepreneurship,entrepreneurship=>entrepreneurship.category,{eager:true})
    @Exclude({toPlainOnly:true})
    entrepreneurships:Entrepreneurship[];

    toJSON(){
        return classToPlain(this);
    }
}