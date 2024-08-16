export function getDateHour(dateString: string): string[] {
  const dateObject = new Date(dateString);

  if (isNaN(dateObject.getTime())) {
    console.error("Fecha inválida:", dateString);
  } else {
    const fecha = dateObject.toISOString().split("T")[0]; // YYYY-MM-DD
    const hora = dateObject.toTimeString().split(" ")[0]; // HH:MM:SS
    return [fecha, hora];
  }
  return ["---", "---"];
}
