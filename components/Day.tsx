import React, { useContext, useState, useEffect } from "react";
import { EventType } from "../interfaces/comp.interface";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const Day = ({ day, rowIdx }: any) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents?.filter(
      (evt: any) =>
        dayjs(evt?.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  const onEventHandler = (evt: EventType, idx: number) => {
    setSelectedEvent(evt);
  };

  return (
    <div className="border border-gray-500 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer mx-auto w-11/12"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents?.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => onEventHandler(evt, idx)}
            className={`bg-${evt.label}-500 p-1 mr-3 text-gray-100 text-center font-bold text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
