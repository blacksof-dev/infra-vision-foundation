export const getUrl = (path: string) => {
  if (!path) return "";
  return path.startsWith("http")
    ? path
    : `${process.env.NEXT_PUBLIC_HOST_URL}${path}`;
};
