"use client";
import TitlePage from "@/components/TitlePage";
import { Alumno } from "@/models/alumno";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { usePathname, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Loading from "../../loading";
import { FaCheck } from "react-icons/fa";
import { gradeLabels, sectionLabels } from "@/models/alumno";
import SubTitlePage from "@/components/SubTitlePage";
import { usePaymentConcept } from "../../concepto/hooks/usePaymentConcept";
import { useAlumnoPayment } from "./useAlumnoPayments";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { AlumnoPayment, Payment, PaymentConcept } from "@/models/payment";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { createContext } from "react";
import ModalFormPaymentAlumno from "./ModalFormPaymentAlumno";
import { Grade, Section } from "@prisma/client";
interface paymentsAlumno {
  payment: Required<PaymentConcept>;
  payed: boolean;
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
  alumno: Alumno | null;
}

export const FormCreateEditContext = createContext<CreateEditPayment>({
  addPaymentAlumno: () => {},
  getAlumnoPayments: () => {},
  alumno: null,
});

export const ConceptPaymentSelectedContext =
  createContext<Required<PaymentConcept> | null>(null);

const Page = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    payments: paymentsAlumno,
    getData: getAlumnoPayments,
    addData: addPaymentAlumno,
  } = useAlumnoPayment();
  const { id }: { id: string } = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const { conceptPayments } = usePaymentConcept();
  const [conceptPaymentSelected, setConceptPaymentSelected] =
    useState<Required<PaymentConcept> | null>(null);
  const [paymentsRelationAlumno, setPaymentsRelationAlumno] = useState<
    paymentsAlumno[] | null
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
      getAlumnoPayments(parseInt(id));
    }
  }, [id]);

  // filtrar pagos
  useEffect(() => {
    if (conceptPayments && paymentsAlumno) {
      const paymentsAlumnoMap: paymentsAlumno[] = conceptPayments.map(
        (payment) => {
          if (
            paymentsAlumno.find(
              (concepto) => concepto.paymentConceptId === payment.id,
            )
          ) {
            return {
              payment: payment,
              payed: true,
            };
          } else {
            return {
              payment: payment,
              payed: false,
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
                <TitlePage title="Datos Alumno" />

                <div className="grid sm:grid-cols-3  grid-cols-1 gap-2 ">
                  <Input label="Nombres" value={alumno.fullName} />
                  <Input label="DNI" value={alumno.dni} />
                  <Input
                    label="Grado y Sección"
                    value={`${gradeLabels[alumno.grade as Grade]} - ${sectionLabels[alumno.section as Section]}`}
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
  paymentRelationAlumno: paymentsAlumno;
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
        <span> S/. {paymentRelationAlumno.payment.total}</span>
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

export default Page;
