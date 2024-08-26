// "use client";
// // import ThermalPrinterComponent from "@/components/pdfTemplates/reportAlumnoPaymentsThermalPrinter";
// import { saveAs } from "file-saver";

// import ReactDOMServer from "react-dom/server";
// // import fs from "fs";
// import pdf from "html-pdf";

// import {
//   Br,
//   Cut,
//   Line,
//   Printer,
//   Text,
//   Row,
//   render,
// } from "react-thermal-printer";

// export default function Home() {
//   const handlePrint = async () => {
//     const data: Uint8Array = await render(
//       ThermalPrinterComponent({ alumno: "Eder Miraval Garcia" }),
//     );

//     // Simula la impresión guardando la salida en un archivo
//     const blob = new Blob([data], { type: "application/octet-stream" });
//     saveAs(blob, "receipt.bin");

//     console.log("Simulación de impresión: datos guardados en 'receipt.bin'");
//   };

//   const handlePrint2 = async () => {
//     const data: Uint8Array = await render(
//       ThermalPrinterComponent({ alumno: "Eder Miraval Garcia" }),
//     );
//     const port = await window.navigator.serial.requestPort();
//     console.log(port);
//     await port.open({ baudRate: 9600 });
//     const writer = port.writable?.getWriter();
//     // if (writer != null) {
//     //   await writer.write(data);
//     //   writer.releaseLock();
//     // }
//     if (writer != null) {
//       console.log("Writing data to the port...");
//       await writer.write(data);
//       writer.releaseLock();
//       console.log("Data written successfully!");
//     } else {
//       console.error("Writer is not available.");
//     }

//     // try {
//     //   const port = await window.navigator.serial.requestPort();
//     //   await port.open({ baudRate: 9600 });
//     //   const writer = port.writable?.getWriter();
//     //   if (writer) {
//     //     const simpleText = new TextEncoder().encode("Prueba de impresión\n");
//     //     await writer.write(simpleText);
//     //     writer.releaseLock();
//     //     console.log("Print command sent.");
//     //   } else {
//     //     console.error("No writer available.");
//     //   }
//     //   await port.close();
//     // } catch (error) {
//     //   console.error("Error al imprimir:", error);
//     // }
//   };

//   const handlePrint3 = async () => {
//     const data: Uint8Array = await render(
//       ThermalPrinterComponent({ alumno: "Eder Miraval Garcia" }),
//     );

//     const textOutput = new TextDecoder().decode(data);
//     console.log("Simulación de impresión: datos a imprimir");
//     console.log(textOutput);
//   };

//   return (
//     <>
//       <main className="flex min-h-screen flex-col items-center justify-around p-4">
//         <button className="bg-rose-500" type="button" onClick={handlePrint2}>
//           Imprimir boleta
//         </button>
//       </main>
//     </>
//   );
// }

// const ThermalPrinterComponent = ({ alumno }: { alumno: string }) => {
//   return (
//     <Printer type="epson" width={42} characterSet="pc437_usa">
//       <Text>
//         <Text>
//           <Text bold={true}>{alumno}</Text>
//           <Line />
//           <Text>COLEGIO NEWTON PARAISO</Text>
//           <Text>ASOC. EL PARAISO DE JICAMARCA JR.</Text>
//           <Text>LOS PINOS MZ I LT 14 - LIMA</Text>
//           <Text>RUC 20610621351</Text>
//           <Text>juliaurs-22@hotmail.com</Text>
//           <Line />
//           <Text bold>REPORTE DE PAGOS</Text>
//           <Line />
//           <Text bold>INFORMACION DEL ESTUDIANTE</Text>
//           <Text>GRADO: Primero</Text>
//           <Text>SECCIÓN: Segundo grado</Text>
//           <Text>PADRE DE FAMILIA: </Text>
//           <Text>DNI:75003875</Text>
//           <Line />
//         </Text>

//         <Line />

//         <Row left={"CONCEPTO/PAGO"} center={"FECHA"} right={"MONTO S/."} />
//         <Line />
//         <Row left="Mes de julio" center={"21-10-12"} right="S/. 150.00" />

//         <Line />
//       </Text>
//     </Printer>
//   );
// };
import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
