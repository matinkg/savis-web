import { localStorageKey } from "../../../configs/constants";

export const getLocalPhone = () => {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    return localStorage.getItem(localStorageKey.USERSPHONE) ?? "";
  }

  return "";
};
