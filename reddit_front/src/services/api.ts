import axios, { AxiosInstance } from 'axios';

const API_BASE: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API_URL}/reddit/post`
});

const handleError = (error: any): boolean => {
    console.log(error);
    return false;
}

const get = async (endpoint: string) => {
    try {
        const { data } = await API_BASE.get(`/${endpoint}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}

export {
    get
};