import {
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import { getDateHour } from "@/lib/main";
import { Alumno, gradeLabels, sectionLabels } from "@/models/alumno";
import { Payment, PaymentConcept } from "@/models/payment";
import { Grade, Section } from "@prisma/client";

export type PaymentIncludePaymentConcept = Required<
  Payment & { paymentConcept: PaymentConcept }
>;
interface paymentsAlumno {
  payment: Required<PaymentConcept>;
  payed: boolean;
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingLeft: 70,
  },
  headerCompanyAlumno: {
    color: "#767f7e",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  headerCompany: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
  },
  headerAlumno: {
    display: "flex",
    justifyContent: "flex-end",
    width: "50%",
    flexDirection: "column",
  },
  alumnoInfoHeader: {
    backgroundColor: "#578278",
    fontWeight: 700,
    color: "#fff",
    border: "2 solid #a2abb2",
    padding: 5,
    marginBottom: 5,
  },
  staticInformation: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: 11,
  },
  startLogo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 8,
    paddingBottom: 10,
  },
  totalPrice: {
    flexDirection: "row",
    paddingRight: 15,
    marginBottom: 5,
    justifyContent: "flex-end",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  cellTotalPrice: {
    paddingLeft: 15,
  },
  all: {
    fontSize: 10,
  },

  //table here -----------------------------------------------------
  table: {
    paddingBottom: 5,
  },
  tableHeader: {
    backgroundColor: "#578278",
    color: "#fff",
    padding: 5,
    fontSize: 10,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  itemDescription: {
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  cellFlex: {
    textAlign: "center",
  },
});

const ReactPdfComponent = ({
  alumno,
  paymentsAlumno,
  paymentsRelationAlumno,
}: {
  alumno: Required<Alumno>;
  paymentsAlumno: PaymentIncludePaymentConcept[];
  paymentsRelationAlumno: paymentsAlumno[];
}) => {
  return (
    <Document style={styles.all}>
      <Page style={styles.page}>
        <View style={styles.headerCompanyAlumno}>
          <View style={styles.headerCompany}>
            <View style={styles.startLogo}>
              <Image
                src="/logo-colegio.jpeg"
                style={{ width: 96, height: 96 }}
              />
            </View>

            <Text
              style={{ fontSize: 18, fontWeight: 600, marginBottom: "50px" }}
            >
              {alumno.fullName}
            </Text>

            <View style={styles.staticInformation}>
              <Text>COLEGIO NEWTON PARAISO</Text>
              <Text>ASOC. EL PARAISO DE JICAMARCA JR.</Text>
              <Text>LOS PINOS MZ I LT 14 - LIMA</Text>
              <Text>RUC 20610621351</Text>
              <Text>juliaurs-22@hotmail.com</Text>
            </View>
          </View>
          <View style={styles.headerAlumno}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#a2abb2",
                marginBottom: "50px",
              }}
            >
              REPORTE DE PAGOS
            </Text>
            <View>
              <View>
                <Text style={styles.alumnoInfoHeader}>
                  INFORMACION DEL ESTUDIANTE
                </Text>
              </View>
              <View style={styles.staticInformation}>
                <Text>GRADO: {gradeLabels[alumno.grade as Grade]}</Text>
                <Text>SECCIÓN: {sectionLabels[alumno.section as Section]}</Text>
                <Text>DNI: {alumno.dni} </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            marginVertical: 10,
            fontWeight: 400,
            lineHeight: 1.5,
            fontSize: 11,
            color: "#767f7e",
          }}
        >
          <Text>PAGOS REALIZADOS</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
              N°
            </Text>
            <Text style={[styles.tableCell, { flex: 5 }]}>
              CONCEPTO DE PAGO
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>MET./PAGO</Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
              NRO. OPERACIÓN
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
              FECHA
            </Text>
            <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
              MONTO S/.
            </Text>
          </View>
          {paymentsAlumno.map((payment, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                {index + 1}
              </Text>
              <View
                style={[styles.tableCell, { flexDirection: "column", flex: 5 }]}
              >
                <Text>{payment.paymentConcept.name}</Text>
              </View>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}>
                {payment.paymentMethod}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
                {payment.codePayment}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
                {getDateHour(payment.datePayment).fechaDMY}
              </Text>
              <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
                S/.{" "}
                {parseFloat(payment.total).toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          ))}
        </View>

        {paymentsRelationAlumno.length !== paymentsAlumno.length && (
          <>
            <View
              style={{
                width: "100%",
                marginVertical: 10,
                fontWeight: 400,
                lineHeight: 1.5,
                fontSize: 11,
                color: "#767f7e",
              }}
            >
              <Text>PAGOS PENDIENTES</Text>
            </View>

            {/* Table no pagado */}
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}>
                  N°
                </Text>
                <Text style={[styles.tableCell, { flex: 5 }]}>
                  CONCEPTO DE PAGO
                </Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>MET./PAGO</Text>
                <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
                  NRO. OPERACIÓN
                </Text>
                <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
                  FECHA
                </Text>
                <Text style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}>
                  MONTO S/.
                </Text>
              </View>
              {paymentsRelationAlumno
                .filter((payment) => !payment.payed) // Filtramos solo los elementos con payment.payed === true
                .map((payment, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text
                      style={[styles.tableCell, styles.cellFlex, { flex: 1 }]}
                    >
                      {index + 1}
                    </Text>
                    <View
                      style={[
                        styles.tableCell,
                        { flexDirection: "column", flex: 5 },
                      ]}
                    >
                      <Text>{payment.payment.name}</Text>
                    </View>
                    <Text
                      style={[styles.tableCell, styles.cellFlex, { flex: 2 }]}
                    >
                      ---
                    </Text>
                    <Text
                      style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}
                    >
                      ---
                    </Text>
                    <Text
                      style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}
                    >
                      ---
                    </Text>
                    <Text
                      style={[styles.tableCell, styles.cellFlex, { flex: 3 }]}
                    >
                      {/* {payment.payment.total} */}
                      ---
                    </Text>
                  </View>
                ))}
            </View>
          </>
        )}

        {/* <View style={styles.totalPrice}>
          <Text style={styles.cellTotalPrice}>TOTAL</Text>
          <Text style={styles.cellTotalPrice}> S/. {totalPrice}</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default ReactPdfComponent;
