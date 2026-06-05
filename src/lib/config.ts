export const serverApi: string = `${import.meta.env.VITE_API_URL}`;

export const resolveAssetUrl = (path?: string): string => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const apiBase = serverApi.replace(/\/$/, "");

  if (apiBase === "/api") return normalizedPath;
  return `${apiBase}${normalizedPath}`;
};

export const Messages = {
  error1: "Something went wrong",
  error2: "Please login first",
  error3: "Please fulfill all inputs",
  error4: "Message is empty!",
  error5: "Only images with jpeg, jpg, png format allowed!",
};
