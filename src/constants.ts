export const MAX_FRACTION_DIGITS = 8;

export const OPERATORS = ["+", "-", "*", "/"];

export const CALC_CLEAR_ACTION = "Clear";
export const CALC_COUNT_ACTION = "Calc";

export const CALC_ACTIONS = [
  {
    title: CALC_CLEAR_ACTION,
  },
  {
    title: CALC_COUNT_ACTION,
    type: "primary",
  },
];

const getValue = (
  isFloor: boolean,
  isSlice: boolean,
  value: number,
  maxFractionDigits: number
) => {
  if (isFloor) {
    return Math.floor(value);
  } else if (isSlice) {
    const updatedValue = value.toString();

    if (updatedValue.indexOf(".") !== -1) {
      return Number(
        updatedValue.slice(0, updatedValue.indexOf(".") + maxFractionDigits + 1)
      );
    }
    return value;
  }
  return value;
};

export const isNumber = (str: string) => {
  if (str.trim() === "") {
    return false;
  }
  return !isNaN(+str);
};

export const formatNumber = (
  value: number,
  isFloor: boolean = true,
  maxFractionDigits = 8,
  isSlice: boolean = false
) => {
  const updatedValue = getValue(isFloor, isSlice, value, maxFractionDigits);
  return updatedValue.toLocaleString("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  });
};

export const addDays = (days: number) => {
  const today = new Date();
  var date = new Date(today.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const formatDate = (date: Date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Octr",
    "Nov",
    "Dec",
  ];
  var monthIndex = date.getMonth();
  var monthName = monthNames[monthIndex];

  // Get the day and year
  var day: any = date.getDate();
  var year = date.getFullYear();

  // Pad the day with leading zeros if necessary
  day = day < 10 ? "0" + day : day;

  // Formatted date string
  return monthName + " " + day + ", " + year;
};
