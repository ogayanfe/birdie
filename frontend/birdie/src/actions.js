import axios from "axios";
import { redirect } from "react-router-dom";

export function getTokens() {
    const tokens = JSON.parse(localStorage.getItem("userTokens"));
    return tokens ? tokens : { access: null, refresh: null };
}

export function getAxiosInstance() {
    const { access } = getTokens();
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            Authorization: `Bearer ${access}`,
        },
    });
    return axiosInstance;
}

export async function createPost({ request, params }) {
    const axiosInstance = getAxiosInstance();
    const formData = await request.formData();
    // const updates = Object.fromEntries(formData);
    axiosInstance.post("/post/create/", formData).then((res) => console.log(res));
    return redirect("");
}
