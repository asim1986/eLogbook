import store from "../store/store";

export const useAuthToken = () => {
  const authToken = store.getState().auth.token;
  return [authToken];
};
