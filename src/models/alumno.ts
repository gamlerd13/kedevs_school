import { Grade, Section } from "@prisma/client";

export interface Alumno {
  id?: number;
  dni: string;
  fullName: string;
  grade: string;
  section: string;
}

export type FormData = Omit<Alumno, "id">;

export type AlumnoList = Omit<Alumno, "grade" | "section"> & {
  grade: Grade;
  section: Section;
};

const eder: AlumnoList = {
  dni: "dsafasdf",
  fullName: "sadf",
  grade: Grade.GARDEN_3,
  section: Section.A,
};

export const gradeLabels: { [key in Grade]: string } = {
  [Grade.GARDEN_3]: "Jardín 3 años",
  [Grade.GARDEN_4]: "Jardín 4 años",
  [Grade.GARDEN_5]: "Jardín 5 años",
  [Grade.GRADE_PRIMARY_1]: "Primaria 1",
  [Grade.GRADE_PRIMARY_2]: "Primaria 2",
  [Grade.GRADE_PRIMARY_3]: "Primaria 3",
  [Grade.GRADE_PRIMARY_4]: "Primaria 4",
  [Grade.GRADE_PRIMARY_5]: "Primaria 5",
  [Grade.GRADE_PRIMARY_6]: "Primaria 6",
  [Grade.GRADE_SECONDARY_1]: "Secundaria 1",
  [Grade.GRADE_SECONDARY_2]: "Secundaria 2",
  [Grade.GRADE_SECONDARY_3]: "Secundaria 3",
  [Grade.GRADE_SECONDARY_4]: "Secundaria 4",
  [Grade.GRADE_SECONDARY_5]: "Secundaria 5",
  [Grade.GRADE_PRE_1]: "Pre 1",
  [Grade.GRADE_PRE_2]: "Pre 2",
  [Grade.GRADE_PRE_3]: "Pre 3",
  [Grade.GRADE_PRE_4]: "Pre 4",
};

export const sectionLabels: { [key in Section]: string } = {
  [Section.A]: "Sección A",
  [Section.B]: "Sección B",
  [Section.C]: "Sección C",
  [Section.D]: "Sección D",
  [Section.E]: "Sección E",
};

export type FormErrors = Partial<Alumno>;
