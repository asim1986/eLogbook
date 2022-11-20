import { useRouter } from "next/router";
import store from "../store/store";
import { useEffect } from "react";

export const AuthGate = ({ children }: { children: JSX.Element }) => {
  const isAuth = store.getState().auth.isAuth;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  useEffect(() => {
    async () => {
      if (!isAuth) {
        return router.push("/login");
      }
    };
  }, []);

  return children;
};

export const AuthStudGate = ({ children }: { children: JSX.Element }) => {
  const pattern = store.getState().auth;
  const role = pattern?.userStudData?.user;
  const isAuth = pattern?.isAuth;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  useEffect(() => {
    async () => {
      if (!isAuth && role !== "Student" && role !== "Admin") {
        return router.push("/login");
      }
    };
  }, []);

  return children;
};

export const AuthCoordGate = ({ children }: { children: JSX.Element }) => {
  const pattern = store.getState().auth;
  const role = pattern?.userCoordData?.user;
  const isAuth = pattern?.isAuth;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  useEffect(() => {
    async () => {
      if (!isAuth && role !== "Coordinator" && role !== "Admin") {
        return router.push("/login");
      }
    };
  }, []);

  return children;
};

export const AuthSupGate = ({ children }: { children: JSX.Element }) => {
  const pattern = store.getState().auth;
  const role = pattern?.userSupData?.user;
  const isAuth = pattern?.isAuth;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  useEffect(() => {
    async () => {
      if (!isAuth && role !== "Supervisor" && role !== "Admin") {
        return router.push("/login");
      }
    };
  }, []);

  return children;
};

export const AuthOrgGate = ({ children }: { children: JSX.Element }) => {
  const pattern = store.getState().auth;
  const role = pattern?.userOrgData?.user;
  const isAuth = pattern?.isAuth;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  useEffect(() => {
    async () => {
      if (!isAuth && role !== "Organisation" && role !== "Admin") {
        return router.push("/login");
      }
    };
  }, []);

  return children;
};

export const AuthNotStudentGate = ({ children }: { children: JSX.Element }) => {
  const pattern = store.getState().auth;
  const role = pattern?.role;
  const isAuth = pattern?.isAuth;
  console.log("ROLE ==> ", isAuth);
  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      if (!isAuth && role !== "Student") {
        return router.push("/login");
      }
    };
    auth();
  }, [isAuth, role]);

  return children;
};
