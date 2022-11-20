import { IEligibleSlice } from "../../interfaces/slice.interface";
import { createSlice } from "@reduxjs/toolkit";

type EligibleType = {
  isEligible: boolean;
  userStudData: IEligibleSlice;
};

const initialState: EligibleType = {
  isEligible: false,
  userStudData: {
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
      state.userStudData = payload;
    },
  },
});

export const { setEligible } = eligibleSlice.actions;

export default eligibleSlice.reducer;
