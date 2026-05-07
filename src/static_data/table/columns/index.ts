const blogColumns = [
  { Header: "عکس پُست", accessor: "image" },
  { Header: "نام پُست", accessor: "name" },
  { Header: "دسته بندی ", accessor: "category" },
  // { Header: " تگ ها ", accessor: "tags" },
  { Header: "عملیات", accessor: "action" },
];
const blogCategoryColumns = [
  { Header: " ", accessor: "" },
  { Header: " ", accessor: "" },
  { Header: "  ", accessor: "" },
  { Header: "عملیات", accessor: "action" },
];
const categoryColumns = [
  { Header: " بنر", accessor: "banner" },
  { Header: " عنوان بنر", accessor: "title" },
  { Header: " نام", accessor: "name" },
  { Header: " نامک", accessor: "slug" },
  { Header: "   دسته والد", accessor: "parent" },
  { Header: "    نمایش در منو", accessor: "menu" },
  { Header: "عملیات", accessor: "action" },
];
const jewelryTypesColumns = [
  { Header: " عکس", accessor: "image" },
  { Header: " svg", accessor: "svg" },
  { Header: " عنوان", accessor: "name" },
  { Header: " لینک", accessor: "slug" },
  { Header: "   دسته والد", accessor: "parent" },
  { Header: "عملیات", accessor: "action" },
];

const pagesListColumns = [
  { Header: "     جایگاه", accessor: "position" },
  // pages -> link & name
  { Header: "   نام ", accessor: " name" },
  { Header: "  نامک ", accessor: "slug" },
  { Header: "   دسته والد", accessor: "parent" },
  { Header: "عملیات", accessor: "action" },
];
const categoryListColumns = [
  { Header: "    نام جایگاه", accessor: "position" },
  // pages -> link & name
  { Header: "    برگه", accessor: "pages" },
  { Header: "  عنوان فهرست ", accessor: "list name" },
  { Header: " لینک دلخواه", accessor: "link" },
  { Header: " نام   دلخواه", accessor: "optional name" },

  { Header: "عملیات", accessor: "action" },
];
const optionalListColumns = [
  { Header: "    نام جایگاه", accessor: "position" },
  // pages -> link & name
  { Header: "    برگه", accessor: "pages" },
  { Header: "  عنوان فهرست ", accessor: "list name" },
  { Header: " لینک دلخواه", accessor: "link" },
  { Header: " نام   دلخواه", accessor: "optional name" },

  { Header: "عملیات", accessor: "action" },
];

const bannersColumns = [
  { Header: " عکس", accessor: "image" },
  { Header: " عنوان", accessor: "title" },
  { Header: " عنوان فرعی", accessor: "subTitle" },
  { Header: "    نام مکان", accessor: "page" },
  { Header: "عملیات", accessor: "action" },
];

const productColumns = [
  { Header: "عکس محصول", accessor: "image" },
  { Header: "نام محصول", accessor: "name" },
  { Header: "کد محصول", accessor: "sku" },
  { Header: "قیمت", accessor: "price" },
  // { Header: "قیمت نمایشی", accessor: "finalPrice" },
  { Header: "دسته بندی ", accessor: "category" },
  { Header: " کالکشن ها ", accessor: "collection" },
  // { Header: " تگ ها ", accessor: "tags" },
  // { Header: " رنگ ها  ", accessor: " colors" },
  // { Header: " سایز ", accessor: "size" },
  { Header: " اجرت ", accessor: "wages" },
  { Header: " وزن ", accessor: "weight" },
  { Header: "عملیات", accessor: "action" },
];

const productCategoryColumns = [
  { Header: " ", accessor: "" },
  { Header: " ", accessor: "" },
  { Header: "  ", accessor: "" },
  { Header: "عملیات", accessor: "action" },
];

const tagColumns = [
  { Header: "#", accessor: "number" },
  { Header: "نام تگ ", accessor: "name" },
  { Header: " تاریخ ایجاد تگ ", accessor: "Date" },
  { Header: "عملیات", accessor: "action" },
];
const giftCardCategoriesColumns = [
  { Header: "#", accessor: "number" },
  { Header: "نام دسته بندی ", accessor: "name" },
  { Header: " تاریخ ایجاد دیته بندی ", accessor: "Date" },
  { Header: "عملیات", accessor: "action" },
];
const CollectionsColumns = [
  { Header: "#", accessor: "number" },
  { Header: "نام کالکشن  ", accessor: "name" },
  { Header: " تاریخ ایجاد کالکشن  ", accessor: "Date" },
  { Header: "عملیات", accessor: "action" },
];

const userColumns = [
  { Header: " نام کاربر", accessor: "fullNmae" },
  { Header: " شماره تماس کاربر", accessor: "phoneNumber" },
  { Header: " تاریخ ایجاد کاربر	 ", accessor: "date" },
  { Header: "  نقش کاربر ", accessor: "rol" },
  { Header: "عملیات", accessor: "action" },
];
const requestColumns = [
  { Header: " نام کاربر", accessor: "fullNmae" },
  { Header: " شماره تماس کاربر", accessor: "phoneNumber" },
  { Header: "نام فرم درخواست", accessor: "fullNmae" },
  { Header: " تاریخ ایجاد درخواست	 ", accessor: "date" },
  { Header: "جزییات درخواست", accessor: "action" },
];
const companyJobColumns = [
  { Header: "عکس شغل", accessor: "image" },
  { Header: " نام شغل", accessor: "nmae" },
  { Header: "توضیحات شغل", accessor: "desc" },

  { Header: "عملیات", accessor: "action" },
];
const packagingColumns = [
  { Header: "عکس بسته بندی", accessor: "image" },
  { Header: " نام بسته بندی", accessor: "nmae" },
  { Header: "قیمت بسته بندی", accessor: "desc" },
  { Header: " تعداد بسته بندی", accessor: "stock" },

  { Header: "عملیات", accessor: "action" },
];

const discountCodeColumns = [
  { Header: "نام", accessor: "size" },
  { Header: "کد  ", accessor: "sku" },
  { Header: "مقدار (درصد)", accessor: "price" },
  { Header: " حداکثر استفاده", accessor: "color" },
  { Header: " تعداد استفاده شده	 ", accessor: "status" },
  { Header: " وضعیت ", accessor: "status" },
  { Header: "عملیات", accessor: "action" },
];

const branchColumns = [
  { Header: "عکس شعبه", accessor: "image" },
  { Header: " نام شعبه", accessor: "nmae" },
  { Header: " ادرس شعبه", accessor: "address" },
  { Header: " تلفن شعبه", accessor: "address" },
  { Header: " موبایل شعبه", accessor: "address" },
  { Header: " ساعت کاری شعبه", accessor: "workTime" },
  { Header: "عملیات", accessor: "action" },
];
const ordersColumns = [
  { Header: " شماره سفارش	", accessor: "image" },
  { Header: "  تاریخ و ساعت تحویل	", accessor: "nmae" },
  { Header: "  وضعیت سفارش	", accessor: "address" },
  { Header: " قیمت کل سفارش	 ", accessor: "address" },
  { Header: "عملیات", accessor: "action" },
];

const giftCardColumns = [
  { Header: "عکس کارت هدیه", accessor: "image" },
  { Header: "نام کارت هدیه", accessor: "name" },
  { Header: "دسته بندی ", accessor: "category" },
  // { Header: " تگ ها ", accessor: "tags" },
  { Header: "عملیات", accessor: "action" },
];

const ColorColumns = [
  { Header: "#", accessor: "number" },

  { Header: "نام رنگ ", accessor: "name" },
  { Header: "کد رنگ", accessor: "code" },
  { Header: "  تاریخ ایجاد", accessor: "date" },

  { Header: "عملیات", accessor: "action" },
];

const SizeColumns = [
  { Header: "#", accessor: "number" },

  { Header: "شماره سایز  ", accessor: "name" },
  { Header: "  تاریخ ایجاد", accessor: "date" },

  { Header: "عملیات", accessor: "action" },
];

export {
  blogColumns,
  productColumns,
  productCategoryColumns,
  tagColumns,
  blogCategoryColumns,
  userColumns,
  requestColumns,
  companyJobColumns,
  branchColumns,
  categoryColumns,
  jewelryTypesColumns,
  bannersColumns,
  packagingColumns,
  giftCardColumns,
  pagesListColumns,
  categoryListColumns,
  optionalListColumns,
  ColorColumns,
  SizeColumns,
  CollectionsColumns,
  giftCardCategoriesColumns,
  discountCodeColumns,
  ordersColumns,
};
