export function checkUser() {
  const token = localStorage.getItem("user");
  if (!token) return false;
  return true;
}
