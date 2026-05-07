import { Step } from "../../../libs/interface/steps";
import { localStorageKey } from "../../../configs/constants";

export const getLocalStep = (): Step => {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    const localStep = localStorage.getItem(localStorageKey.CURRENTSTEP) ?? "";
    return localStep === "GetNumber" ||
      localStep === "GetOtpCode" ||
      localStep === "GetPassword"
      ? (localStep as Step)
      : "GetNumber";
  }
  return "GetNumber";
};

const getLocalPhone = () => {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    return localStorage.getItem(localStorageKey.USERSPHONE) ?? "";
  }

  return "";
};
