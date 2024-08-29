"use client";
import { useContext, useEffect, useState, createContext } from "react";
import { usePathname, useParams } from "next/navigation";
import axios from "axios";

import TitlePage from "@/components/TitlePage";
import { Alumno } from "@/models/alumno";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import Loading from "../../loading";
import { FaCheck } from "react-icons/fa";
import SubTitlePage from "@/components/SubTitlePage";
import ModalFormPaymentAlumno from "./ModalFormPaymentAlumno";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReactPdfComponent from "@/components/pdfTemplates/reportAlumnoPaymentsv2";

import { usePaymentConcept } from "../../concepto/hooks/usePaymentConcept";
import { useAlumnoPayment } from "./useAlumnoPayments";

import { AlumnoPayment, Payment, PaymentConcept } from "@/models/payment";
import { Grade, Section } from "@prisma/client";
import { gradeLabels, sectionLabels } from "@/models/alumno";
import ButtonBackArrow from "@/components/ButtonBackArrow";
import { useThermalPrinterPayment } from "./useThermalPrinterPayment";
import ThermalPrinterComponent from "@/components/pdfTemplates/reportAlumnoPaymentsThermalPrinterReactPdf";

interface PaymentsAlumno {
  payment: Required<PaymentConcept>;
  payed: boolean;
  total: string;
}

//context modal
interface ModalCreatePaymentContext {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}

const initialModalContext: ModalCreatePaymentContext = {
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
  onClose: () => {},
};
export const ModalCreatePaymentContext =
  createContext<ModalCreatePaymentContext>(initialModalContext);

// context formulario
interface CreateEditPayment {
  addPaymentAlumno(formData: Payment): void;
  getAlumnoPayments(idAlumno: number): void;
  alumno: Required<Alumno> | null;
}

export const FormCreateEditContext = createContext<CreateEditPayment>({
  addPaymentAlumno: () => {},
  getAlumnoPayments: () => {},
  alumno: null,
});

export const ConceptPaymentSelectedContext =
  createContext<Required<PaymentConcept> | null>(null);

const AlumnoPage = () => {
  const { handlePrintUsb } = useThermalPrinterPayment();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    payments: paymentsAlumno,
    getData: getAlumnoPayments,
    addData: addPaymentAlumno,
  } = useAlumnoPayment();
  const { id }: { id: string } = useParams();
  const [alumno, setAlumno] = useState<Required<Alumno> | null>(null);
  const { conceptPayments } = usePaymentConcept();
  const [conceptPaymentSelected, setConceptPaymentSelected] =
    useState<Required<PaymentConcept> | null>(null);
  const [paymentsRelationAlumno, setPaymentsRelationAlumno] = useState<
    PaymentsAlumno[] | null
  >(null);

  useEffect(() => {
    if (id) {
      const fetchAlumno = async () => {
        const res = await axios.get(`/api/alumno/${id}`);
        if (res.status === 200) {
          setAlumno(res.data);
        }
      };
      fetchAlumno();
    }
  }, [id]);

  // filtrar pagos
  useEffect(() => {
    if (conceptPayments && paymentsAlumno) {
      const paymentsAlumnoMap: PaymentsAlumno[] = conceptPayments.map(
        (payment) => {
          const findPayment = paymentsAlumno.find(
            (concepto) => concepto.paymentConceptId === payment.id,
          );
          if (findPayment) {
            return {
              payment: payment,
              payed: true,
              total: findPayment.total,
            };
          } else {
            return {
              payment: payment,
              payed: false,
              total: "00.00",
            };
          }
        },
      );

      setPaymentsRelationAlumno(paymentsAlumnoMap);
    }
  }, [conceptPayments, paymentsAlumno]);

  const handleThermalPrinter = () => {
    if (alumno) handlePrintUsb(alumno, paymentsAlumno);
  };
  if (!id) return;
  if (!alumno) return <Loading />;

  return (
    <>
      <ModalCreatePaymentContext.Provider
        value={{ isOpen, onOpen, onOpenChange, onClose }}
      >
        <FormCreateEditContext.Provider
          value={{ addPaymentAlumno, getAlumnoPayments, alumno }}
        >
          <ConceptPaymentSelectedContext.Provider
            value={conceptPaymentSelected}
          >
            <ModalFormPaymentAlumno />
            <div className="w-full">
              <div className="sm:w-10/12 w-11/12  mx-auto flex flex-col">
                <div>
                  <ButtonBackArrow />
                </div>
                <div className="flex flex-wrap items-center grid-cols-3 justify-between">
                  <TitlePage title="Datos Alumno" />
                  {alumno && paymentsRelationAlumno && (
                    <div className="col-span-2 flex flex-wrap gap-2">
                      <PDFDownloadLink
                        document={
                          <ThermalPrinterComponent
                            alumno={alumno}
                            paymentsAlumno={paymentsAlumno}
                          />
                        }
                        fileName={`reporte-${alumno.dni}.pdf`}
                      >
                        <Button className="bg-red-900 text-white" href="">
                          Imprimir Pagos
                          <BsFillFileEarmarkPdfFill />
                        </Button>
                      </PDFDownloadLink>

                      <PDFDownloadLink
                        document={
                          <ReactPdfComponent
                            alumno={alumno}
                            paymentsAlumno={paymentsAlumno}
                            paymentsRelationAlumno={paymentsRelationAlumno}
                          />
                        }
                        fileName={`reporte-${alumno.dni}.pdf`}
                      >
                        <Button href="" className="bg-red-900 text-white">
                          Generar reporte de Pagos
                          <BsFillFileEarmarkPdfFill />
                        </Button>
                      </PDFDownloadLink>
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-4  grid-cols-1 gap-2 ">
                  <Input label="Nombres" value={alumno.fullName} />
                  <Input label="DNI" value={alumno.dni} />
                  <Input
                    label="Grado"
                    value={gradeLabels[alumno.grade as Grade]}
                  />
                  <Input
                    label="Sección"
                    value={sectionLabels[alumno.section as Section]}
                  />
                </div>
                <SubTitlePage subTitle="Pagos" />

                <div>
                  <div
                    className="grid gap-4 auto-rows-auto"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
                    }}
                  >
                    {paymentsRelationAlumno &&
                      paymentsRelationAlumno.map(
                        (paymentRelationAlumno, index) => (
                          <ListPaymentConcept
                            key={paymentRelationAlumno.payment.id}
                            paymentRelationAlumno={paymentRelationAlumno}
                            setConceptPaymentSelected={
                              setConceptPaymentSelected
                            }
                          />
                        ),
                      )}
                  </div>
                </div>
              </div>
            </div>
          </ConceptPaymentSelectedContext.Provider>
        </FormCreateEditContext.Provider>
      </ModalCreatePaymentContext.Provider>
    </>
  );
};

const ListPaymentConcept = ({
  paymentRelationAlumno,
  setConceptPaymentSelected,
}: {
  paymentRelationAlumno: PaymentsAlumno;
  setConceptPaymentSelected: (PaymentConcept: Required<PaymentConcept>) => void;
}) => {
  const { onOpen } = useContext(ModalCreatePaymentContext);
  return (
    <Card className="">
      <CardHeader>
        <h1 className="font-medium text-default-600">
          {paymentRelationAlumno.payment.name}
        </h1>
      </CardHeader>
      <CardBody>
        <span> S/. {paymentRelationAlumno.total}</span>
      </CardBody>
      <CardFooter
        className={
          "flex justify-between " +
          `${paymentRelationAlumno.payed ? "bg-green-500" : ""}`
        }
      >
        {paymentRelationAlumno.payed ? (
          <div className="w-full flex justify-between items-center text-white">
            <div className="bg-green-500">Pagado</div>
            <FaCheck className="text-xl" />
          </div>
        ) : (
          <div className="w-full flex justify-between items-center text-white">
            <Button
              onClick={() => {
                setConceptPaymentSelected(paymentRelationAlumno.payment);
                onOpen();
              }}
              className=" hover:bg-blue-600 hover:text-white"
            >
              Pagar
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AlumnoPage;
