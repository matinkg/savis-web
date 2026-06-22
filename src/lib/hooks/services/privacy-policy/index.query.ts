import { getPrivacyPolicy } from "@/lib/services/privacy-policy/index.api";
import { queryOptions } from "@tanstack/react-query";

export const getPrivacyPolicyOptions = () => {
  return queryOptions({
    queryKey: ["privacy-policy"],
    queryFn: () => getPrivacyPolicy(),
  });
};
