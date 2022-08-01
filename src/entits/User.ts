import { Field, ObjectType , InputType } from "type-graphql";
import { PrimaryGeneratedColumn , Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";
import { ErrorFiled } from "../utils/types";

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;


  @Field()
  @Column({unique:true})
  Name!: string;


  @Field()
  @Column({unique:true})
  email!: string;

  @Field()
  @Column()
  Password!: string;


  @Field()
  @Column()
  Contact!: string;


  @Field()
  @Column()
  Adress!: string;

  @Field()
  @Column({unique:true})
  RegistrationNumber!: number;


  
  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();

}

@InputType()
export class InputUser {
  @Field()
  Name: string;

  @Field()
  email: string;

  @Field()
  Password: string;

  @Field()
  Contact?: string;

  @Field()
  Adress?: string;

  @Field({nullable:true})
  RegistrationNumber?: number ;
}

/* @ObjectType()
export class FieldError {
  @Field()
  field: String;
  
  @Field()
  message: String;
} */

//usernameAndPassword
@InputType()
export class UsernameAndPassword {

  @Field()
  email: string;

  @Field()
  Password: string;


}



@ObjectType()
export class UserResponse {

  @Field(()=>[ErrorFiled],{nullable:true})
  errors?: [ErrorFiled];

  @Field(()=>User,{nullable:true})
  user?: User;


}