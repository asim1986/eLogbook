import { ILogbookSlice } from "../../interfaces/logbook.interface";
import { createSlice } from "@reduxjs/toolkit";

type LogbookArray = {
  logbooks: Array<ILogbookSlice>;
};

const initialState: LogbookArray = { logbooks: [] };

const logbookSlice = createSlice({
  name: "logbook",
  initialState,
  reducers: {
    setBulkLog: (state, { payload }) => {
      state.logbooks = [...state.logbooks, ...payload];
    },
    setLog: (state, { payload }) => {
      state.logbooks = [...state.logbooks, payload?.logbook];
    },
    setUpdLog: (state, { payload }) => {
      state.logbooks = state.logbooks.map((evt) =>
        evt.actId === payload?.actId ? payload : evt
      );
    },
    setDelLog: (state, { payload }) => {
      state.logbooks = state.logbooks.filter(
        (i) => i.id !== payload?.logbook.actId
      );
    },
    setLogReset: (state) => {
      state.logbooks = [];
    },
  },
});

export const { setLog, setUpdLog, setDelLog, setLogReset, setBulkLog } = logbookSlice.actions;

export default logbookSlice.reducer;
