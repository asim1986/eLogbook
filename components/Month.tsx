import React, { useEffect, useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../utils/util";
import Day from "./Day";

export default function Month() {
  const { monthIndex } = useContext(GlobalContext);
  const [currenMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));  
  }, [monthIndex]);

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {currenMonth.map((row: any, i: number) => (
        <React.Fragment key={i}>
          {row.map((day: any, idx: number) => (
            <Day day={day} key={idx} id={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
