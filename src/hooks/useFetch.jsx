import { useEffect, useState } from "react";
import { fetchData } from "../services/Api.jsx";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  let controller = new AbortController();

  const getData = async () => {
    setLoading(true);
    try {
      const jsonData = await fetchData(url, controller);
      if (jsonData?.data?.docs) {
          setData(jsonData.data);
          setLoading(false);

      } else {
          setData({ docs: jsonData });
          setLoading(false);
      }

      setError(null);
    } catch (error) {
      setTimeout(() => {
        setError(error.message);
        setLoading(false);
      }, 1000);
    }
  };

  getData();
  return () => controller.abort();
}, [url]);

  return { data, loading, error };
}
