import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/slices/userSlice";

export function auth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchUser() {
      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) return;
      const result = await res.json();
      dispatch(setUser(result.data));
    }

    fetchUser();
  }, [dispatch]);
}
