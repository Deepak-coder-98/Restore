import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

export const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api'
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    //start Loading
    api.dispatch(startLoading())
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    //stop Loading
    api.dispatch(stopLoading())
    if(result.error) {
        const {status, data} = result.error;
        console.log({status, data})
    }
    return result;
}