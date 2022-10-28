import { IAuthSlice } from "../../interfaces/slice.interface";
import { createSlice } from "@reduxjs/toolkit";

type authType = {
  isAuth: boolean;
  userData: IAuthSlice;
  token: string;
  refreshToken: string;
};

const AuthInit: IAuthSlice = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  matricNo: null,
  phone: null,
  level: null,
  user: null,
  avatar: null,
  address: null,
  institute: null,
  department: null,
  gender: null,
  place: null,
  eligible: null,
};

const initialState: authType = {
  isAuth: false,
  userData: AuthInit,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.isAuth = true;
      state.userData = payload.student;
      state.token = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
