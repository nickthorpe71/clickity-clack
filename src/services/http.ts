import axios from "axios";

const baseURL = "http://i0l7l1kcg3.sharedwithexpose.com";

const http = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default {
    get: (endpoint: string) => http.get(`${baseURL}${endpoint}`),
    post: (endpoint: string, data: any) =>
        http.post(`${baseURL}${endpoint}`, data),
    put: (endpoint: string, data: any) =>
        http.put(`${baseURL}${endpoint}`, data),
    delete: (endpoint: string) => http.delete(`${baseURL}${endpoint}`),
};
