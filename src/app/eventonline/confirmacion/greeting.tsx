"use client";

import { useSyncExternalStore } from "react";
import { FIRST_NAME_KEY } from "@/components/eventonline/content";

// sessionStorage as a read-only external store (it doesn't change while this page is open).
const subscribe = () => () => {};
const getSnapshot = () => {
  try {
    return sessionStorage.getItem(FIRST_NAME_KEY)?.trim().slice(0, 40) ?? "";
  } catch {
    return "";
  }
};
const getServerSnapshot = () => "";

/** Personalizes the heading with the first name saved by the form (never passed in the URL). */
export function Greeting() {
  const name = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{name ? `${name}, tu lugar está` : "Tu lugar está"}</>;
}
