export function checkUser() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  return true;
}
