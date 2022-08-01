import { Field, ObjectType , InputType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  Name!: string;

  @Field()
  @Column()
  Price!: number;
  
  @Field()
  @Column()
  UserId!: number;

  @Field()
  @Column()
  BillId!: number;

  @Field()
  @Column()
  Quantity!: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}



@InputType()
export class InputProduct {

  @Field()
  Name!: string;

  @Field({nullable:true})
  Price!: number  ;

  
  @Field({nullable:true})
  BillId!: number;

  @Field({nullable:true})
  Quantity!: number;

  @Field({nullable:true})
  UserId!: number;

}


/* @ObjectType()
export class  ListItem {
  
  list: [InputProduct] 
} */
