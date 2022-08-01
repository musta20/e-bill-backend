import { ErrorFiled } from "../utils/types";
import { Field, ObjectType, InputType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class Bill extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  UserID!: number;

  @Field()
  @Column()
  CustomerName!: string;

  @Field()
  @Column()
  PdfName!: string;

  @Field()
  @Column()
  CustomerId!: number ;

  @Field()
  @Column()
  Total!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @Field()
  @UpdateDateColumn()
  updatedAt: Date = new Date();
}



@InputType()
export class InputBill {

  @Field()
  CustomerName: string;

  @Field({nullable:true})
  CustomerId: number ;

  @Field({nullable:true})
  Total: number;

  @Field({nullable:true})
  UserID: number;


  @Field({nullable:true})
  PdfName: string

}



@ObjectType()
export class BillResponse {

  @Field(()=>[ErrorFiled],{nullable:true})
  errors?: [ErrorFiled];

  @Field(()=>Bill,{nullable:true})
  Bill?: Bill;


}