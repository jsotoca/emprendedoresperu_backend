import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Category from "../category/category.entity";
import Entrepreneurship from "../entrepreneurship/entrepreneurship.entity";

@Entity('subcategory')
export default class Subcategory extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable:false,unique:true})
    name:string;

    @Column({nullable:false})
    icon:string;

    @Column({nullable:false})
    image:string;

    @ManyToOne(type=>Category,category=>category.subcategories,{eager:false})
    @JoinColumn({ name: "category" })
    category:Category;

    @OneToMany(type=>Entrepreneurship,entrepreneurship=>entrepreneurship.subcategory,{eager:true})
    @Exclude({toPlainOnly:true})
    entrepreneurships:Entrepreneurship[];

    toJSON(){
        return classToPlain(this);
    }
}