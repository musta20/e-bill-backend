// Importing modules
import PDFDocument from "pdfkit";
import fs from "fs";
import { User } from "../entits/User";
import { Bill } from "../entits/Bill";
import { PList } from "./types";
import qr from "qr-image";
export function GenratePdf(
  pdfName: string,
  list: PList,
  bill: Bill,
  UserData: User | null
): boolean {

  const customFont = fs.readFileSync("src/asset/Font/AmiriRegular.ttf");
  
  const doc = new PDFDocument();
  doc.registerFont(`Amiri-Regular`, customFont);
  
  doc.pipe(fs.createWriteStream("src/public/" + pdfName + ".pdf"));

  doc
    .fontSize(25)
     .font(`Amiri-Regular`)
    .text("الفاتورة الالكترونية", { features: ["rtla"], align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(20)
    .text(UserData?.Name + "", { features: ["rtla"], align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(10)
    .text(bill.createdAt + "        التاريخ :", { align: "right" })
    .moveDown(0.5);

  doc
    .fontSize(15)
    .text("رقم السجل التجاري : " + UserData?.RegistrationNumber, {
      features: ["rtla"],
      align: "center",
    })
    .moveDown(0.5);

  let Total = 0;
  doc
    .fontSize(10)
    .text(" السعر           الكمية                          المنتج", {
      align: "right",
    })
    .moveDown(0.5);

  list.forEach((item) => {
    Total += item.Price;

    doc
      .fontSize(10)
      .text(
        `                                                                                                                                             ${item.Price}           ${item.Quantity}                        ${item.Name}`,
        {
          align: "justify",
        }
      )
      .moveDown(0.5);
  });
  doc
    .fontSize(10)
    .text("___________________________________________", { align: "right" })
    .moveDown(0.5);
  doc
    .fontSize(10)
    .text(Total + "   : القيمة ", { align: "right" })
    .moveDown(0.5);

  let vat = (Total * 15) / 100;

  doc
    .fontSize(10)
    .text(vat + "       : الضريبة ", { align: "right" })
    .moveDown(0.5);

  doc
    .fontSize(10)
    .text(Total + vat + "   : المجموع ", { align: "right" })
    .moveDown(0.5);

  let data = {
    sellerName: UserData?.Name,
    RegistrationNumber: UserData?.RegistrationNumber,
    Date: bill.createdAt,
    vat: vat,
    total: Total + vat,
  };

  const stringdata = JSON.stringify(data);

  let qr_svg = qr.image(stringdata, { type: "png" });
  console.log(__dirname);
  let stream = qr_svg.pipe(fs.createWriteStream("src/public/" + pdfName));
  stream.on("finish", () => {
    doc
      .image("src/public/" + pdfName, { fit: [285, 285], align: "center" })
      .stroke()
      .moveDown(0.5);
    doc.end();
  });

  return true;
}
