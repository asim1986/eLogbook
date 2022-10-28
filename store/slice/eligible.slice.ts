import { IEligibleSlice } from "../../interfaces/slice.interface";
import { createSlice } from "@reduxjs/toolkit";

type EligibleType = {
  isEligible: boolean;
  userData: IEligibleSlice;
};

const initialState: EligibleType = {
  isEligible: false,
  userData: {
    id: null,
    institute: null,
    department: null,
    level: null,
    matricNo: null,
    __typename: null
  },
};

const eligibleSlice = createSlice({
  name: "eligible",
  initialState,
  reducers: {
    setEligible: (state, { payload }) => {
      state.isEligible = true;
      state.userData = payload;
    },
  },
});

export const { setEligible } = eligibleSlice.actions;

export default eligibleSlice.reducer;
