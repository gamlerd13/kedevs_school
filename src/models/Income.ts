// export type IncomeFrequency = "day" | "month" | "year";

import { Alumno, Payment } from "@prisma/client";

export enum IncomeFrequency {
  Day = "day",
  Month = "month",
  Year = "year",
}

export type IncomeGet = Payment & {
  alumno: Alumno;
};
export interface Day {
  year: string;
  month: string;
  day: string;
}

export interface RangeDate {
  initialDate: Day;
  finalDate: Day;
}
