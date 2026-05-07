import axios from "axios";

export async function findOtpFunc(phone: string) {
  try {
    const res = await axios.post("/api/auth/sms/findotp", { phone });

    //console.log(res);
    if (res.status === 200) {
      const code = res.data.code;
      return code;
    } else if (res.status === 404) {
      console.log("not found");
    }
  } catch (error) {
    console.log("error =>", error);
  }
}
