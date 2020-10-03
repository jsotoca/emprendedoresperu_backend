import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tag')
export default class Tag extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({nullable:false,unique:true})
    description:string;

    @Column()
    icon:string;
}