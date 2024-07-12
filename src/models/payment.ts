import { Decimal } from "@prisma/client/runtime/library";

export interface PaymentConcept {
  id?: number;
  name: string;
  total: number;
}

export type FormDataPaymentConcept = Omit<PaymentConcept, "id">;

export type FormErrorsPaymentConcept = {
  nameError: string;
  totalError: string;
};
