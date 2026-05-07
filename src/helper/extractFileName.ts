export const extractFileName = (url: string) => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};
