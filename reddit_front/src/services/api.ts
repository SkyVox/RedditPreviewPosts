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

const put = async (endpoint: string, data: object) => {
    try {
        const ret = await API_BASE.put(`/${endpoint}`, data);
        if (ret) return ret.data;
    } catch (error) {
        handleError(error);
    }
    return false;
}

const REDDIT_URL: string = "https://reddit.com";

export {
    get,
    put,
    REDDIT_URL
};