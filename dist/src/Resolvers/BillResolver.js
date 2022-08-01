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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillResolver = void 0;
const Bill_1 = require("../entits/Bill");
const type_graphql_1 = require("type-graphql");
const inputValidator_1 = require("../utils/inputValidator");
const Product_1 = require("../entits/Product");
const GenratePdfBill_1 = require("../utils/GenratePdfBill");
const User_1 = require("../entits/User");
const UserAuth_1 = require("../middleware/UserAuth");
let BillResolver = class BillResolver {
    Bills({ req }) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        return Bill_1.Bill.findBy({ UserID: MyId });
    }
    Bill(_id) {
        return Bill_1.Bill.findOneBy({ _id });
    }
    async createBill({ req }, BillInput, List) {
        var _a;
        const MyId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
        const iserror = (0, inputValidator_1.validateBill)(BillInput);
        if (iserror)
            return {
                errors: iserror,
            };
        if (!List.length)
            return {
                errors: [{ field: "List", message: "يجب إضافة منتجات " }],
            };
        BillInput.UserID = MyId;
        const pdfName = Math.trunc(Math.random() * 1000) + "BILLNO";
        BillInput.PdfName = pdfName;
        const bill = await Bill_1.Bill.create(BillInput).save();
        let isErroList;
        List.every(async (item) => {
            item.UserId = MyId;
            item.BillId = bill._id;
            isErroList = (0, inputValidator_1.validateProdect)(item);
            if (isErroList)
                return;
            await Product_1.Product.create(item).save();
        });
        if (isErroList)
            return {
                errors: isErroList,
            };
        const UserData = await User_1.User.findOneBy({ _id: MyId });
        try {
            (0, GenratePdfBill_1.GenratePdf)(pdfName, List, bill, UserData);
        }
        catch (e) {
            console.log(e);
        }
        return {
            Bill: bill
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Bill_1.Bill]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BillResolver.prototype, "Bills", null);
__decorate([
    (0, type_graphql_1.Query)(() => Bill_1.Bill, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BillResolver.prototype, "Bill", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(UserAuth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Bill_1.BillResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("BillInput")),
    __param(2, (0, type_graphql_1.Arg)("List", () => [Product_1.InputProduct])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Bill_1.InputBill, Array]),
    __metadata("design:returntype", Promise)
], BillResolver.prototype, "createBill", null);
BillResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BillResolver);
exports.BillResolver = BillResolver;
//# sourceMappingURL=BillResolver.js.map