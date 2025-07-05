"use client";
import { Provider } from "react-redux";
import { store, persistor } from "../app/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
