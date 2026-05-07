import prisma from "@/configs/db";
import { cookies } from "next/headers";
import { roles } from "../../../configs/constants";
const authAdmin = async () => {
  const token = cookies().get("token");
  let user = null;

  if (token) {
    // const tokenPayload = verifyAccessToken(token.value);
  //   if (tokenPayload) {
  //     user = await prisma?.user.findUnique({
  //       where: { phone: tokenPayload.phone },
  //     });
  //     if (user?.role === roles.ADMIN) {
  //       return user;
  //     } else {
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // } else {
  //   return null;
  }
};

export default authAdmin;
