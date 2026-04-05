"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use <AppStore | null>(null) instead of undefined
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  // Pass the current ref directly.
  // If TS still complains about the '!', wrap it in a simple check.
  return <Provider store={storeRef.current as AppStore}>{children}</Provider>;
}
