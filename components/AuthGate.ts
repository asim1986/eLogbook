import { NextRouter, useRouter } from "next/router";
import Login from "../pages/login";
import store from "../store/store";

export const AuthStudGate = ({ children }: { children: JSX.Element }) => {
  const role = store.getState().auth.userData.user;
  const isAuth = store.getState().auth.isAuth;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  if (!isAuth && role !== "Student" && role !== "Admin") {
    return router.push("/");
  }

  return children;
};

export const AuthCordGate = ({ children }: { children: JSX.Element }) => {
  const isAuth = store.getState().auth.isAuth;
  const role = store.getState().auth.userData.user;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  if (!isAuth || (role !== "Coordination" && role !== "Admin")) {
    return router.push("/login");
  }

  return { children };
};

export const AuthSupGate = ({ children }: { children: JSX.Element }) => {
  const isAuth = store.getState().auth.isAuth;
  const role = store.getState().auth.userData.user;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  if (!isAuth || (role !== "Supervisor" && role !== "Admin")) {
    return router.push("/login");
  }

  return { children };
};

export const AuthOrganGate = ({ children }: { children: JSX.Element }) => {
  const isAuth = store.getState().auth.isAuth;
  const role = store.getState().auth.userData.user;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  if (!isAuth || (role !== "Organisation" && role !== "Admin")) {
    return router.push("/login");
  }

  return { children };
};
