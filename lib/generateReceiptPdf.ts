export interface ReceiptPackageDetails {
  price: number;
  departureDate: string;
  returnDate: string;
  duration?: string;
}

export interface ReceiptData {
  applicationId: string;
  packageName?: string;
  applicantName?: string;
  email?: string;
  companyName?: string;
  companyWebsite?: string;
  supportPhone?: string;
  status?: string;

  packageDetails?: ReceiptPackageDetails;
}

import jsPDF from "jspdf";

export const generateReceiptPdf = async ({
  applicationId,
  packageName,
  applicantName,
  companyName = "GM International",
  companyWebsite = "https://www.gminternational.live",
  supportPhone = "+880 1898-796501",
  status = "Pending",
  packageDetails,
}: ReceiptData) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // HEADER
  pdf.setFillColor(220, 38, 38);
  pdf.rect(0, 0, pageWidth, 80, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(26);
  pdf.setFont("helvetica", "bold");

  pdf.text(companyName, pageWidth / 2, 35, {
    align: "center",
  });

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");

  pdf.text("Umrah & Hajj Services", pageWidth / 2, 52, {
    align: "center",
  });

  pdf.text("Application Receipt", pageWidth / 2, 67, {
    align: "center",
  });

  // Receipt info
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(10);

  pdf.text("Receipt No", 40, 105);

  pdf.text("Date", pageWidth - 40, 105, {
    align: "right",
  });

  pdf.setTextColor(30, 30, 30);

  pdf.setFontSize(13);

  pdf.setFont("helvetica", "bold");

  pdf.text(applicationId, 40, 120);

  pdf.text(date, pageWidth - 40, 120, {
    align: "right",
  });

  // Divider
  pdf.setDrawColor(220, 38, 38);
  pdf.setLineWidth(1.5);

  pdf.line(40, 130, pageWidth - 40, 130);

  // Applicant Box
  pdf.setFillColor(249, 250, 251);

  const boxHeight = packageDetails ? 175 : 80;

  pdf.roundedRect(40, 140, pageWidth - 80, boxHeight, 6, 6, "F");

  pdf.setTextColor(220, 38, 38);

  pdf.setFontSize(13);

  pdf.setFont("helvetica", "bold");

  pdf.text("Applicant Information", 55, 162);

  const rows: [string, string][] = [
    ["Name", applicantName ?? ""] as [string, string],
    ["Package", packageName ?? ""] as [string, string],

    ...(packageDetails
      ? [
          ["Duration", packageDetails.duration ?? ""] as [string, string],
          [
            "Departure",
            new Date(packageDetails.departureDate).toLocaleDateString(),
          ] as [string, string],
          [
            "Return",
            new Date(packageDetails.returnDate).toLocaleDateString(),
          ] as [string, string],
          ["Package Price", `BDT ${packageDetails.price.toLocaleString()}`] as [
            string,
            string,
          ],
        ]
      : []),
  ];

  let y = 183;

  rows.forEach(([label, value]) => {
    pdf.setTextColor(120, 120, 120);

    pdf.setFontSize(10);

    pdf.setFont("helvetica", "normal");

    pdf.text(label, 55, y);

    pdf.setTextColor(
      label === "Package Price" ? 220 : 30,
      label === "Package Price" ? 38 : 30,
      label === "Package Price" ? 38 : 30,
    );

    pdf.setFont("helvetica", "bold");

    pdf.text(value, 200, y);

    y += 22;
  });

  // STATUS BOX
  const statusY = y + 15;

  pdf.setFillColor(254, 243, 199);

  pdf.roundedRect(40, statusY, pageWidth - 80, 55, 6, 6, "F");

  pdf.setTextColor(146, 64, 14);

  pdf.setFontSize(11);

  pdf.setFont("helvetica", "bold");

  pdf.text(`Payment Status: ${status}`, 75, statusY + 20);

  pdf.setFontSize(9);

  pdf.setFont("helvetica", "normal");

  pdf.text("Your application is under review", 75, statusY + 35);

  // FOOTER
  const footerY = statusY + 80;

  pdf.setDrawColor(229, 231, 235);

  pdf.line(40, footerY, pageWidth - 40, footerY);

  pdf.setTextColor(150, 150, 150);

  pdf.setFontSize(9);

  pdf.text(
    "This is a computer-generated receipt",
    pageWidth / 2,
    footerY + 18,
    {
      align: "center",
    },
  );

  pdf.text(
    `For any queries, contact: ${supportPhone}`,
    pageWidth / 2,
    footerY + 32,
    {
      align: "center",
    },
  );

  pdf.setTextColor(220, 38, 38);

  pdf.text(companyWebsite, pageWidth / 2, footerY + 46, {
    align: "center",
  });

  pdf.save(`${companyName.replace(/\s/g, "_")}_Receipt_${applicationId}.pdf`);
};
