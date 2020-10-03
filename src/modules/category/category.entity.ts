import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Subcategory from "../subcategory/subcategory.entity";

@Entity('category')
export default class Category extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable:false,unique:true})
    name:string;

    @Column({nullable:false})
    icon:string;

    @Column({nullable:false})
    image:string;

    @OneToMany(type=>Subcategory,subcategory=>subcategory.category,{eager:true})
    @Exclude({toPlainOnly:true})
    subcategories:Subcategory[];

    toJSON(){
        return classToPlain(this);
    }
}