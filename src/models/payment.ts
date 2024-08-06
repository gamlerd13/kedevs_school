import { Alumno } from "./alumno";
import { PaymentMethod } from "@prisma/client";
export interface Payment {
  id?: number;
  alumnoId: number;
  paymentConceptId: number;
  paymentMethod: string;
  comment?: string;
  datePayment?: string; //check if that work with string or datetime
  total: string;
}

export interface PaymentPost {
  alumnoId: number;
  paymentConceptId: number;
  paymentMethod: PaymentMethod;
  datePayment?: string;
  comment?: string;
  total: string;
}
export interface PaymentConcept {
  id?: number;
  name: string;
  total: string;
}

export type AlumnoPayment = Required<Alumno> & {
  payments: (Payment & {
    paymentConcept: PaymentConcept;
  })[];
};

export const paymentMethods = [
  "YAPE",
  "PLIN",
  "BCP",
  "BBVA",
  "SCOTIABANK",
  "INTERBANK",
  "CASH",
  "OTHER",
];

const ejemploAlumnoPayment: AlumnoPayment = {
  id: 1,
  dni: "12345678A",
  fullName: "Juan Pérez",
  grade: "GARDEN_3",
  section: "A",
  payments: [
    {
      id: 2,
      alumnoId: 1,
      paymentConceptId: 2,
      paymentMethod: "PLIN",
      datePayment: "2000-02-01T12:12:12.000Z",
      total: "120",
      paymentConcept: {
        id: 2,
        name: "Copias",
        total: "100",
      },
    },
  ],
};

export type FormDataPaymentConcept = Omit<PaymentConcept, "id">;
export type FormErrorsPaymentConcept = {
  nameError: string;
  totalError: string;
};
