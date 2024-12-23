export const buildUrl = (endpoint: string, params: any) => {
  const url = new URL(endpoint, "https://api.happybd.org");
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};
