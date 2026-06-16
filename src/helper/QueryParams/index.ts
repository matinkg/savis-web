const handleQueryParams = (searchParams: any) => {
  const category = searchParams.get("category");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const isDiscounted = searchParams.get("isDiscounted");
  const isAvailable = searchParams.get("isAvailable");
  const pageSize = searchParams.get("pageSize");
  const sort = searchParams.get("sort");

  // ایجاد یک شیء برای نگه‌داری پارامترها
  const params = {
    category: category || undefined,
    min_price: minPrice || undefined,
    max_price: maxPrice || undefined,
    isDiscounted: isDiscounted || undefined,
    isAvailable: isAvailable || undefined,
    pageSize: pageSize || undefined,
    sort: sort || undefined,
  };

  // ساختن URLSearchParams فقط با پارامترهایی که مقدار دارند
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, value);
    }
  });

  // تبدیل پارامترها به یک رشته
  const decodedParams = decodeURIComponent(query.toString());

  return decodedParams;
};
// -------------------------------------------------
const clearAllQueryParams = (router: any, routeUrl: string) => {
  // به روزرسانی URL بدون هیچ query string
  router.replace(routeUrl);
};

const clearQueryParams = (
  paramsToRemove: any,
  router: any,
  searchParams: any,
) => {
  // کپی از searchParams برای حذف پارامترها
  const query = new URLSearchParams(searchParams.toString());

  // حذف پارامترهای مشخص شده
  paramsToRemove.forEach((param: string) => {
    query.delete(param);
  });

  // به روزرسانی URL بدون رفرش صفحه
  router.replace(`/gold?${query.toString()}`);
};

export { handleQueryParams, clearAllQueryParams, clearQueryParams };
