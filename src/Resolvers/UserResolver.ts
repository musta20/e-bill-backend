import { User ,UserResponse, InputUser , UsernameAndPassword } from "../entits/User";
import { apiContext  } from "../utils/types";

import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import argon2 from "argon2";
import { validateUser , validateUserLogin } from "../utils/inputValidator";


@Resolver()
export class UserResolver {
  
  @Query(() => [User])
  Users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  User(@Arg("id") _id: number) {
    //return em.findOne(User, { _id });
  }


  @Query(() => User,  { nullable: true })
 async Profile(@Ctx() { req }: apiContext) {
    if(!req.session.userId) return null
    const usersend=  await User.findOneBy({_id:req.session.userId})
    console.log(usersend)
    return usersend
  }


  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("userNameAndPassword") props:UsernameAndPassword,
    @Ctx() {req}: apiContext
  ) {
    console.log(props)
    const error = validateUserLogin(props)
    if (error) return{
      errors:error
    }
    const userFind = await User.findOne({where :{email:props.email}})
     //await em.findOne(User, { email : props.email  })
 
    if(!userFind) return {
      errors:[
        {field:"email",
        message:"incorrect email "}
]
    }

    const isValid =  await argon2.verify(userFind.Password,props.Password)
    
    if(!isValid) return {
      errors:[
         {field:"password",
         message:"incorrect email or password"}
]
    }

    req.session.userId = userFind._id

    return {
      user:userFind
    }
  }


  @Mutation(() => Boolean)
   logout(
    @Ctx() { req , res }: apiContext
  ) {
    res.clearCookie('billtoken');
    
    return new Promise(resulv=>req.session.destroy(err=>{
      if(err) return resulv(false)
      return resulv(true)
    }))
  }


  @Mutation(() => UserResponse)
  async createUser(
    @Arg("UserInput", () => InputUser) userInput: InputUser,
    @Ctx() { req  }: apiContext

  ) {

    const error = validateUser(userInput)
    console.log("erro no excet")

    console.log(error)
    if (error) return{ errors:error }

    userInput.Password =  await argon2.hash(userInput.Password)

const returnuser =await User.create(userInput as User).save()

req.session.userId = returnuser._id
return {
  user :returnuser
 }
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id") _id: number,
    @Arg("UserInput", () => InputUser) userInput: InputUser,

  ) {
    const error = validateUser(userInput)
    if (error) return{
      errors:error
    }

    const findUser = await User.findOneBy({_id})

    if (!findUser) return {
      errors:{
        fied:"error"
      }
    };
    if(userInput.Adress)findUser.Adress = userInput.Adress
    if(userInput.Contact)findUser.Contact = userInput.Contact
    if(userInput.Name)findUser.Name = userInput.Name

   return await User.save(findUser)

  }

  @Mutation(() => Boolean ) 
  async deleteUser(@Arg("id") _id: number)

    {
   // const findUser = em.findOne(User, { _id });

  //  if (!findUser) return false;

    //await em.nativeDelete(User, { _id });

  //  return true;
 // }
}

}
