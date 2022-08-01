import { Bill, BillResponse, InputBill } from "../entits/Bill";
import { Resolver, Query, Arg, Mutation, Ctx, UseMiddleware } from "type-graphql";
import { validateBill, validateProdect } from "../utils/inputValidator";
import { apiContext, PList } from "../utils/types";
import { InputProduct, Product } from "../entits/Product";
import { GenratePdf } from "../utils/GenratePdfBill";
import { User } from "../entits/User";
import { isAuth } from "../middleware/UserAuth";

@Resolver()
export class BillResolver {
  @Query(() => [Bill])
  Bills(@Ctx() { req }: apiContext) {
    const MyId = req.session?.userId;

    return Bill.findBy({ UserID: MyId });
  }

  @Query(() => Bill, { nullable: true })
  Bill(@Arg("id") _id: number) {
    return Bill.findOneBy({ _id });
  }
  
  @UseMiddleware(isAuth)
  @Mutation(() => BillResponse)
  async createBill(
    @Ctx() { req }: apiContext,
    @Arg("BillInput") BillInput: InputBill,
    @Arg("List", () => [InputProduct]) List: PList
  ) {
    const MyId = req.session?.userId;
    const iserror = validateBill(BillInput);

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
    const bill = await Bill.create(BillInput as Bill).save();


    let isErroList;
    List.every(async (item) => {
      item.UserId = MyId;
      item.BillId = bill._id;
      isErroList = validateProdect(item);
      if (isErroList) return;

      await Product.create(item as Product).save();
    });

    if (isErroList)
      return {
        errors: isErroList,
      };
    const UserData = await User.findOneBy({ _id: MyId });

    try {
      GenratePdf(pdfName, List, bill, UserData);
    } catch (e) {
      console.log(e);
    }

    return {
      Bill:bill
    };
  }
}
