import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Button, Divider } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { IncomeFrequency } from "@/models/Income";
import axios from "axios";
import { toast } from "sonner";
import { exportToExcel } from "@/lib/exportToExcel";
import { MonthsArray } from "@/constants/dateValues";

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

  const handleSubmitReport = async () => {
    try {
      const { data, status } = await axios.post(
        "/api/ingresos/reports",
        JSON.stringify(incomePeriod),
      );

      if (status === 200) {
        const date = new Date();
        let nameReport = "";
        if (incomePeriod === IncomeFrequency.Day) {
          nameReport = date.toISOString().split("T")[0];
        } else if (incomePeriod === IncomeFrequency.Month) {
          const month = date.getMonth();
          nameReport = MonthsArray[month + 1];
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
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={() => handleSubmitReport()}>
                Enviar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalReportPaymentStyleSheet;
