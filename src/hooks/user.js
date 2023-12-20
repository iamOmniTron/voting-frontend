import { useEffect, useState } from "react";
import { destroy, mutate, query} from "../utils/fetch"



export const useCreateUser = ()=>{

    const createUser = async (body)=>{
        const url = `user/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createUser;
}


export const useUsers = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const fetchUsers = async ()=>{
            setLoading(true);
            const url = `users/get-all`;
            const {data} = await query(url);
            setUsers(data);
            setLoading(false);
        }
        fetchUsers();
    },[flag]);

    return {
        loading,users
    }
}


export const useDeleteUser = ()=>{
    const deleteUser = async (id)=>{
        const url = `user/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteUser
}