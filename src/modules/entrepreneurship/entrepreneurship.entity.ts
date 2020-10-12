import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, RelationId, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { classToPlain, Exclude } from "class-transformer";
import User from "../../modules/user/user.entity";
import Subcategory from "../subcategory/subcategory.entity";
import District from "../district/district.entity";
import Tag from "../tag/tag.entity";
import Deal from "../deal/deal.entity";

@Entity('entrepreneurship')
export default class Entrepreneurship extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable:false,unique:true})
    name:string;

    @Column({nullable:false})
    description:string;

    @Column({nullable:false})
    slogan:string;

    @ManyToOne(type=>Subcategory,subcategory=>subcategory.entrepreneurships,{eager:false})
    @JoinColumn({ name: "subcategory" })
    subcategory:Subcategory;

    @ManyToOne(type=>District,district=>district.entrepreneurships,{eager:false})
    @JoinColumn({ name: "district" })
    district:District;
    
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

    @Column({nullable:true,unique:true})
    facebook:string;

    @Column({nullable:true,unique:true})
    twitter:string;

    @Column({nullable:true,unique:true})
    youtube:string;

    @Column({nullable:true,unique:true})
    instagram:string;

    @Column({nullable:true,unique:true})
    tiktok:string;

    @Column({nullable:false,default: ()=>false})
    isVerified:boolean;

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

    @ManyToMany(type => Tag, { cascade: true })
    @JoinTable({
        name: 'entrepreneurship_has_tags',
        joinColumn: { name: 'entrepreneuship', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'tag', referencedColumnName: 'id'},
    })
    tags: Tag[];

    @OneToMany(type=>Deal,deal=>deal.entrepreneurship,{eager:true})
    // @Exclude({toPlainOnly:true})
    deals:Deal[];

    toJSON(){
        return classToPlain(this);
    }

}