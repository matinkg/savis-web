import * as yup from "yup";
import { formErrorMessage } from "./message-constants";
import { days } from "./constants";

const productSchema = yup.object().shape({
  name: yup.string().trim().required(),
  short_desc: yup.string().trim().required(),
  full_desc: yup.string().trim().required(),
  image: yup.string().trim(),
  sku: yup.string().trim().required(),
  weight: yup.number().required(),
  wages: yup.number().required(),
  // fixed_price: yup.number().required(  ),
  collection: yup.string().trim().required(),
  cover_type: yup.string().trim().required(),
  suitable_for: yup.string().trim().required(),
  count: yup.number().required(),
  product_parent: yup.string().trim().nullable(),
  category_id: yup.number().required(),
  material: yup.string().trim().required(),
  material_type: yup.string().trim().required(),
  ProductType: yup.string().trim().required(),
  // product_status: yup.string().trim().required(),
  images: yup
    .array()
    .of(
      yup.object({
        fileUrl: yup.string(),
        fileName: yup.string(),
      })
    )
    .default([]),
  tags: yup.array().of(yup.number()).default([]),
  attributes: yup
    .array()
    .of(
      yup.object({
        name: yup.string().trim().required(),
        value: yup.string().trim().required(),
      })
    )
    .default([]),
  cross_Sells: yup
    .array()
    .of(yup.object({ id: yup.string() }))
    .default([]),
  related_products: yup
    .array()
    .of(yup.object({ id: yup.string() }))
    .default([]),
});

// ---------------------productv2-------------------------

const productSchemaV2 = yup.object().shape({
  name: yup.string().required("نام محصول الزامی است."),
  short_desc: yup.string().required("توضیح کوتاه محصول الزامی است."),
  full_desc: yup.string().required("توضیح کامل محصول الزامی است."),
  image: yup.string().url("آدرس تصویر معتبر نیست.").nullable(),
  images: yup.array().of(yup.string().url("آدرس تصویر معتبر نیست.")).nullable(),
  weight: yup
    .number()
    .positive("وزن باید عددی مثبت باشد.")
    .required("وزن محصول الزامی است."),
  wages: yup
    .number()
    .min(0, "دستمزد نمی‌تواند منفی باشد.")
    .required("مقدار دستمزد الزامی است."),
  fixed_price: yup
    .number()
    .min(0, "قیمت ثابت نمی‌تواند منفی باشد.")
    .required("قیمت ثابت الزامی است."),
  price: yup
    .number()
    .min(0, "قیمت نمی‌تواند منفی باشد.")
    .required("قیمت محصول الزامی است."),
  collection: yup.string().nullable(),
  cover_type: yup.string().required("نوع جلد الزامی است."),
  suitable_for: yup.string().required("مناسب برای چه کسی الزامی است."),
  material: yup.string().required("جنس محصول الزامی است."),
  material_type: yup.string().required("نوع جنس محصول الزامی است."),
  count: yup
    .number()
    .integer("تعداد باید عدد صحیح باشد.")
    .min(0, "تعداد نمی‌تواند منفی باشد.")
    .required("تعداد محصول الزامی است."),
  category_id: yup
    .number()
    .integer("شناسه دسته‌بندی باید عدد صحیح باشد.")
    .nullable(),
  sku: yup.string().nullable(),
  related_products: yup
    .array()
    .of(yup.string().uuid("شناسه محصول مرتبط نامعتبر است."))
    .nullable(),
  cross_Sells: yup
    .array()
    .of(yup.string().uuid("شناسه محصول مکمل نامعتبر است."))
    .nullable(),
  tags: yup
    .array()
    .of(yup.number().integer("شناسه تگ نامعتبر است."))
    .nullable(),
  variants: yup
    .array()
    .of(
      yup.object().shape({
        size_id: yup
          .number()
          .integer("شناسه سایز نامعتبر است.")
          .required("شناسه سایز الزامی است."),
        color_id: yup
          .number()
          .integer("شناسه رنگ نامعتبر است.")
          .required("شناسه رنگ الزامی است."),
        price: yup
          .number()
          .min(0, "قیمت نمی‌تواند منفی باشد.")
          .required("قیمت واریانت الزامی است."),
        stock: yup
          .number()
          .integer("موجودی باید عدد صحیح باشد.")
          .min(0, "موجودی نمی‌تواند منفی باشد.")
          .required("موجودی واریانت الزامی است."),
        sku: yup.string().required("SKU واریانت الزامی است."),
      })
    )
    .required("حداقل یک واریانت باید تعریف شود.")
    .min(1, "حداقل یک واریانت باید تعریف شود."),
});

// --------------------------------------------------------

const blogSchema = yup.object().shape({
  title: yup.string().trim().required(),
  short_desc: yup.string().trim().required(),
  full_desc: yup.string().trim().required(),
  author: yup.string().trim().required(),
  image: yup.string(),
  related_posts: yup
    .array()
    .of(yup.object({ id: yup.string() }))
    .default([]),
  related_products: yup
    .array()
    .of(yup.object({ id: yup.string() }))
    .default([]),
  categoryId: yup.number(),
  status: yup.string().trim().required(),
});

const productCategorySchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().trim().required(),
  slug: yup.string().trim().required(),
  parent_id: yup.number(),
});

const agencyRequestSchema = yup.object().shape({
  first_name: yup.string().required("لطفاً نام خود را وارد کنید"),
  last_name: yup.string().required("لطفاً نام خانوادگی خود را وارد کنید"),
  address: yup.string().required("لطفاً آدرس خود را وارد کنید"),
  investment_power: yup
    .number()
    .required("لطفاً توان سرمایه‌گذاری خود را وارد کنید")
    .min(0, "توان سرمایه‌گذاری نمی‌تواند کمتر از ۰ باشد"),
  phone_number: yup.string().required(),
  mobile_number: yup
    .string()
    .required("لطفاً شماره موبایل خود را وارد کنید")
    .matches(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
  message: yup.string().required(),
});

const contactUsSchema = yup.object().shape({
  name: yup.string().trim().required(),
  subject: yup.string().trim().required(),
  email: yup.string().trim().required(),
  phone: yup.string().trim().required(),
  message: yup.string().trim().required(),
});

const jobApplicationSchema = (jobs: any[]) =>
  yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    gender: yup.string().oneOf(["MALE", "FEMALE"]).required(),
    birth_day: yup.string().required(),
    field: yup.string().required(),
    isStudent: yup.number().required(),
    position: yup
      .string()
      .oneOf(
        jobs?.map((job) => String(job.id)) || [],
        "لطفا شغل مورد نظر را از لیست انتخاب کنید"
      )
      .required("لطفا شغل مورد نظر را از لیست انتخاب کنید"),
    address: yup.string().required(),
    phone_number: yup.string().required(),
    mobile_number: yup.string().required(),
    resume: yup.string().required(),
    degree: yup.string().required(),
  });

const daysSchema = yup.object().shape({
  open: yup
    .string()
    .required("ساعت باز شدن ضروری است")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "فرمت ساعت نادرست است"),
  close: yup
    .string()
    .required("ساعت بسته شدن ضروری است")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "فرمت ساعت نادرست است"),
  closed: yup.boolean().required("تعطیل بودن ضروری است"),
});

const workTimeSchema = yup.object().shape(
  days.reduce((acc: any, day: any) => {
    acc[day] = daysSchema;
    return acc;
  }, {})
);

const branchSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  mobile_number: yup.string().required(),
  phone_number: yup.string().required(),
  work_time: yup.object(),
  image: yup.string(),
  lat: yup.number(),
  long: yup.number(),
  map_url: yup.string(),
});

const companyJob = yup.object().shape({
  title: yup.string().required(),
  desc: yup.string(),
  image: yup.string().required(),
});

const categorySchema = yup.object().shape({
  name: yup.string().required(),
  slug: yup.string().required(),
  parent_id: yup.string(),
  // id: yup.string(),
});

const JewelryTypesSchema = yup.object().shape({
  name: yup.string().required(),
  image: yup.string(),
  svg: yup.string(),
  parent_id: yup.string(),
  url_direct: yup.string(),
});

const giftCardSchema = yup.object().shape({
  name: yup.string().required(),
  image: yup.string().required(),
  desc: yup.string().required(),
  // method: yup
  //   .string()
  //   .oneOf(["PHYSICAL", "CODE", "EMAIL"],   )
  //   .required(  ),
  price: yup.string().required(),
  gift_code: yup.string().required(),
  category_id: yup.string().required(),
});

const packagingSchema = yup.object().shape({
  name: yup.string().required(),
  image: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required(),
});

const discountCodeSchema = yup.object().shape({
  code: yup
    .string()
    .required("Code is required")
    .min(5, "Code must be at least 5 characters"),
  name: yup.string().optional(), // نام می‌تواند خالی باشد
  discount_value: yup
    .number()
    .required("Discount value is required")
    .min(0, "Discount value must be greater than or equal to 0")
    .max(100, "Discount value must be less than or equal to 100"),
  usage_limit: yup
    .number()
    .nullable("") // ممکن است خالی باشد
    .min(1, "Usage limit must be at least 1"),
  used_count: yup.number().default(0),
  is_active: yup.boolean().default(true),
  product_id: yup.string().nullable(""), // باید از نوع رشته یا null باشد
});

export {
  blogSchema,
  productSchema,
  productCategorySchema,
  agencyRequestSchema,
  contactUsSchema,
  jobApplicationSchema,
  branchSchema,
  companyJob,
  categorySchema,
  JewelryTypesSchema,
  giftCardSchema,
  packagingSchema,
  productSchemaV2,
  discountCodeSchema,
};
