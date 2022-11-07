import {
  IAuthOrganSlice,
  IAuthStudSlice,
} from "../../interfaces/slice.interface";
import { createSlice } from "@reduxjs/toolkit";

type authType = {
  isAuth: boolean;
  userData: IAuthStudSlice;
  userOrgData: IAuthOrganSlice;
  token: string;
  refreshToken: string;
};

const AuthStudInit: IAuthStudSlice = {
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

const AuthOrgInit: IAuthOrganSlice = {
  id: null,
  name: null,
  sector: null,
  phone: null,
  address: null,
  employees: null,
  email: null,
  password: null,
  logo: null,
  user: null,
};

const initialState: authType = {
  isAuth: false,
  userData: AuthStudInit,
  userOrgData: AuthOrgInit,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStudAuth: (state, { payload }) => {
      state.isAuth = true;
      state.userData = payload.student;
      state.token = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    setOrgAuth: (state, { payload }) => {
      state.isAuth = true;
      state.userOrgData = payload.organisation;
      state.token = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    setRest: (state) => {
      state.isAuth = false;
      state.userData = AuthStudInit,
      state.userOrgData = AuthOrgInit,
      state.token = null;
      state.refreshToken = null;
    }
  },
});

export const { setStudAuth, setOrgAuth, setRest } = authSlice.actions;

export default authSlice.reducer;
