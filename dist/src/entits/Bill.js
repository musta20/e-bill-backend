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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillResponse = exports.InputBill = exports.Bill = void 0;
const types_1 = require("../utils/types");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Bill = class Bill extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bill.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Bill.prototype, "UserID", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bill.prototype, "CustomerName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bill.prototype, "PdfName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Bill.prototype, "CustomerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Bill.prototype, "Total", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Bill.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Bill.prototype, "updatedAt", void 0);
Bill = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Bill);
exports.Bill = Bill;
let InputBill = class InputBill {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], InputBill.prototype, "CustomerName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], InputBill.prototype, "CustomerId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], InputBill.prototype, "Total", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], InputBill.prototype, "UserID", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], InputBill.prototype, "PdfName", void 0);
InputBill = __decorate([
    (0, type_graphql_1.InputType)()
], InputBill);
exports.InputBill = InputBill;
let BillResponse = class BillResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [types_1.ErrorFiled], { nullable: true }),
    __metadata("design:type", Array)
], BillResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Bill, { nullable: true }),
    __metadata("design:type", Bill)
], BillResponse.prototype, "Bill", void 0);
BillResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], BillResponse);
exports.BillResponse = BillResponse;
//# sourceMappingURL=Bill.js.map