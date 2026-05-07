const authTypes = {
  LOGIN: "login",
  REGISTER: "register",
};

const roles = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const localStorageKey = {
  CURRENTSTEP: "currentStep",
  USERSPHONE: "userPhone",
};

const authApi = {
  SIGNUP: "/api/auth/signup",
  SIGNIN: "/api/auth/signin",
  PASSWORD: "",
  OTP_SIGNUP: "/api/auth/sms/send/signup",
  OTP_SIGNIN: "/api/auth/sms/send/signin",
  VERIFY_SIGNUP: "/api/auth/sms/verify/signup",
  VERIFY_SIGNIN: "/api/auth/sms/verify/signin",
};

const categoriesApi = {
  CREATE: "/api/categories/create",
  GET: "/api/categories/get",
  origin: "/api/categories",
  UPDATE: "/api/categories/update",
};

export { authTypes, roles, localStorageKey, authApi, categoriesApi };
