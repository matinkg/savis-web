const swal = require("sweetalert");

type IconType = "success" | "error" | "warning" | "info";
type ButtonType = boolean | string | (string | boolean)[];

const showSwal = (
  title: string,
  icon: IconType = "info",
  buttons: ButtonType = "باشه"
) => {
  swal({ title, icon, buttons });
};

export { showSwal };
