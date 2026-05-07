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

const HEADER_BASE_JSON = {
  "Content-Type": "application/json",
  "Accept-Language": "fr-IR,fr;q=0.5",
  Accept: "application/json",
};
const ProductStatus = {
  AVAILABLE: "AVAILABLE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  PRE_ORDER: "PRE_ORDER",
};

const ProductStatusArray = [
  {
    id: 1,
    key: "AVAILABLE",
    name: "موجود",
  },
  {
    id: 2,
    key: "OUT_OF_STOCK",
    name: "ناموجود",
  },
  {
    id: 3,
    key: "PRE_ORDER",
    name: "پیش خرید",
  },
];
const OffersTitleArray = [
  {
    id: 1,
    title: "جدید ترین ها",
    key: "latest",
  },
  {
    id: 2,
    title: "پرفروش ترین ها",
    key: "bestSelling",
  },
  {
    id: 3,
    title: "پایین ترین اجرت ساخت",
    key: "lowestWages",
  },
];

const ProductType = {
  product: "PRODUCT",
  variant: "VARIANT",
};

const status = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
};

const productColors = [
  {
    id: 1,
    code: "#FFD700",
    // en_name: "GOLDEN",
    name: "طلایی",
  },
  {
    id: 2,
    code: "#ffffff",
    // en_name: "WHITE",
    name: "سفید",
  },
  {
    id: 3,
    code: "#F5F5DC",
    // en_name: "BEIGE",
    name: "بژ",
  },
];

const productSize = [
  {
    id: 1,
    size: "50",
  },
  {
    id: 1,
    size: "51",
  },
  {
    id: 1,
    size: "52",
  },
  {
    id: 1,
    size: "53",
  },
  {
    id: 1,
    size: "54",
  },
];

const ProductInitialValue = {
  name: "",
  short_desc: "",
  full_desc: "",
  image: "",
  collection: "",
  cover_type: "",
  suitable_for: "",
  material: {},
  // --------------------------
  product_status: "",
  material_type: "",
  category_id: null,
  // ------------Array----------------
  images: [],
  cross_Sells: [],
  related_products: [],
  tags: [],
  variations: [],
  // ---------------delte-------------------
  fixed_price: "",
  sku: "",
  weight: "",
  wages: "",
  price: "",
  count: "",
  length: "",
};

const previousValueDataServer = {
  id: "",
  name: "",
  short_desc: "",
  full_desc: "",
  image: "",
  images: [],
  related_products: [],
  cross_Sells: [],
  productCollection: [],
  sku: "",
  weight: "",
  fixed_price: "",
  price: "",
  wages: "",
  collection: "",
  cover_type: "  ",
  suitable_for: "   ",
  material: "",
  material_type: " ",
  count: "",
  length: "",
  size: "",
  color: "",
  product_status: "",
  category_id: null,
  averageRating: 0,
  created_at: "",
  updated_at: "",
  tags: [],
  variations: [],
  category: {},
};

const blogInitialValue = {
  title: "",
  short_desc: "",
  full_desc: "",
  image: "",
  author: "کارشناس ساویس",
  status: status?.DRAFT,
  category_id: null,
  related_posts: [],
  related_products: [],
};

const giftCardInitailValue = {
  name: "",
  image: "",
  desc: "",
  method: "",
  price: "",
  gift_code: "",
  category_id: "",
  packaging_id: "",
  stock: "",
};

const branchesInitialValue = {
  name: "",
  address: "",
  mobile_number: "",
  phone_number: "",
  work_time: "",
  image: "",
  lat: 0,
  long: 0,
  map_url: "",
};

const initialHomePageValue = {
  homeAds_sec_one: {},
  homeAds_sec_tow: {
    "image-ads-category-top-right": "",
    "image-ads-category-top-left": "",
    "image-ads-category-bottom": "",
    "image-ads-category-left": "",
    // =============
    "link-ads-category-top-right": "",
    "title-ads-category-top-right": "",
    "link-ads-category-top-left": "",
    "title-ads-category-top-left": "",
    "link-ads-category-bottom": "",
    "title-ads-category-bottom": "",
    "link-ads-category-left": "",
    "title-ads-category-left": "",
  },
  homeAds_sec_three: {
    "btn-ads-home": "",
    "image-ads-home": "",
    "link-ads-home": "",
    "subTitle-ads-home": "",
    "title-ads-home": "",
  },
  home_Banner: {
    "btn-banner-home": "",
    "image-banner-home": "",
    "link-banner-home": "",
    "subTitle-banner-home": "",
    "title-banner-home": "",
  },
  home_customerClub: {
    "btn-customerClub-home": "",
    "image-customerClub-home": "",
    "link-customerClub-home": "",
    "subTitle-customerClub-home": "",
    "title-customerClub-home": "",
  },
};

const initialPublicSetting = {
  tax: "",
  goldPriceManually: "",
};

const settingKeysObject = {
  homeAds_sec_one: "homeAds_sec_one",
  homeAds_sec_two: "homeAds_sec_two",
  homeAds_sec_three: "homeAds_sec_three",
  home_Banner: "home-banner",
  home_customerClub: "home_customerClub",
  banner_pages_weblog: "banner_pages_weblog",
  banner_pages_weblog_middle_banner: "banner_pages_weblog_middle_banner",
  generalSettings: "generalSettings",
  banner_pages_contact_us: "banner_pages_contact_us",
  banner_pages_about_us: "banner_pages_about_us",
  banner_pages_branch: "banner_pages_branch",
  banner_pages_agency_request: "banner_pages_agency_request",
  banner_pages_store_women: "banner_pages_store_women",
  banner_pages_store_men: "banner_pages_store_men",
  banner_pages_store_childern: "banner_pages_store_childern",
  banner_pages_store_gifts: "banner_pages_store-gifts",
  banner_pages_faq: "banner_pages_faq",
  banner_pages_size: "banner_pages_size",
  banner_pages_job_opportunities: "banner_pages_job_opportunities",
  banner_pages_privacy_policy: "banner_pages_privacy_policy",
  banner_pages_customJewelry: "banner_pages_customJewelry",
};

const blogKeysObject = {
  stylingAndSettingGuide: "راهنمای استایل و ست کردن",
  whatYouNeedToKnowAboutJewelry: "آنچه درباره طلا و جواهر باید بدانید",
};

const listKeyObject = {
  list_pages: "PAGES",
  list_category: "",
  list_optional: "",
};

const initialListValue = {
  list_pages: {},
  list_category: {},
  list_optional: {},
};

const packagingInitialValue = {
  name: "",
  image: "",
  price: "",
  stock: "",
};

const errorMessage = "این فیلد الزامی است";
const numberErrorMessage = "لطفا فقط عدد وارد کنید";

const MaterailList = [
  {
    id: "1",
    name: "طلا",
  },
  {
    id: "2",
    name: "نقره",
  },
];
const MaterialTypeList = [
  {
    id: "1",
    name: "طلایی سفید",
  },
  {
    id: "2",
    name: "نقره ی مات ",
  },
];

const suitableList = [
  {
    id: "1",
    name: "خانم ها و اقایان ",
  },
  {
    id: "2",
    name: "اقایان",
  },
  {
    id: "3",
    name: "خانم ها",
  },
];
const coverTypeList = [
  {
    id: "1",
    name: "مات و براق ",
  },
];

const formsName = {
  agencyRequest: "اعطای نمایندگی",
  jobApplications: "فرصت های شغلی",
  contactUs: "تماس با ما",
};

const gender = [
  {
    key: "MALE",
    value: "مرد",
  },
  {
    key: "FEMALE",
    value: "زن",
  },
];

const degreeEducation = [
  {
    key: "bachelor",
    value: "کارشناسی",
  },
  {
    key: "master",
    value: "کارشناسی ارشد",
  },
  {
    key: "PhD",
    value: "دکترا",
  },
];

const JobApplicationsContent = {
  Advantages: [
    {
      title: `پاداش بر اساس عملکرد`,
      img: "/images/job/1.png",
    },
    {
      title: `امکان دورکاری`,
      img: "/images/job/2.png",
    },
    {
      title: `پاداش ارجاع همکار`,
      img: "/images/job/3.png",
    },
    {
      title: `خرید با شرایط همکار`,
      img: "/images/job/4.png",
    },
    {
      title: `زمان کاری منعطف`,
      img: "/images/job/5.png",
    },
    {
      title: `بیمه تکمیلی`,
      img: "/images/job/6.png",
    },
    {
      title: `امنیت شغلی`,
      img: "/images/job/7.png",
    },
    {
      title: `برنامه های آموزشی`,
      img: "/images/job/8.png",
    },
  ],
};

const center = [35.80043901242502, 51.45081022505581];

const days = [
  "شنبه",
  " یکشنبه ",
  "دوشنبه",
  "سه شنبه",
  "چهار شنبه",
  "پنچ شنبه",
  "جمعه",
];

const pages = [
  {
    id: "19cd6095-6653-4d39-85de-3b6d9441f34c",
    name: "  صحفه ی  درباره ساویس ",
    en_name: "about_us",
  },
  {
    id: "3f66876e-ff08-469a-87c8-0afd541e3978",
    name: " صحفه ی تماس با ما",
    en_name: "contact_us",
  },
  {
    id: "94096b1b-33a5-438f-ab75-113bc13f883f",
    name: " صحفه ی شعب حضوری",
    en_name: "branch",
  },
  {
    id: "af333098-3c37-494c-bb75-64520586f975",
    name: "صحفه ی وبلاگ ",
    en_name: "weblog",
  },
  {
    id: "af333098-3c37-494c-bb75-64520586f900",
    name: "صحفه ی وبلاگ  , بنر میانه ی صحفه ",
    en_name: "weblog_middle_banner",
  },
  {
    id: "53042adc-d6f8-4e84-80aa-75ffb30690c1",
    name: "صحفه ی اعطای نمایندگی",
    en_name: "agency_request",
  },
  {
    id: "903c9ce9-8086-44ae-8b6d-04dabccc0cf2",
    name: "صحفه ی فروشگاه زنانه",
    en_name: "store-women",
  },
  {
    id: "903c9ce9-8086-44ae-8b6d-04dabccc0cg01",
    name: "صحفه ی فروشگاه مردانه",
    en_name: "store-men",
  },
  {
    id: "903c9ce9-8086-44ae-8b6d-04dabccc0cb00",
    name: "صحفه ی فروشگاه بچه گانه",
    en_name: "store-childern",
  },
  {
    id: "903c9ce9-8086-44ae-8b6d-04dabccc0cb11",
    name: "صحفه ی فروشگاه  هدایا",
    en_name: "store-gifts",
  },
  // {
  //   id: `1bd49d25-bb83-4036-886b-4c3da31cf546`,
  //   name: "صحفه  ی سوالات متدوال",
  //   en_name: "faq",
  // },
  // {
  //   id: `8d1027db-747e-467f-b864-453740d655df`,
  //   name: "صحفه  ی راهنمای سایزبندی",
  //   en_name: "size",
  // },
  {
    id: `767ff171-4aaf-454e-a911-06e7f5bda770`,
    name: "صحفه ی فرصت های شغلی   ",
    en_name: "job_opportunities",
  },
  // {
  //   id: `469ddb16-db62-488f-89d6-b70d5e5bdefa`,
  //   name: " صحفه ی قوانین  و مقررات",
  //   en_name: "privacy_policy",
  // },
  {
    id: `7526b7bf-0749-4597-b086-d01a8667d5eb`,
    name: " صحفه ی ثبت  سفارش طراحی",
    en_name: "customJewelry",
  },
  // {
  //   id: `2abaa501-78da-4294-ba3d-d2e1c04601b2`,
  //   name: "پیش خرید",
  //   en_name: "",
  // },
  {
    id: `2abaa501-78da-4294-ba3d-d2e1c04601b2`,
    name: "صحفه ی حساب کاربری  ",
    en_name: "account",
  },
];

const positions = [
  {
    id: "19cd6091-6657-4d30-85de-3b6d9441f34h",
    name: "فوتر",
    en_name: "footer",
  },
  {
    id: "19cd6096-6650-4d30-85ds-3b6d9441f34o",
    name: "هدر منو",
    en_name: "menu",
  },
  {
    id: "19cd6094-6651-4d32-85dm-3b6d9441f34p",
    name: "همبرگر منو",
    en_name: "hambergerMenu",
  },
];

const bannerPagesKey = {};

const catalogKey = {
  PAGES: "PAGES",
  CATEGORY: "CATEGORY",
  OPTIONAL: "OPTIONAL",
};

const caratGoldKey = {
  caratGold24Key: 137121,
  caratGold18Key: 391295,
};

// const productDetailsValue = {
//   id: "",
//   sku: "",
//   name: "",
//   short_desc: "",
//   full_desc: "",
//   image: "",
//   images: [],
//   related_products: [],
//   cross_Sells: [],
//   cover_type: "",
//   suitable_for: "",
//   material: "",
//   material_type: "",
//   count: 0,
//   category_id: 0,
//   price: 0,
//   fixed_price: 0,
//   weight: 0,
//   wages: 0,
//   length: "",
//   isFavorite: false,
//   averageRating: 0,
//   created_at: "2024-09-10T05:15:53.571Z",
//   updated_at: "2024-09-11T06:53:39.132Z",
//   product_status: "",
//   category: {},
//   variations: [],
//   productCollection: [],
//   uniqueSizes: [],
//   uniqueColors: [],
//   sizeColorData: [],
// };

const productDetailsValue = {
  id: "17ce1c26-d51a-4f0a-95f8-aaa77aa1c03b",
  sku: "savis-gold-rose-2050",
  name: "دستبند مروارید کشت شده اکویا (7 میلی متر)",
  short_desc:
    "<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>",
  full_desc:
    "<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>",
  image:
    "https://storage.c2.liara.space/savis-buket/staticImages/photo (1).png-1726032385308",
  images: [
    {
      fileUrl:
        "https://storage.c2.liara.space/savis-buket/staticImages/Rectangle 23.png-1726032327645",
      fileName: "Rectangle 23.png",
    },
    {
      fileUrl:
        "https://storage.c2.liara.space/savis-buket/staticImages/photo (4).png-1726032341444",
      fileName: "photo (4).png",
    },
  ],
  related_products: [],
  cross_Sells: [],
  cover_type: "مات و براق ",
  suitable_for: "خانم ها و اقایان ",
  material: "طلا",
  material_type: "طلایی سفید",
  count: 2,
  category_id: 1,
  price: 4597772.88,
  fixed_price: 600000,
  weight: 1.2,
  wages: 20,
  length: "",
  isFavorite: false,
  averageRating: 0,
  created_at: "2024-09-10T05:15:53.571Z",
  updated_at: "2024-09-11T06:53:39.132Z",
  product_status: "AVAILABLE",
  category: {
    id: 1,
    name: "زنانه",
    slug: "زنانه",
    parent_id: null,
    isShowHome: true,
    image:
      "https://storage.c2.liara.space/savis-buket/staticImages/image 1 (3).png-1725129468058",
    image_title: "طــــلا زنـــانه",
    created_at: "2024-08-31T17:46:10.204Z",
    updated_at: "2024-08-31T18:37:53.801Z",
  },
  variations: [
    {
      id: 44,
      name: "دستبند مروارید کشت شده اکویا -51",
      price: 3855873.4,
      size: "51",
      colors: {
        id: 1,
        code: "#FFD700",
        name: "طلایی",
      },
      product_status: {
        id: 1,
        key: "AVAILABLE",
        name: "موجود",
      },
      fixed_price: 0,
      weight: 1,
      wages: 20,
      sku: "gold-savis-2024",
      stockQuantity: 1,
    },
    {
      id: 45,
      name: "دستبند مروارید کشت شده اکویا -52",
      price: 4627048.08,
      size: "52",
      colors: {
        id: 2,
        code: "#ffffff",
        name: "سفید",
      },
      product_status: {
        id: 1,
        key: "AVAILABLE",
        name: "موجود",
      },
      fixed_price: 0,
      weight: 1.2,
      wages: 20,
      sku: "gold-savis-2025",
      stockQuantity: 2,
    },
    {
      id: 46,
      name: "دستبند مروارید کشت شده اکویا-51",
      price: 3855873.4,
      size: "51",
      colors: {
        id: 3,
        code: "#F5F5DC",
        name: "بژ",
      },
      product_status: {
        id: 3,
        key: "PRE_ORDER",
        name: "پیش خرید",
      },
      fixed_price: 0,
      weight: 1,
      wages: 20,
      sku: "savis-gold-2050",
      stockQuantity: 41,
    },
  ],
  productCollection: [
    {
      id: "ed64cd09-76b8-4cc4-9c24-19f4af7208da",
      product_id: "17ce1c26-d51a-4f0a-95f8-aaa77aa1c03b",
      collection_id: "ff19e2ae-6409-4ad5-af5c-bdaa030a642b",
      created_at: "2024-09-11T06:53:39.132Z",
      updated_at: "2024-09-11T06:53:39.132Z",
      collection: {
        id: "ff19e2ae-6409-4ad5-af5c-bdaa030a642b",
        name: "جواهرات",
        created_at: "2024-09-10T04:22:31.040Z",
        updated_at: "2024-09-10T04:22:31.040Z",
      },
    },
  ],
  uniqueSizes: ["51", "52"],
  uniqueColors: ["#FFD700", "#ffffff", "#F5F5DC"],
  sizeColorData: [
    {
      size: "51",
      colors: [
        {
          color_name: "طلایی",
          color_code: "#FFD700",
          name: "دستبند مروارید کشت شده اکویا -51",
          price: 3855873.4,
          product_status: {
            id: 1,
            key: "AVAILABLE",
            name: "موجود",
          },
          fixed_price: 0,
          weight: 1,
          wages: 20,
          sku: "gold-savis-2024",
          stockQuantity: 1,
        },
        {
          color_name: "بژ",
          color_code: "#F5F5DC",
          name: "دستبند مروارید کشت شده اکویا-51",
          price: 3855873.4,
          product_status: {
            id: 3,
            key: "PRE_ORDER",
            name: "پیش خرید",
          },
          fixed_price: 0,
          weight: 1,
          wages: 20,
          sku: "savis-gold-2050",
          stockQuantity: 41,
        },
      ],
    },
    {
      size: "52",
      colors: [
        {
          color_name: "سفید",
          color_code: "#ffffff",
          name: "دستبند مروارید کشت شده اکویا -52",
          price: 4627048.08,
          product_status: {
            id: 1,
            key: "AVAILABLE",
            name: "موجود",
          },
          fixed_price: 0,
          weight: 1.2,
          wages: 20,
          sku: "gold-savis-2025",
          stockQuantity: 2,
        },
      ],
    },
  ],
};

const userInfoValue = {
  phone: "",
  role: "",
  id: "",
  address: "",
  email: "",
  first_name: "",
  last_name: "",
  nickname: "",
  postal_code: "",
  city: "",
  province: "",
};

const activeCartKey = {
  Basket: "Basket",
  Checkout: "Checkout",
  OrderCompletion: "OrderCompletion",
};

const selectedColorDataValue = {
  color_name: "",
  color_code: "",
  name: "",
  sku: "",
  product_status: {
    id: 0,
    key: "",
    name: "",
  },
  price: 0,
  fixed_price: 0,
  weight: 0,
  wages: 0,
  stockQuantity: 0,
};

const giftCardInitailValues = {
  id: "",
  name: "",
  image: "",
  description: "",
  method: "",
  price: 0,
  stock: 0,
  gift_code: "",
  category_id: "",
  packaging_id: null,
  created_at: "",
  updated_at: "",
  category: {
    id: "",
    name: "",
    created_at: "2024-09-12T13::39.579Z",
    updated_at: "2024-09-12T13:53:39.579Z",
  },
};

export {
  authTypes,
  roles,
  HEADER_BASE_JSON,
  localStorageKey,
  ProductInitialValue,
  ProductStatus,
  ProductType,
  errorMessage,
  numberErrorMessage,
  MaterailList,
  status,
  blogInitialValue,
  formsName,
  JobApplicationsContent,
  gender,
  degreeEducation,
  branchesInitialValue,
  center,
  days,
  initialHomePageValue,
  settingKeysObject,
  pages,
  giftCardInitailValue,
  packagingInitialValue,
  positions,
  listKeyObject,
  initialListValue,
  catalogKey,
  blogKeysObject,
  caratGoldKey,
  initialPublicSetting,
  previousValueDataServer,
  ProductStatusArray,
  OffersTitleArray,
  productDetailsValue,
  userInfoValue,
  activeCartKey,
  productColors,
  MaterialTypeList,
  suitableList,
  coverTypeList,
  productSize,
  selectedColorDataValue,
  giftCardInitailValues,
};
