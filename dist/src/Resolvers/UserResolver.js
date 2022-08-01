"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entits/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const inputValidator_1 = require("../utils/inputValidator");
let UserResolver = class UserResolver {
    Users() {
        return User_1.User.find();
    }
    User(_id) {
    }
    async Profile({ req }) {
        if (!req.session.userId)
            return null;
        const usersend = await User_1.User.findOneBy({ _id: req.session.userId });
        console.log(usersend);
        return usersend;
    }
    async loginUser(props, { req }) {
        console.log(props);
        const error = (0, inputValidator_1.validateUserLogin)(props);
        if (error)
            return {
                errors: error
            };
        const userFind = await User_1.User.findOne({ where: { email: props.email } });
        if (!userFind)
            return {
                errors: [
                    { field: "email",
                        message: "incorrect email " }
                ]
            };
        const isValid = await argon2_1.default.verify(userFind.Password, props.Password);
        if (!isValid)
            return {
                errors: [
                    { field: "password",
                        message: "incorrect email or password" }
                ]
            };
        req.session.userId = userFind._id;
        return {
            user: userFind
        };
    }
    logout({ req, res }) {
        res.clearCookie('billtoken');
        return new Promise(resulv => req.session.destroy(err => {
            if (err)
                return resulv(false);
            return resulv(true);
        }));
    }
    async createUser(userInput, { req }) {
        const error = (0, inputValidator_1.validateUser)(userInput);
        console.log("erro no excet");
        console.log(error);
        if (error)
            return { errors: error };
        userInput.Password = await argon2_1.default.hash(userInput.Password);
        const returnuser = await User_1.User.create(userInput).save();
        req.session.userId = returnuser._id;
        return {
            user: returnuser
        };
    }
    async updateUser(_id, userInput) {
        const error = (0, inputValidator_1.validateUser)(userInput);
        if (error)
            return {
                errors: error
            };
        const findUser = await User_1.User.findOneBy({ _id });
        if (!findUser)
            return {
                errors: {
                    fied: "error"
                }
            };
        if (userInput.Adress)
            findUser.Adress = userInput.Adress;
        if (userInput.Contact)
            findUser.Contact = userInput.Contact;
        if (userInput.Name)
            findUser.Name = userInput.Name;
        return await User_1.User.save(findUser);
    }
    async deleteUser(_id) {
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "Users", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "User", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Profile", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("userNameAndPassword")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.UsernameAndPassword, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("UserInput", () => User_1.InputUser)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.InputUser, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("UserInput", () => User_1.InputUser)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, User_1.InputUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map