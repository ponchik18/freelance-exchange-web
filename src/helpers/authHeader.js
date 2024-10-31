export function headerAuth(token) {
  return {
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };
}
