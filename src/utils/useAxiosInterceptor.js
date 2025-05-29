import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

const useAxiosInterceptor = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 404) {
                    navigate("/not-found"); // Redirect to the NotFound page
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor on component unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);
};

export default useAxiosInterceptor;
