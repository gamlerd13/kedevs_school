import { getDateHour } from "@/lib/main";
import { Alumno, gradeLabels, sectionLabels } from "@/models/alumno";
import { Payment, PaymentConcept } from "@/models/payment";
import { Grade, Section } from "@prisma/client";
import {
  Br,
  Cut,
  Line,
  Printer,
  Text,
  Row,
  render,
} from "react-thermal-printer";

export type PaymentIncludePaymentConcept = Required<
  Payment & { paymentConcept: PaymentConcept }
>;

const ThermalPrinterComponent = ({
  alumno,
  paymentsAlumno,
}: {
  alumno: Required<Alumno>;
  paymentsAlumno: PaymentIncludePaymentConcept[];
}) => {
  return (
    <Printer type="epson" width={42} characterSet="pc437_usa">
      <Text>
        <Text>
          <Text bold={true}>{alumno.fullName}</Text>
          <Line />
          <Text>COLEGIO NEWTON PARAISO</Text>
          <Text>ASOC. EL PARAISO DE JICAMARCA JR.</Text>
          <Text>LOS PINOS MZ I LT 14 - LIMA</Text>
          <Text>RUC 20610621351</Text>
          <Text>juliaurs-22@hotmail.com</Text>
          <Line />
          <Text bold>REPORTE DE PAGOS</Text>
          <Line />
          <Text bold>INFORMACION DEL ESTUDIANTE</Text>
          <Text>GRADO: {gradeLabels[alumno.grade as Grade]}</Text>
          <Text>SECCIÓN: {sectionLabels[alumno.section as Section]}</Text>
          <Text>PADRE DE FAMILIA: </Text>
          <Text>DNI: {alumno.dni}</Text>
          <Line />
        </Text>

        <Line />

        <Row left={"CONCEPTO/PAGO"} center={"FECHA"} right={"MONTO S/."} />
        <Line />
        {paymentsAlumno.map((payment, index) => (
          <Row
            key={index}
            left={payment.paymentConcept.name}
            center={getDateHour(payment.datePayment).fechaDMY}
            right={`S/. ${parseFloat(payment.total).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          />
        ))}

        <Line />
      </Text>
    </Printer>
  );
};

export default ThermalPrinterComponent;

export const ThermalPrinterComponentExample = ({
  alumno,
}: {
  alumno: string;
}) => {
  return (
    <Printer type="epson" width={42} characterSet="pc437_usa">
      <Text>
        <Text>
          <Text bold={true}>{alumno}</Text>
          <Line />
          <Text>COLEGIO NEWTON PARAISO</Text>
          <Text>ASOC. EL PARAISO DE JICAMARCA JR.</Text>
          <Text>LOS PINOS MZ I LT 14 - LIMA</Text>
          <Text>RUC 20610621351</Text>
          <Text>juliaurs-22@hotmail.com</Text>
          <Line />
          <Text bold>REPORTE DE PAGOS</Text>
          <Line />
          <Text bold>INFORMACION DEL ESTUDIANTE</Text>
          <Text>GRADO: Primero</Text>
          <Text>SECCIÓN: Segundo grado</Text>
          <Text>PADRE DE FAMILIA: </Text>
          <Text>DNI:75003875</Text>
          <Line />
        </Text>

        <Line />

        <Row left={"CONCEPTO/PAGO"} center={"FECHA"} right={"MONTO S/."} />
        <Line />
        <Row left="Mes de julio" center={"21-10-12"} right="S/. 150.00" />

        <Line />
      </Text>
    </Printer>
  );
};
