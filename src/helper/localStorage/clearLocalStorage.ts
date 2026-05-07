import { localStorageKey } from "../../../configs/constants";

export function clearLocalStorageKey() {
  localStorage.removeItem(localStorageKey.CURRENTSTEP);
  localStorage.removeItem(localStorageKey.USERSPHONE);
}
