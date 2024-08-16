import ReactPDF from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { Document, Page, Text } from "@react-pdf/renderer";

const Eder = () => (
  <Document>
    <Page>
      <Text fixed>~ Created with react-pdf ~</Text>
    </Page>
  </Document>
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentsAlumno, alumno } = body;

    if (paymentsAlumno && alumno) {
      // Genera el PDF como un stream
      const pdfStream = await ReactPDF.renderToStream(<Eder />);

      // Configura las cabeceras de la respuesta para enviar el PDF
      const response = new NextResponse(pdfStream, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="report.pdf"`,
        },
      });

      return response;
    }

    return NextResponse.json({ message: "Missing data" }, { status: 400 });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Error generating PDF" },
      { status: 500 },
    );
  }
}
