import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getDateHour } from "@/lib/main";
import { Alumno, gradeLabels, sectionLabels } from "@/models/alumno";
import {
  Payment,
  PaymentConcept,
  PaymentIncludePaymentConcept,
} from "@/models/payment";
import { Grade, Section } from "@prisma/client";

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    color: "black",
    fontFamily: "Helvetica",
  },
  boldText: {
    fontWeight: 800,
    textAlign: "center",
  },
  line: {
    marginVertical: 5,
    borderBottom: "1px solid black",
  },
  column: {
    flex: 1,
    textAlign: "center",
    padding: 2,
    fontSize: 9,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    borderBottom: "1px solid black",
    marginBottom: 5,
    fontSize: 9,
  },
  headerText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
  },
  items: {
    fontSize: 9,
  },
});

const BoletaThermalPrinterComponent = ({
  alumno,
  payment,
}: {
  alumno: Required<Alumno>;
  payment: PaymentIncludePaymentConcept | null;
}) => {
  const date = new Date();
  const hour = getDateHour(date.toString()).hora;
  const fecha = getDateHour(date.toString()).fechaDMY;

  return (
    <Document>
      <Page size={[226.77, 500]} style={styles.page}>
        <View>
          <View
            style={[
              {
                paddingBottom: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Image
              style={[{ textAlign: "center", width: 60, height: 60 }]}
              src="/logo-colegio.jpeg"
            />
          </View>

          <View style={styles.line} />
          <Text style={styles.headerText}>GRUPO NEWTON PARAISO</Text>
          <Text style={styles.headerText}>ISAAC NEWTON</Text>
          <Text style={styles.headerText}>RUC 20610621351</Text>
          <Text style={styles.headerText}>ASOC. EL PARAISO DE JICAMARCA</Text>
          <Text style={styles.headerText}>LOS PINOS MZ I LT 14 - LIMA</Text>
          <Text style={styles.headerText}>Email: juliaurs-22@hotmail.com</Text>
          <View style={styles.line} />
          <Text style={[styles.boldText, { paddingBottom: 5 }]}>
            RECIBO INTERNO
          </Text>
          <Text style={[styles.boldText, { paddingBottom: 5 }]}>
            {payment?.correlativeCode}
          </Text>
          <Text>F. EMISIÓN: {fecha}</Text>
          <Text>H. EMISIÓN: {hour}</Text>
          <View style={styles.line} />
          <Text style={[styles.boldText, { paddingBottom: 5 }]}>
            INFORMACIÓN DEL ESTUDIANTE
          </Text>
          <Text>NOMBRE: {alumno.fullName}</Text>
          <Text>GRADO: {gradeLabels[alumno.grade as Grade]}</Text>
          <Text>SECCIÓN: {sectionLabels[alumno.section as Section]}</Text>
          <Text>DNI: {alumno.dni}</Text>
          <View style={styles.line} />
        </View>

        <View>
          {/* Header Row */}
          <View style={styles.row}>
            <Text style={[styles.column, styles.boldText]}>CONCEPTO/PAGO</Text>
            <Text style={[styles.column, styles.boldText]}>FECHA</Text>
            <Text style={[styles.column, styles.boldText]}>MONTO S/.</Text>
          </View>

          {/* Data Rows */}
          {payment && (
            <View style={styles.row}>
              <Text style={styles.column}>{payment.paymentConcept.name}</Text>
              <Text style={styles.column}>
                {getDateHour(payment.datePayment).fechaDMY}
              </Text>
              <Text style={styles.column}>
                S/.{" "}
                {parseFloat(payment.total).toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          )}
        </View>

        {/* Total */}
        <View>
          <Text style={[styles.items, { textAlign: "right" }]}>
            Total: S/. {payment?.total}
          </Text>
        </View>

        {/* comentarios */}
        <View style={{ paddingTop: 10 }}>
          <Text>COMENTARIO: </Text>
          <Text style={[styles.items]}>{payment?.comment}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default BoletaThermalPrinterComponent;
