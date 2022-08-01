"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenratePdf = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const qr_image_1 = __importDefault(require("qr-image"));
function GenratePdf(pdfName, list, bill, UserData) {
    const customFont = fs_1.default.readFileSync("src/asset/Font/AmiriRegular.ttf");
    const doc = new pdfkit_1.default();
    doc.registerFont(`Amiri-Regular`, customFont);
    doc.pipe(fs_1.default.createWriteStream("src/public/" + pdfName + ".pdf"));
    doc
        .fontSize(25)
        .font(`Amiri-Regular`)
        .text("الفاتورة الالكترونية", { features: ["rtla"], align: "center" })
        .moveDown(0.5);
    doc
        .fontSize(20)
        .text((UserData === null || UserData === void 0 ? void 0 : UserData.Name) + "", { features: ["rtla"], align: "center" })
        .moveDown(0.5);
    doc
        .fontSize(10)
        .text(bill.createdAt + "        التاريخ :", { align: "right" })
        .moveDown(0.5);
    doc
        .fontSize(15)
        .text("رقم السجل التجاري : " + (UserData === null || UserData === void 0 ? void 0 : UserData.RegistrationNumber), {
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
            .text(`                                                                                                                                             ${item.Price}           ${item.Quantity}                        ${item.Name}`, {
            align: "justify",
        })
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
        sellerName: UserData === null || UserData === void 0 ? void 0 : UserData.Name,
        RegistrationNumber: UserData === null || UserData === void 0 ? void 0 : UserData.RegistrationNumber,
        Date: bill.createdAt,
        vat: vat,
        total: Total + vat,
    };
    const stringdata = JSON.stringify(data);
    let qr_svg = qr_image_1.default.image(stringdata, { type: "png" });
    console.log(__dirname);
    let stream = qr_svg.pipe(fs_1.default.createWriteStream("src/public/" + pdfName));
    stream.on("finish", () => {
        doc
            .image("src/public/" + pdfName, { fit: [285, 285], align: "center" })
            .stroke()
            .moveDown(0.5);
        doc.end();
    });
    return true;
}
exports.GenratePdf = GenratePdf;
//# sourceMappingURL=GenratePdfBill.js.map