"use client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React from "react";

const generatePDF = async () => {
  const element = document.getElementById("content-to-print");
  if (!element) return;
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 120],
  });

  pdf.addImage(imgData, "PNG", 0, 0);
  pdf.save("boleta.pdf");
};

const PrintButton = () => {
  const pagador = "eder miraval el garcia";
  const cantidad = "10100";
  const total = "10200";
  const fecha = "2 de octubre";
  return (
    <>
      <div
        id="content-to-print"
        style={{ padding: "10px", fontSize: "12px", width: "70mm" }}
      >
        <h1>Boleta de Pago</h1>
        <p>{pagador}</p>
        <p>Concepto: Servicio de Desarrollo</p>
        <p>Monto: ${cantidad}</p>
        <p>Monto total: ${total}</p>
        <p>Fecha: {fecha}</p>
      </div>
      <button onClick={generatePDF}>Imprimir Boleta</button>
    </>
  );
};

export default PrintButton;
