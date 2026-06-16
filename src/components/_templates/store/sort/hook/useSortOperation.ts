import { useRouter, useSearchParams } from "next/navigation";

export default function useSortOperation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (sort: string) => {
    const queryParams = new URLSearchParams(searchParams.toString());

    queryParams.set("sort", sort);

    router.replace(`?${queryParams.toString()}`);
  };

  return {
    handleFilterChange,
  };
}
