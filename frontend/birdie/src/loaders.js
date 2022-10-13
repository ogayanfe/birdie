import { getAxiosInstance } from "./actions";

export async function pageLoader(filter) {
    const axiosInstance = getAxiosInstance();
    let results = {
        next: null,
        posts: [],
    };
    const response = await axiosInstance.get(`/post/all?filter=${filter}`);
    results = {
        next: response.data.next,
        posts: response.data.results,
    };

    return results;
}
