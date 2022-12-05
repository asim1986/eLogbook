import { IEligibleSlice } from "../../interfaces/slice.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IEligibleSlice = {
  isEligible: false,
  id: null,
  level: null,
  matricNo: null,
  institute: null,
  department: null,
  __typename: null,
};

const eligibleSlice = createSlice({
  name: "eligible",
  initialState,
  reducers: {
    setEligible: (state, { payload }) => {
      state.isEligible = true;
      state.id = payload?.id;
      state.level = payload?.level;
      state.matricNo = payload?.matricNo;
      state.department = payload?.department;
      state.institute = payload?.institute;    
    },
    setEligReset: (state) => {
      state.isEligible = false;
      state.id = null;
      state.level = null;
      state.matricNo = null;
      state.department = null;
      state.institute = null;
    }
  },
});

export const { setEligible, setEligReset } = eligibleSlice.actions;

export default eligibleSlice.reducer;
