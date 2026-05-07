import { useRouter, useSearchParams } from "next/navigation";

export default function usePageSizeOperation() {
  const router = useRouter();
  const searchParams = useSearchParams(); // دریافت پارامترهای موجود در URL
  const pageSizeActive = searchParams.get("pageSize");

  const handleFilterChange = (pageSize?: number) => {
    // ایجاد یک نمونه جدید از URLSearchParams با پارامترهای فعلی
    const queryParams = new URLSearchParams(searchParams.toString());

    // حذف پارامترهای قبلی
    queryParams.delete("pageSize");

    // اضافه کردن پارامترهای جدید
    if (pageSize) queryParams.set("pageSize", String(pageSize));

    // به‌روزرسانی URL با پارامترهای جدید
    router.replace(`?${queryParams.toString()}`);
  };

  return {
    handleFilterChange,
    pageSizeActive,
  };
}
