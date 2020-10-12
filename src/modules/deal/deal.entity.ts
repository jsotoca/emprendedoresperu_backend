import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Entrepreneurship from "../entrepreneurship/entrepreneurship.entity";
@Entity("deal")
export default class Deal extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    description:string;

    @Column({nullable:false})
    type:number;

    @Column({nullable:false})
    image:string;

    @Column({nullable:false})
    start_date:Date;

    @Column({nullable:false})
    end_date:Date;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)'})
    created_at:Date;

    @CreateDateColumn({type:'timestamp',default:()=>'CURRENT_TIMESTAMP(6)',onUpdate:'CURRENT_TIMESTAMP(6)'})
    updated_at:Date;

    @ManyToOne(type=>Entrepreneurship,entrepreneurship=>entrepreneurship.deals,{eager:false})
    @JoinColumn({ name: "entrepreneurship" })
    entrepreneurship:Entrepreneurship;

}