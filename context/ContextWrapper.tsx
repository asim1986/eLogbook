import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext, { event } from "./GlobalContext";
import dayjs from "dayjs";
import { useLazyQuery } from "@apollo/client";
import { GET_STUD_LOG } from "../graphql/query/student";
import { client } from "../graphql/apolloClient";
import { useAppDispatch, useAppSelector } from "../hooks/store.hook";
import { useRouter } from "next/router";
import { setRest } from "../store/slice/auth.slice";
import { StudLog } from "../interfaces/comp.interface";

const savedEventsReducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt: any) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt: any) => evt.id !== payload.id);
    case "reset":
      return [];
    default:
      throw new Error();
  }
};

const initEvents = () => {
  let storageEvents;
  if (typeof window !== "undefined") {
    storageEvents = localStorage.getItem("logBookData");
  }
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

const ContextWrapper = (props: any) => {
  const studentId = useAppSelector((state) => state.auth?.userStudData?.id);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [labels, setLabels] = useState([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // const [logBookData, dispatchCalEvent] = useReducer(
  //   savedEventsReducer,
  //   [],
  //   initEvents
  // );

  const logout = async () => {
    // Reset Apollo Cache
    client.resetStore();
    dispatch(setRest());
    router.push("/login");
  };

  const [getStudLog, { data }] = useLazyQuery(GET_STUD_LOG, {
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          const tokenErr = message.split(":")[0];
          if (tokenErr === "TokenExpiredError") {
            logout();
          }
        });
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  useEffect(() => {
    getStudLog({
      variables: {
        studentId,
      },
      onCompleted: (data) => {
        setLogBookData(data?.student.logbooks);
      },
    });
  }, []);

  const [logBookData, setLogBookData] = useState<StudLog[]>(data?.student.logbooks);

  useEffect(() => {
    localStorage.setItem("logBookData", JSON.stringify(logBookData));
  }, [logBookData]);

  const filteredEvents = useMemo(() => {
    return logBookData?.filter((evt: any) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [logBookData, labels]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(logBookData?.map((evt: any) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find((lbl) => lbl.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [logBookData]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  const updateLabel = (label: any) => {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  };

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        selectedEvent,
        setSelectedEvent,
        logBookData,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        showSideBar,
        setShowSideBar,
        showAddModal,
        setShowAddModal,
        showDetail,
        setShowDetail,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
