import jsPDF from "jspdf";

export function downloadCertificate(opts: { name: string; course: string; certId: string; }) {
  const { name, course, certId } = opts;
  const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "landscape" });
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();

  // Background
  pdf.setFillColor(248, 250, 252); pdf.rect(0, 0, w, h, "F");

  // Border
  pdf.setDrawColor(79, 70, 229); pdf.setLineWidth(6);
  pdf.rect(24, 24, w - 48, h - 48);
  pdf.setDrawColor(124, 58, 237); pdf.setLineWidth(1);
  pdf.rect(40, 40, w - 80, h - 80);

  // Header
  pdf.setFillColor(79, 70, 229); pdf.rect(40, 40, w - 80, 70, "F");
  pdf.setTextColor(255); pdf.setFont("helvetica", "bold"); pdf.setFontSize(24);
  pdf.text("Certificate of Completion", w / 2, 85, { align: "center" });

  pdf.setTextColor(30);
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(14);
  pdf.text("This certificate is proudly presented to", w / 2, 170, { align: "center" });

  pdf.setFont("helvetica", "bold"); pdf.setFontSize(38);
  pdf.setTextColor(79, 70, 229);
  pdf.text(name, w / 2, 220, { align: "center" });

  pdf.setTextColor(30); pdf.setFont("helvetica", "normal"); pdf.setFontSize(14);
  pdf.text("for successfully completing the module", w / 2, 260, { align: "center" });

  pdf.setFont("helvetica", "bold"); pdf.setFontSize(22);
  pdf.text(course, w / 2, 300, { align: "center" });

  pdf.setFont("helvetica", "normal"); pdf.setFontSize(12);
  pdf.text(`Certificate ID: ${certId}`, w / 2, 340, { align: "center" });
  pdf.text(`Issued: ${new Date().toLocaleDateString()}`, w / 2, 360, { align: "center" });

  // Signature areas
  pdf.setDrawColor(120); pdf.setLineWidth(0.5);
  pdf.line(120, h - 100, 260, h - 100);
  pdf.line(w - 260, h - 100, w - 120, h - 100);
  pdf.setFontSize(11);
  pdf.text("AI Career Guide", 190, h - 85, { align: "center" });
  pdf.text("Program Lead", w - 190, h - 85, { align: "center" });

  pdf.save(`certificate-${certId}.pdf`);
}
