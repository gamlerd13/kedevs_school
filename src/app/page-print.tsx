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
    format: [80, 240],
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
        <div
          style={{
            alignItems: "center",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          <p>GRUPO NEWTON PARAISO S.A.C</p>
          <p>ISSAC NEWTON</p>
          <p>ISSAC NEWTON</p>
          <p>RUC 20610621351</p>
          <p>
            ASC. EL PARAISO DE JICAMARCA JR. LOS PINOS MZ 1 LT 14. LIMA,
            LIMA-LIMA
          </p>
          <p>Email. juliaurs-22@hotmail.com</p>

          <h1>BOLETA DE VENTA ELECTRONICA</h1>
          <h1>BA01-00004063</h1>
        </div>
        <div>
          <p>F. Emisión:</p>
          <p>H. Emisión:</p>
          <p>Cliente: </p>
          <p>DNI:</p>
          <p>Grado:</p>
        </div>

        <div>
          <table
          // style={{
          //   // border: "1px 1px 1px solid",
          //   borderBottom: "1px  solid",
          // }}
          >
            <thead
              style={{
                borderBottom: "1px  solid",
              }}
            >
              <tr
                style={{
                  paddingBottom: 8,
                }}
              >
                <th>Cant.</th>
                <th>Descripción</th>
                <th>P.Unit</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody
              style={{
                borderBottom: "1px  solid",
              }}
            >
              <tr>
                <td>1</td>
                <td>PENSION PRIMARIA - D</td>
                <td>170.00</td>
                <td
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  170.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

const style = {
  contenedor: {
    padding: "10px",
    fontSize: "12px",
    width: "70mm",
  },
};

export default PrintButton;
