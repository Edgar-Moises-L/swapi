import { useEffect, useState } from "react";
import { fetchData } from "../services/Api.jsx";

export function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let controller = new AbortController();
        const getData = async () => {
            setLoading(true);
            try {
                const jsonData = await fetchData(url, controller);
                setData(jsonData);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getData();
        return () => {
            controller.abort();
        }
        
    }, [url])
    return { data, loading, error }
}