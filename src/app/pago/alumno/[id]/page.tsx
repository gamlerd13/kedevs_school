"use client";
import TitlePage from "@/components/TitlePage";
import { Alumno } from "@/models/alumno";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../loading";

import { gradeLabels, sectionLabels } from "@/models/alumno";
import SubTitlePage from "@/components/SubTitlePage";
import { usePaymentConcept } from "../../concepto/hooks/usePayment";
const Page = () => {
  const pathname = usePathname();
  const { id }: { id: string } = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const { conceptPayments } = usePaymentConcept();

  useEffect(() => {
    if (id) {
      const fetchAlumno = async () => {
        const res = await axios.get(`/api/alumno/${id}`);
        if (res.status === 201) {
          setAlumno(res.data);
        }
      };
      fetchAlumno();
    }
  }, [id]);

  if (!id) return;
  if (!alumno) return <Loading />;
  console.log(alumno);

  return (
    <div className="w-full">
      <div className="sm:w-10/12 w-11/12  mx-auto flex flex-col">
        <TitlePage title="Datos Alumno" />

        <div className="grid sm:grid-cols-3  grid-cols-1 gap-2 ">
          <Input label="Nombres" value={alumno.fullName} />
          <Input label="DNI" value={alumno.dni} />
          <Input
            label="Grado y Sección"
            value={`${gradeLabels[alumno.grade]} - ${sectionLabels[alumno.section]}`}
          />
        </div>
        <SubTitlePage subTitle="Pagos Realizados" />

        <div></div>
      </div>
    </div>
  );
};
export default Page;
