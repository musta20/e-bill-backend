import { InputUser, UsernameAndPassword } from "../entits/User";
import { ErrorFiled } from "./types";
import Joi from "joi";
import { InputBill } from "../entits/Bill";
import { InputProduct } from "src/entits/Product";

export function validateBill(inputUser: InputBill): ErrorFiled[] | boolean {
  const schema = Joi.object({
    CustomerName: Joi.string().required().min(5),
    PdfName: Joi.string(),

    CustomerId: Joi.number().required().min(5),
    Total: Joi.number(),
    UserID: Joi.number(),
  });
  const { error } = schema.validate(inputUser);

  if (error) {
    let errorArray: ErrorFiled[] = [];

    error.details.forEach((err) => {
      if (errorArray)
        errorArray.push({ field: filedname(err.message), message: err.message });
    });
    console.log(errorArray)

    return errorArray;
  }
  return false;
}



export function validateProdect(inputUser: InputProduct): ErrorFiled[] | boolean {
  const schema = Joi.object({
    Name: Joi.string().required().min(3),

    Price: Joi.number().required().min(1),
    Quantity: Joi.number().required().min(1),
    UserId: Joi.number(),
    BillId: Joi.number(),
  });

  
  const { error } = schema.validate(inputUser);

  if (error) {
    let errorArray: ErrorFiled[] = [];

    error.details.forEach((err) => {
      if (errorArray)
        errorArray.push({ field: 'List', message: err.message });
    });
//console.log(errorArray)
    return errorArray;
  }
  return false;
}

export function validateUser(inputUser: InputUser): ErrorFiled[] | boolean {
  const schema = Joi.object({
    Name: Joi.string().min(5).max(30).required(),

    Password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .min(6)
      .max(15),
    Contact: Joi.string().required().min(6).max(15),
    Adress: Joi.string().required().min(6),
    RegistrationNumber: Joi.number().required().min(10),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .min(5),
  });
  const { error } = schema.validate(inputUser);
  console.log(error);

  if (error) {
    let errorArray: ErrorFiled[] = [];

    error.details.forEach((err) => {
      if (errorArray)
        errorArray.push({
          field: filedname(err.message),
          message: err.message,
        });
    });

    return errorArray;
  }
  return false;
}

export function validateUserLogin(
  inputUser: UsernameAndPassword
): ErrorFiled[] | boolean {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    Password: Joi.string().required(),
  });

  const { error } = schema.validate(inputUser);
  console.warn(error);

  if (error) {
    let errorArray: ErrorFiled[] = [];

    error.details.forEach((err) => {
      if (errorArray)
        errorArray.push({
          field: filedname(err.message),
          message: err.message,
        });
    });

    return errorArray;
  }
  return false;
}

function filedname(str: string): string {
  if (str.includes("Password")) return "Password";
  if (str.includes("email")) return "email";
  if (str.includes("Adress")) return "Adress";
  if (str.includes("Contact")) return "Contact";
  if (str.includes("RegistrationNumber")) return "RegistrationNumber";
  if (str.includes("CustomerName")) return "CustomerName";
  if (str.includes("CustomerId")) return "CustomerId";
  if (str.includes("Name")) return "Name";

  return str;
}

