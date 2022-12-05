import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eligibleReducer from "./slice/eligible.slice";
import logbookReducer from "./slice/logbook.slice";
import { createWrapper } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/auth.slice";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  auth: authReducer,
  eligible: eligibleReducer,
  logbook: logbookReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const wrapper = createWrapper(() => store);

export default store;
