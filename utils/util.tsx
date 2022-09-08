import dayjs from "dayjs";

export const getMonth = (month = dayjs(new Date).month()) => {
  month = Math.floor(month);
  
  const year = dayjs().year();
 
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  //  console.log("MONTHS ===", daysMatrix);
  return daysMatrix;
}


export const customStyles = {
  option: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    backgroundColor: "#374151",
    cursor: "pointer",
    ":hover": { backgroundColor: "#1d4ed8" },
    ":active": {
      ...defaultStyles[":active"],
      backgroundColor: state.isSelected ? "red" : "blue",
    },
  }),
  clearIndicator: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    cursor: "pointer",
    ":hover": { color: "white" },
  }),
  dropdownIndicator: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    cursor: "pointer",
    ":hover": { color: "white" },
  }),
  input: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    color: "white",
    padding: "6px",
    ":focus": {
      border: "1px solid rgb(209 213 219)",
    },
  }),
  placeholder: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    color: "rgb(156 163 175)",
  }),
  menu: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    background: "rgb(107 114 128)",
  }),
  noOptionsMessage: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    background: "#374151",
    color: "white",
  }),
  singleValue: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    padding: "6px",
    color: "white",
    width: "100%",
  }),
};
