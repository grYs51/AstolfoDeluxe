import { useEffect, useState } from "react";
import { getAuthStatus } from "../../api";
import { User } from "../../types";

export function useFetchUser() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAuthStatus()
      .then(({ data }) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, error, loading };
}
