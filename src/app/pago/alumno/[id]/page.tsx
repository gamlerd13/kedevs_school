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

import {
  AlumnoPayment,
  Payment,
  PaymentConcept,
  PaymentIncludePaymentConcept,
} from "@/models/payment";
import { Grade, Section } from "@prisma/client";
import { gradeLabels, sectionLabels } from "@/models/alumno";
import ButtonBackArrow from "@/components/ButtonBackArrow";
import { useThermalPrinterPayment } from "./useThermalPrinterPayment";
import ThermalPrinterComponent from "@/components/pdfTemplates/reportAlumnoPaymentsThermalPrinterReactPdf";
import { MdEdit } from "react-icons/md";
import BoletaThermalPrinterComponent from "@/components/pdfTemplates/BoletaAlumnoPaymentsThermalPrinterReactPdf";
import { RiDeleteBinLine } from "react-icons/ri";

interface PaymentsAlumno {
  paymentConcept: Required<PaymentConcept>;
  payed: boolean;
  total: string;
  payment: PaymentIncludePaymentConcept | null;
}

//context modal
interface ModalCreateUpdatePaymentContext {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}

const initialModalContext: ModalCreateUpdatePaymentContext = {
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
  onClose: () => {},
};
export const ModalCreateUpdatePaymentContext =
  createContext<ModalCreateUpdatePaymentContext>(initialModalContext);

// context formulario
interface CreateEditPayment {
  addPaymentAlumno(formData: Payment): void;
  getAlumnoPayments(idAlumno: number): void;
  updatePaymentAlumno(formDataUpdate: Required<Payment>): void;
  deleteDataPaymentAlumno(idPayment: number | null): void;
  alumno: Required<Alumno> | null;
}

export const FormCreateEditContext = createContext<CreateEditPayment>({
  addPaymentAlumno: () => {},
  updatePaymentAlumno: () => {},
  getAlumnoPayments: () => {},
  deleteDataPaymentAlumno: () => {},
  alumno: null,
});

// data in create payment, conceptPayment needed
export const ConceptPaymentSelectedContext =
  createContext<Required<PaymentConcept> | null>(null);

// data in update payment, PaymentIncludePaymentConcept needed
export const paymentSelectedContext =
  createContext<PaymentIncludePaymentConcept | null>(null);

const AlumnoPage = () => {
  const { id }: { id: string } = useParams();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    payments: paymentsAlumno,
    getData: getAlumnoPayments,
    addData: addPaymentAlumno,
    updateData: updatePaymentAlumno,
    deleteData: deleteDataPaymentAlumno,
  } = useAlumnoPayment();
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [alumno, setAlumno] = useState<Required<Alumno> | null>(null);
  const { conceptPayments } = usePaymentConcept();

  //To create
  const [conceptPaymentSelected, setConceptPaymentSelected] =
    useState<Required<PaymentConcept> | null>(null);
  //To edit
  const [paymentSelectedEdit, setPaymentSelectedEdit] =
    useState<PaymentIncludePaymentConcept | null>(null);

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
        (paymentConcept) => {
          const findPayment = paymentsAlumno.find(
            (concepto) => concepto.paymentConceptId === paymentConcept.id,
          );
          if (findPayment) {
            return {
              paymentConcept: paymentConcept,
              payed: true,
              total: findPayment.total,
              payment: findPayment,
            };
          } else {
            return {
              paymentConcept: paymentConcept,
              payed: false,
              total: "00.00",
              payment: null,
            };
          }
        },
      );

      setPaymentsRelationAlumno(paymentsAlumnoMap);
    }
  }, [conceptPayments, paymentsAlumno]);

  if (!id) return;
  if (!alumno) return <Loading />;

  return (
    <>
      <ModalCreateUpdatePaymentContext.Provider
        value={{ isOpen, onOpen, onOpenChange, onClose }}
      >
        <FormCreateEditContext.Provider
          value={{
            addPaymentAlumno,
            updatePaymentAlumno,
            getAlumnoPayments,
            deleteDataPaymentAlumno,
            alumno,
          }}
        >
          <ConceptPaymentSelectedContext.Provider
            value={conceptPaymentSelected}
          >
            <paymentSelectedContext.Provider value={paymentSelectedEdit}>
              <ModalFormPaymentAlumno isEdit={isEdit} />
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
                          fileName={`boleta-${alumno.fullName.split(" ").join("_")}.pdf`} // "nombre nombre eder luis"
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
                          fileName={`reporte-${alumno.fullName.split(" ").join("_")}.pdf`}
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
                              key={paymentRelationAlumno.paymentConcept.id}
                              alumno={alumno}
                              paymentRelationAlumno={paymentRelationAlumno}
                              setConceptPaymentSelected={
                                setConceptPaymentSelected
                              }
                              setIsEdit={setIsEdit}
                              setPaymentSelectedEdit={setPaymentSelectedEdit}
                            />
                          ),
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </paymentSelectedContext.Provider>
          </ConceptPaymentSelectedContext.Provider>
        </FormCreateEditContext.Provider>
      </ModalCreateUpdatePaymentContext.Provider>
    </>
  );
};

const ListPaymentConcept = ({
  paymentRelationAlumno,
  alumno,
  setConceptPaymentSelected,
  setIsEdit,
  setPaymentSelectedEdit,
}: {
  paymentRelationAlumno: PaymentsAlumno;
  alumno: Required<Alumno>;
  setConceptPaymentSelected: (PaymentConcept: Required<PaymentConcept>) => void;
  setIsEdit: (isEdit: Boolean) => void; //Dispatch<SetStateAction<Boolean>>
  setPaymentSelectedEdit: (
    paymentSelectedEdit: PaymentIncludePaymentConcept | null,
  ) => void;
}) => {
  const { onOpen } = useContext(ModalCreateUpdatePaymentContext);
  const { deleteDataPaymentAlumno } = useContext(FormCreateEditContext);
  return (
    <Card className="">
      <CardHeader>
        <h1 className="font-medium text-default-600">
          {paymentRelationAlumno.paymentConcept.name}
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
        {paymentRelationAlumno.payed &&
        paymentRelationAlumno.payment &&
        paymentRelationAlumno.payment.id ? (
          <div className="w-full items-center text-white">
            <div className="bg-green-500 text-sm">Pagado</div>
            <div className="flex justify-between ">
              <div
                onClick={() => {
                  setIsEdit(true);
                  setPaymentSelectedEdit(paymentRelationAlumno.payment);
                  setConceptPaymentSelected(
                    paymentRelationAlumno.paymentConcept,
                  );

                  onOpen();
                }}
                className="cursor-pointer rounded-full hover:bg-slate-500 p-2"
              >
                <MdEdit className="text-xl" />
              </div>
              <div className="flex">
                <PDFDownloadLink
                  document={
                    <BoletaThermalPrinterComponent
                      alumno={alumno}
                      payment={paymentRelationAlumno.payment}
                    />
                  }
                  fileName={`boleta-${alumno.dni}.pdf`}
                >
                  <div className="cursor-pointer rounded-full hover:bg-slate-500 p-2">
                    <BsFillFileEarmarkPdfFill className="text-xl" />
                  </div>
                </PDFDownloadLink>

                <button
                  onClick={() =>
                    deleteDataPaymentAlumno(
                      paymentRelationAlumno.payment?.id || null,
                    )
                  }
                  className="rounded-full p-2 hover:bg-rose-500"
                >
                  <RiDeleteBinLine className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-between items-center text-white">
            <Button
              onClick={() => {
                setIsEdit(false);
                setConceptPaymentSelected(paymentRelationAlumno.paymentConcept);
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
