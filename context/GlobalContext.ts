import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index: any) => {},
  daySelected: null,
  setDaySelected: (day: any) => {},
  showEventModal: false,
  setShowEventModal: (arg: boolean) => {},
  dispatchCalEvent: ({ type, payload }: any) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: (arg: any) => {},
  setLabels: (args: any) => {},
  labels: [],
  updateLabel: (arg: any) => {},
  filteredEvents: [],
  showSideBar: false,
  setShowSideBar: (arg: boolean) => {}
});

export default GlobalContext;
