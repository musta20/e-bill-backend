"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUser = exports.validateProdect = exports.validateBill = void 0;
const joi_1 = __importDefault(require("joi"));
function validateBill(inputUser) {
    const schema = joi_1.default.object({
        CustomerName: joi_1.default.string().required().min(5),
        PdfName: joi_1.default.string(),
        CustomerId: joi_1.default.number().required().min(5),
        Total: joi_1.default.number(),
        UserID: joi_1.default.number(),
    });
    const { error } = schema.validate(inputUser);
    if (error) {
        let errorArray = [];
        error.details.forEach((err) => {
            if (errorArray)
                errorArray.push({ field: filedname(err.message), message: err.message });
        });
        console.log(errorArray);
        return errorArray;
    }
    return false;
}
exports.validateBill = validateBill;
function validateProdect(inputUser) {
    const schema = joi_1.default.object({
        Name: joi_1.default.string().required().min(3),
        Price: joi_1.default.number().required().min(1),
        Quantity: joi_1.default.number().required().min(1),
        UserId: joi_1.default.number(),
        BillId: joi_1.default.number(),
    });
    const { error } = schema.validate(inputUser);
    if (error) {
        let errorArray = [];
        error.details.forEach((err) => {
            if (errorArray)
                errorArray.push({ field: 'List', message: err.message });
        });
        return errorArray;
    }
    return false;
}
exports.validateProdect = validateProdect;
function validateUser(inputUser) {
    const schema = joi_1.default.object({
        Name: joi_1.default.string().min(5).max(30).required(),
        Password: joi_1.default.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required()
            .min(6)
            .max(15),
        Contact: joi_1.default.string().required().min(6).max(15),
        Adress: joi_1.default.string().required().min(6),
        RegistrationNumber: joi_1.default.number().required().min(10),
        email: joi_1.default.string()
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
        let errorArray = [];
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
exports.validateUser = validateUser;
function validateUserLogin(inputUser) {
    const schema = joi_1.default.object({
        email: joi_1.default.string()
            .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
            .required(),
        Password: joi_1.default.string().required(),
    });
    const { error } = schema.validate(inputUser);
    console.warn(error);
    if (error) {
        let errorArray = [];
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
exports.validateUserLogin = validateUserLogin;
function filedname(str) {
    if (str.includes("Password"))
        return "Password";
    if (str.includes("email"))
        return "email";
    if (str.includes("Adress"))
        return "Adress";
    if (str.includes("Contact"))
        return "Contact";
    if (str.includes("RegistrationNumber"))
        return "RegistrationNumber";
    if (str.includes("CustomerName"))
        return "CustomerName";
    if (str.includes("CustomerId"))
        return "CustomerId";
    if (str.includes("Name"))
        return "Name";
    return str;
}
//# sourceMappingURL=inputValidator.js.map