const BASE_URL = "https://savisgold.ir";

const authApi = {
  ADMIN: "/api/auth/admin/loginByAdmin",
  CREATADMIN: "/api/auth/admin/createAdmin",
  SIGNUP: "/api/auth/signup",
  SIGNIN: "/api/auth/signin",
  SIGNOUT: "/api/auth/signout",
  getToken: "/api/auth/get-token",
  getUserInfo: "/api/auth/user-info",
  USERINFO: "/api/auth/user-info",
  OTP_SIGNUP: "/api/auth/sms/send/signup",
  OTP_SIGNIN: "/api/auth/sms/send/signin",
  VERIFY_SIGNUP: "/api/auth/sms/verify/signup",
  VERIFY_SIGNIN: "/api/auth/sms/verify/signin",
};

const categoriesApi = {
  CREATE: "/api/categories/create",
  sitesetting: "/api/v1/sitesetting",
  ORIGIN: "/api/categories",
  UPDATE: "/api/categories/update",
  GETCATEGORIESBYLEVEL: "/api/categories/getCategoriesByLevel",
  SEARCHCATEGORYBYSLUG: "/api/categories/getCategoryBySlug",
};

const uploadFileApi = {
  UPLOADIMAGES_STATIC: "/api/upload/static-images",
  UPLOADIMAGES_PRODUCTS: "/api/upload/products",
  UPLOADIMAGES_BLOG: "/api/upload/blog",
  UPLOADIMAGES_JOBS: "/api/upload/jobs",
  UPLOADIMAGES_RESUME: "/api/upload/resume",
};

const tagsApi = {
  CREATE: "/api/tags/create",
  GET: "/api/tags/get",
  ORIGIN: "/api/tags",
  UPDATE: "/api/tags/update",
};

const settingApi = {
  CREATE: "/api/setting/create",
  GET: "/api/setting/get",
  ORIGIN: "/api/setting",
  UPDATE: "/api/setting/update",
  getMultimediaContentForHomePage:
    "/api/setting/getMultimediaContentForHomePage",
};

const attributesApi = {
  CREATE: "/api/attributes/create",
  GET: "/api/attributes/get",
  ORIGIN: "/api/attributes",
  UPDATE: "/api/attributes/update",
};

const blogApi = {
  CREATE: "/api/blog/create",
  GET: "/api/blog/get",
  ORIGIN: "/api/blog",
  UPDATE: "/api/blog/update",
};
const blogCategoriesApi = {
  CREATE: "/api/blogCategories/create",
  GET: "/api/blogCategories/get",
  ORIGIN: "/api/blogCategories",
  UPDATE: "/api/blogCategories/update",
};

const usersApi = {
  CREATE: "/api/users/create",
  GET: "/api/users/get",
  ORIGIN: "/api/users",
  UPDATE: "/api/users/UpdateUserInfo",
};

const contactUsApi = {
  CREATE: "/api/forms/contactUs/create",
  GET: "/api/forms/contactUs/get",
  ORIGIN: "/api/forms",
  UPDATE: "/api/forms/contactUs/update",
};
const agencyRequestApi = {
  CREATE: "/api/forms/agencyRequest/create",
  GET: "/api/forms/agencyRequest/get",
  ORIGIN: "/api/forms",
  UPDATE: "/api/forms/agencyRequest/update",
};
const jobApplicationsApi = {
  CREATE: "/api/forms/jobApplications/create",
  GET: "/api/jobApplications/forms/get",
  ORIGIN: "/api/jobApplications/forms",
  UPDATE: "/api/forms/jobApplications/update",
};

const branchesApi = {
  CREATE: "/api/branches/create",
  GET: "/api/branches/get",
  ORIGIN: "/api/branches",
  UPDATE: "/api/branches/update",
};
const companyJobsApi = {
  CREATE: "/api/companyJobs/create",
  GET: "/api/companyJobs/get",
  ORIGIN: "/api/companyJobs",
  UPDATE: "/api/companyJobs/update",
};

const jewelryTypesApi = {
  CREATE: "/api/jewelryTypes/create",
  GET: "/api/jewelryTypes/get",
  ORIGIN: "/api/jewelryTypes",
  UPDATE: "/api/jewelryTypes/update",
};

const giftCardApi = {
  CREATE: "/api/giftCard/create",
  GET: "/api/giftCard/get",
  GETBASEONCATEGORY: "/api/giftCard/getGiftCardBaseCategory",
  ORIGIN: "/api/giftCard",
  UPDATE: "/api/giftCard/update",
};
const giftCardCategoriesApi = {
  CREATE: "/api/giftCardCategories/create",
  GET: "/api/giftCardCategories/get",
  ORIGIN: "/api/giftCardCategories",
  UPDATE: "/api/giftCardCategories/update",
};
const packagingApi = {
  CREATE: "/api/packaging/create",
  GET: "/api/packaging/get",
  ORIGIN: "/api/packaging",
  UPDATE: "/api/packaging/update",
};

const savisApi = {
  SAVISOFFER: "/api/savis/savisOffer",
  SAVISGIFT: "",
};

const catalogApi = {
  CREATE: "/api/catalog/create",
  GET: "/api/catalog/get",
  ORIGIN: "/api/catalog",
  UPDATE: "/api/catalog/update",
};

const goldApi = {
  get: "/api/v1/getGoldPrice",
  ORIGIN:
    "https://studio.persianapi.com/index.php/web-service/gold?format=json&limit=30&page=1",
};

const colorApi = {
  CREATE: "/api/productColor/createProductColor",
  GET: "/api/productColor/getAllProductColor",
  ORIGIN: "/api/productColor",
  UPDATE: "/api/productColor",
};
const sizeApi = {
  CREATE: "/api/productSize/createProductSize",
  GET: "/api/productSize/getAllProductSize",
  ORIGIN: "/api/productSize",
  UPDATE: "/api/productSize",
};

const productPriceApi = {
  CREATE: "/api/productPrice/createProductPrice",
  GET: "/api/productPrice/getAllproductPrice",
  ORIGIN: "/api/productPrice",
  UPDATE: "/api/productPrice/updateProductPrice",
  GETPRODUCTBYID: "/api/productPrice/updateProductPrice",
  SEARCH: "/api/productPrice/updateProductPrice",
};
const productsApi = {
  CREATE: "/api/products/createProduct",
  GET: "/api/products/get",
  ORIGIN: "/api/products",
  UPDATE: "/api/products/updateProduct",
  SEARCH: "/api/products/searchAllProducts",
  GETPRODUCTBYID: "/api/products/getFilteredProductById",
};

const offersApi = {
  GET: "/api/offers/getOffers",
};
const savisGiftApi = {
  GET: "/api/savisGift/get",
};

const commentApi = {
  CREATE: "/api/comment/registerComment",
  GET: "/api/comment/getAllCommentbyProductId",
};

const wishApi = {
  CREATE: "/api/wish/createWishItem",
  GET: "/api/wish/getAllWishItems",
  ORIGIN: "/api/wish",
  DELETEAll: "/api/wish/deleteWishAllItemsByUserId",
  DELETE: "/api/wish/deleteWishItemsById",
  DELETEBYPRODUCTID: "/api/wish/deleteWishItemsByProductId",
};

const collectionsApi = {
  CREATE: "/api/collections/createCollection",
  GET: "/api/collections/getAllCollections",
  ORIGIN: "/api/collections",
  UPDATE: "/api/collections/updateCollection",
  // SEARCH: "/api/collections/searchAllProducts",
};
const discountCodeApi = {
  CREATE: "/api/discountCode/createDiscountCodeByManager",
  GET: "/api/discountCode/getAllDiscountCodeByManger",
  ORIGIN: "/api/discountCode",
  UPDATE: "/api/discountCode/updateDiscountCodeByManager",
  // SEARCH: "/api/collections/searchAllProducts",
};
const orderApi = {
  CREATE: "/api/orderApi/",
  GET: "/api/orderApi/",
  ORIGIN: "/api/orderApi",
  UPDATE: "/api/orderApi/",
  // SEARCH: "/api/collections/searchAllProducts",
};

export {
  authApi,
  categoriesApi,
  productsApi,
  uploadFileApi,
  tagsApi,
  settingApi,
  attributesApi,
  blogApi,
  usersApi,
  blogCategoriesApi,
  contactUsApi,
  agencyRequestApi,
  jobApplicationsApi,
  branchesApi,
  companyJobsApi,
  jewelryTypesApi,
  giftCardApi,
  giftCardCategoriesApi,
  packagingApi,
  savisApi,
  catalogApi,
  goldApi,
  colorApi,
  sizeApi,
  productPriceApi,
  offersApi,
  savisGiftApi,
  commentApi,
  wishApi,
  collectionsApi,
  BASE_URL,
  discountCodeApi,
  orderApi,
};
