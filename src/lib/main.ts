interface GetDateHour {
  hora: string;
  fechaYMD: string;
  fechaDMY: string;
}

export function getDateHour(dateString: string): GetDateHour {
  const dateObject = new Date(dateString);

  if (!isNaN(dateObject.getTime())) {
    const fechaYMD = dateObject.toISOString().split("T")[0]; // YYYY-MM-DD
    const hora = dateObject.toTimeString().split(" ")[0]; // HH:MM:SS
    const [year, month, day] = fechaYMD.split("-");
    const fechaDMY = `${day}-${month}-${year}`;
    return {
      hora: hora,
      fechaYMD: fechaYMD,
      fechaDMY: fechaDMY,
    };
  }
  return {
    hora: "00:00:00",
    fechaYMD: "0000-00-00",
    fechaDMY: "00-00-0000",
  };
}

//class
class getTime {
  private dateString: string;

  constructor(dateString: string) {
    this.dateString = dateString;
  }

  dateObject() {
    return new Date(this.dateString);
  }

  isValid() {
    return !isNaN(this.dateObject().getTime());
  }

  defaulReturn() {
    return {
      hora: "00:00:00",
      fechaYMD: "0000-00-00",
      fechaDMY: "00-00-0000",
    };
  }
  getFechaYMD() {
    if (this.isValid()) return this.dateObject().toISOString().split("T")[0];
    return this.defaulReturn().fechaYMD;
  }
  getFechaDMY() {
    if (this.isValid()) {
      const formattedDate = this.dateObject().toISOString().split("T")[0];
      const [year, month, day] = formattedDate.split("-");
      return `${day}-${month}-${year}`;
    }
    return this.defaulReturn().fechaDMY;
  }

  getHour() {
    if (this.isValid()) return this.dateObject().toTimeString().split(" ")[0];
    return this.defaulReturn().hora;
  }
}
