import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { I18nProvider } from "@react-aria/i18n";
import { Button, DatePicker, DateValue, Divider } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { IncomeFrequency } from "@/models/Income";
import axios from "axios";
import { toast } from "sonner";
import { exportToExcel } from "@/lib/exportToExcel";
import { MonthsArray } from "@/constants/dateValues";
import { CalendarDateTime, CalendarDate } from "@internationalized/date";

import { Day, RangeDate } from "@/models/Income";

interface MonthYear {
  month: string;
  year: string;
}

interface Year {
  year: string;
}

function ModalReportPaymentStyleSheet({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const [incomePeriod, setIncomePeriod] = useState<IncomeFrequency>(
    IncomeFrequency.Day,
  );

  const today = new Date();
  const todayDate = {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };

  let listYear = [{ year: todayDate.year }];
  for (let i = 1; i < 6; i++) {
    listYear.push({
      year: todayDate.year - i,
    });
  }

  const [daySelected, setDaySelected] = useState<Day>({
    year: todayDate.year.toString(),
    month: todayDate.month.toString(),
    day: todayDate.day.toString(),
  });
  const [monthYearSelected, setMonthYearSelected] = useState<MonthYear>({
    month: MonthsArray[new Date().getMonth()].id.toString(),
    year: todayDate.year.toString(),
  });

  const [yearSelected, setYearSelected] = useState<Year>({
    year: todayDate.year.toString(),
  });

  const handleSubmitReport = async () => {
    try {
      let rangeDate: null | RangeDate = null;
      if (incomePeriod === IncomeFrequency.Day) {
        rangeDate = { initialDate: daySelected, finalDate: daySelected };
        console.log(rangeDate);
      } else if (incomePeriod === IncomeFrequency.Month) {
        // day 0 es el ultimo dia del mes

        rangeDate = {
          initialDate: { ...monthYearSelected, day: "1" },
          finalDate: {
            ...monthYearSelected,
            month: monthYearSelected.month,
            day: new Date(
              parseInt(monthYearSelected.year),
              parseInt(monthYearSelected.month) + 1,
              0,
            )
              .getDate()
              .toString(),
          },
        };
        console.log(rangeDate);
      } else if (incomePeriod === IncomeFrequency.Year) {
        rangeDate = {
          initialDate: { ...yearSelected, month: "1", day: "1" },
          finalDate: {
            ...yearSelected,
            month: "12",
            day: new Date(parseInt(yearSelected.year), 12 + 1, 0)
              .getDate()
              .toString(),
          },
        };
        console.log(rangeDate);
      } else {
        return toast.error("Debe seleccionar día, mes o año");
      }

      if (
        !rangeDate ||
        rangeDate.initialDate.day == "" ||
        rangeDate.initialDate.month == "" ||
        rangeDate.initialDate.year == "" ||
        rangeDate.finalDate.day == "" ||
        rangeDate.finalDate.month == "" ||
        rangeDate.finalDate.year == ""
      ) {
        return toast.warning("Error");
      }

      const { data, status } = await axios.post(
        "/api/ingresos/reports",
        // JSON.stringify(incomePeriod),
        rangeDate,
      );

      if (status === 200) {
        const date = new Date();
        let nameReport = "";
        if (incomePeriod === IncomeFrequency.Day) {
          nameReport = date.toISOString().split("T")[0];
        } else if (incomePeriod === IncomeFrequency.Month) {
          const month = date.getMonth();
          nameReport = MonthsArray[month].nameMonth;
        }

        const filename = `reporte-${nameReport}.xlsx`;

        if (data.length > 0) {
          exportToExcel(data, filename);

          toast.success("Reporte listo");
        } else {
          toast.warning("No existe ningun registro");
        }
      }
    } catch (error) {
      toast.error("Hubo un error, intente más tarde");
    } finally {
      setIncomePeriod(IncomeFrequency.Day);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="w-full">
                <h1>Reporte de Ingresos en Excel</h1>
                <Divider />
              </div>
            </ModalHeader>
            <ModalBody>
              <div>
                <Select
                  label="Seleccione"
                  className="w-full"
                  onChange={(e) =>
                    setIncomePeriod(e.target.value as IncomeFrequency)
                  }
                  defaultSelectedKeys={[IncomeFrequency.Day]}
                >
                  <SelectItem
                    key={IncomeFrequency.Day}
                    value={IncomeFrequency.Day}
                  >
                    DÍA
                  </SelectItem>
                  <SelectItem
                    key={IncomeFrequency.Month}
                    value={IncomeFrequency.Month}
                  >
                    MES
                  </SelectItem>
                  <SelectItem
                    key={IncomeFrequency.Year}
                    value={IncomeFrequency.Year}
                  >
                    AÑO
                  </SelectItem>
                </Select>
              </div>

              <div>
                {incomePeriod === IncomeFrequency.Day ? (
                  <I18nProvider locale="es-ES">
                    <DatePicker
                      label="Día"
                      className="w-full"
                      defaultValue={
                        new CalendarDate(
                          parseInt(daySelected.year),
                          parseInt(daySelected.month),
                          parseInt(daySelected.day),
                        )
                      }
                      onChange={(e) =>
                        setDaySelected({
                          year: e.year.toString(),
                          month: e.month.toString(),
                          day: e.day.toString(),
                        })
                      }
                    />
                  </I18nProvider>
                ) : incomePeriod === IncomeFrequency.Month ? (
                  <div className="flex gap-2">
                    <Select
                      label="Seleccione Mes"
                      className="w-full"
                      value={monthYearSelected.month}
                      defaultSelectedKeys={[monthYearSelected.month]}
                      onChange={(e) =>
                        setMonthYearSelected((prev) => ({
                          ...prev,
                          month: e.target.value,
                        }))
                      }
                    >
                      {MonthsArray.map((mes) => (
                        <SelectItem key={mes.id.toString()} value={mes.id}>
                          {mes.nameMonth}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label="Seleccione Año"
                      className="w-full"
                      value={monthYearSelected.year}
                      defaultSelectedKeys={[monthYearSelected.year]}
                      onChange={(e) =>
                        setMonthYearSelected((prev) => ({
                          ...prev,
                          year: e.target.value,
                        }))
                      }
                    >
                      {listYear &&
                        listYear.map((year) => (
                          <SelectItem
                            key={year.year.toString()}
                            value={year.year}
                          >
                            {year.year.toString()}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                ) : (
                  incomePeriod === IncomeFrequency.Year && (
                    <Select
                      label="Seleccione Año"
                      className="w-full"
                      value={yearSelected.year}
                      defaultSelectedKeys={[yearSelected.year]}
                      onChange={(e) =>
                        setYearSelected((prev) => ({
                          year: e.target.value,
                        }))
                      }
                    >
                      {listYear &&
                        listYear.map((year) => (
                          <SelectItem
                            key={year.year.toString()}
                            value={year.year}
                          >
                            {year.year.toString()}
                          </SelectItem>
                        ))}
                    </Select>
                  )
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={() => handleSubmitReport()}>
                Descargar Excel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalReportPaymentStyleSheet;
