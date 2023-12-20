import { mutate } from "../utils/fetch";

export const useLogin = ()=>{
    const login = async (body)=>{
        const url =`login`;
        const {data} = await mutate(url,false,body);
        return data;
    }
    return login;
}


export const useAdminLogin = ()=>{
    const login = async (body)=>{
        const url =`admin/login`;
        const {data} = await mutate(url,false,body);
        return data;
    }
    return login;
}