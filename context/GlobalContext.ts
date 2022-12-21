import { EventType } from "../interfaces/comp.interface";
import React from "react";

export const event: EventType = {
  title: null,
  description: null,
  actId: null,
  label: null,
  day: null,
  id: null,
  diagram: false
}

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index: any) => {},
  daySelected: null,
  setDaySelected: (day: any) => {},
  showEventModal: false,
  setShowEventModal: (arg: boolean) => {},
  // dispatchCalEvent: ({ type, payload }: any) => {},
  logBookData: [],
  selectedEvent: event,
  setSelectedEvent: (arg: EventType) => {},
  setLabels: (args: any) => {},
  labels: [],
  updateLabel: (arg: any) => {},
  filteredEvents: [],
  showSideBar: false,
  setShowSideBar: (arg: boolean) => {},
  showAddModal: false,
  setShowAddModal: (arg: boolean) => {},
  showDetail: false,
  setShowDetail: (arg: boolean) => {},
});

export default GlobalContext;
