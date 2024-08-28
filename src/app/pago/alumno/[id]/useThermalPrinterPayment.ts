import { Payment, PaymentConcept } from "@/models/payment";
import { toast } from "sonner";
import ThermalPrinterComponent, {
  ThermalPrinterComponentExample,
} from "@/components/pdfTemplates/reportAlumnoPaymentsThermalPrinter";
import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
} from "react-thermal-printer";
import { saveAs } from "file-saver";
import { Alumno } from "@/models/alumno";

export type PaymentIncludePaymentConcept = Required<
  Payment & { paymentConcept: PaymentConcept }
>;

interface PaymentConceptHook {
  getData: (idAlumno: number) => void;
  addData: (formData: Payment) => void;

  payments: PaymentIncludePaymentConcept[];
  //   addData: (formData: FormDataPaymentConcept) => void;
  //   updateData: (formData: PaymentConcept) => void;
}

export const useThermalPrinterPayment = () => {
  const handlePrintUsb = async (
    alumno: Required<Alumno>,
    paymentsAlumno: PaymentIncludePaymentConcept[],
  ) => {
    try {
      if (!(navigator as any).usb) {
        return toast.error(
          "USB no soportado en este navegador, intente en Chrome",
        );
      }

      const device = await (navigator as any).usb.requestDevice({
        // filters: [{ vendorId: 0x04b8 }],
        filters: [],
      }); // Epson's vendor ID
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(0);

      // Send data to the printer
      const encoder = new TextEncoder();
      // const data = encoder.encode("Hello, Epson!");
      const data: Uint8Array = await render(
        ThermalPrinterComponent({ alumno, paymentsAlumno }),
      );
      await device.transferOut(1, data);

      toast.success("Imprimir boleta de pago");
    } catch (error) {
      toast.error("Hubo un error al imprimir boleta pago");
    }
  };

  // const handlePrint = async () => {
  //   const data: Uint8Array = await render(
  //     ThermalPrinterComponentExample({ alumno: "Eder Miraval Garcia" }),
  //   );

  //   // Simula la impresión guardando la salida en un archivo
  //   const blob = new Blob([data], { type: "application/octet-stream" });
  //   saveAs(blob, "receipt.bin");

  //   console.log("Simulación de impresión: datos guardados en 'receipt.bin'");
  // };

  // const handlePrint2 = async () => {
  //   const data: Uint8Array = await render(
  //     ThermalPrinterComponent({ alumno: "Eder Miraval Garcia" }),
  //   );
  //   const port = await window.navigator.serial.requestPort();
  //   console.log(port);
  //   await port.open({ baudRate: 9600 });
  //   const writer = port.writable?.getWriter();
  //   // if (writer != null) {
  //   //   await writer.write(data);
  //   //   writer.releaseLock();
  //   // }
  //   if (writer != null) {
  //     console.log("Writing data to the port...");
  //     await writer.write(data);
  //     writer.releaseLock();
  //     console.log("Data written successfully!");
  //   } else {
  //     console.error("Writer is not available.");
  //   }

  //   // try {
  //   //   const port = await window.navigator.serial.requestPort();
  //   //   await port.open({ baudRate: 9600 });
  //   //   const writer = port.writable?.getWriter();
  //   //   if (writer) {
  //   //     const simpleText = new TextEncoder().encode("Prueba de impresión\n");
  //   //     await writer.write(simpleText);
  //   //     writer.releaseLock();
  //   //     console.log("Print command sent.");
  //   //   } else {
  //   //     console.error("No writer available.");
  //   //   }
  //   //   await port.close();
  //   // } catch (error) {
  //   //   console.error("Error al imprimir:", error);
  //   // }
  // };

  // const handlePrint3 = async () => {
  //   const data: Uint8Array = await render(
  //     ThermalPrinterComponent({ alumno: "Eder Miraval Garcia" }),
  //   );

  //   const textOutput = new TextDecoder().decode(data);
  //   console.log("Simulación de impresión: datos a imprimir");
  //   console.log(textOutput);
  // };

  return { handlePrintUsb };
};
