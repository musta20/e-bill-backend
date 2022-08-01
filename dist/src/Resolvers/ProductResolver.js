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
exports.ProductResolver = void 0;
const Product_1 = require("../entits/Product");
const type_graphql_1 = require("type-graphql");
let ProductResolver = class ProductResolver {
    Products() {
        return Product_1.Product.find();
    }
    Product(_id) {
        return Product_1.Product.findOneBy({ _id });
    }
    async createProduct(ProductInput) {
    }
    async updateProduct(_id, ProductInput) {
        const findProduct = Product_1.Product.findOneBy({ _id });
        if (!findProduct)
            return null;
        return await Product_1.Product.update({ _id }, ProductInput);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Product_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "Products", null);
__decorate([
    (0, type_graphql_1.Query)(() => Product_1.Product, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "Product", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    __param(0, (0, type_graphql_1.Arg)("ProductInput", () => Product_1.InputProduct)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Product_1.InputProduct]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("ProductInput", () => Product_1.InputProduct)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Product_1.InputProduct]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProduct", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=ProductResolver.js.map