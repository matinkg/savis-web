import { redirect } from "next/navigation";
import { roles } from "../../../configs/constants";

const redirectUser = (role: string) => {
  switch (role) {
    case roles.ADMIN:
      redirect("/admin-panel");
      break;
    case roles.USER:
      redirect("/user-panel");
      break;
    default:
      redirect("/login"); // یا هر مسیر دیگری برای کاربران ناشناس
  }
};

export default redirectUser;
