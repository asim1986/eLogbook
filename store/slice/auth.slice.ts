import { IAuthOrganSlice, IAuthStudSlice, IAuthSupSlice } from "../../interfaces/slice.interface";
import { createSlice } from "@reduxjs/toolkit";

type authType = {
  id: string;
  role: string;
  name: string;
  isAuth: boolean;
  userStudData: IAuthStudSlice;
  userOrgData: IAuthOrganSlice;
  userSupData: IAuthSupSlice;
  userCoordData: IAuthSupSlice;
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
  eligible: false,
  supervisor: {
    id: null,
    title: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    avatar: null,
  },
  coordinator: {
    id: null,
    title: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    avatar: null,
  },
  organisation: {
    id: null,
    name: null,
    sector: null,
    email: null,    
    logo: null,
    address: null
  }
};

const AuthSupInit: IAuthSupSlice = {
  id: null,
  title: null,
  firstName: null,
  lastName: null,
  staffID: null,
  phone: null,
  institute: null,
  department: null,
  gender: null,
  email: null,
  avatar: null,
  user: null,
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
  id: null,
  role: null,
  name: null,
  userStudData: AuthStudInit,
  userOrgData: AuthOrgInit,
  userSupData: AuthSupInit,
  userCoordData: AuthSupInit,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.id =
        payload?.loginOrganisation?.organisation?.id ||
        payload?.loginStudent?.student.id ||
        payload?.loginCoordinator?.coordinator?.id ||
        payload?.loginSupervisor?.supervisor?.id;
      state.role =
        payload?.loginOrganisation?.organisation?.user ||
        payload?.loginStudent?.student.user ||
        payload?.loginCoordinator?.coordinator?.user ||
        payload?.loginSupervisor?.supervisor?.user;
      state.name =
        payload?.loginOrganisation?.organisation?.name.split(" ")[0] ||
        payload?.loginStudent?.student.lastName ||
        payload?.loginCoordinator?.coordinator?.lastName ||
        payload?.loginSupervisor?.supervisor?.lastName;
      state.token = payload?.accessToken;
      state.refreshToken = payload?.refreshToken;
    },
    setStudAuth: (state, { payload }) => {
      state.isAuth = true;
      state.userStudData = payload?.student;
      state.token = payload?.accessToken;
      state.refreshToken = payload?.refreshToken;
    },
    setSupAuth: (state, { payload }) => {
      state.isAuth = true;
      state.userSupData = payload?.supervisor;
      state.token = payload?.accessToken;
      state.refreshToken = payload?.refreshToken;
    },
    setCoordAuth: (state, { payload }) => {
      state.isAuth = true;
      state.userCoordData = payload?.coordinator;
      state.token = payload?.accessToken;
      state.refreshToken = payload?.refreshToken;
    },
    setOrgAuth: (state, { payload }) => {
      state.isAuth = true;
      state.userOrgData = payload?.organisation;
      state.token = payload?.accessToken;
      state.refreshToken = payload?.refreshToken;
    },
    setRest: (state) => {
      state.isAuth = false;
      state.id = null;
      state.role = null;
      state.name = null;
      state.userStudData = AuthStudInit;
      state.userOrgData = AuthOrgInit;
      state.userCoordData = AuthSupInit;
      state.userSupData = AuthSupInit;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const {
  setStudAuth,
  setOrgAuth,
  setRest,
  setUser,
  setCoordAuth,
  setSupAuth,
} = authSlice.actions;

export default authSlice.reducer;
