import { useRouter, useSearchParams } from "next/navigation";

export default function useSortOperation() {
  const router = useRouter();
  const searchParams = useSearchParams(); // دریافت پارامترهای موجود در URL

  const handleFilterChange = (sortBy?: string, sortOrder?: string) => {
    // ایجاد یک نمونه جدید از URLSearchParams با پارامترهای فعلی
    const queryParams = new URLSearchParams(searchParams.toString());

    // حذف پارامترهای قبلی
    queryParams.delete("sortBy");
    queryParams.delete("sortOrder");

    // اضافه کردن پارامترهای جدید
    if (sortBy) queryParams.set("sortBy", String(sortBy));
    if (sortOrder) queryParams.set("sortOrder", String(sortOrder));

    // به‌روزرسانی URL با پارامترهای جدید
    router.replace(`?${queryParams.toString()}`);
  };

  return {
    handleFilterChange,
  };
}
