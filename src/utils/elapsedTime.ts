const elapsedTime = (date: Date): string => {
  const now = Date.now();
  const minutesElapsed = (now - date.getTime()) / (1000 * 60);

  if (minutesElapsed < 60) {
    return `Há ${Math.floor(minutesElapsed)} ${
      minutesElapsed > 1 ? "minutos" : "minuto"
    } atrás`;
  }

  if (minutesElapsed < 1440) {
    const hoursElapsed = Math.floor(minutesElapsed / 60);
    return `Há ${Math.floor(hoursElapsed)} ${
      hoursElapsed > 1 ? "horas" : "hora"
    } atrás`;
  }

  if (minutesElapsed < 43200) {
    const daysElapsed = Math.floor(minutesElapsed / (60 * 24));
    return `Há ${Math.floor(daysElapsed)} ${
      daysElapsed > 1 ? "dias" : "dia"
    } atrás`;
  }

  const monthsElapsed = Math.floor(minutesElapsed / (60 * 24 * 30));
  return `Há ${Math.floor(monthsElapsed)} ${
    monthsElapsed > 1 ? "meses" : "mês"
  } atrás`;
};

export default elapsedTime;
