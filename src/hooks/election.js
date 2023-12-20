import { useEffect, useState } from "react";
import { destroy, mutate, query} from "../utils/fetch"



export const useCreateElection = ()=>{

    const createElection = async (body)=>{
        const url = `election/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createElection;
}


export const useElections = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [elections,setElections] = useState([]);
    useEffect(()=>{
        const fetchElections = async ()=>{
            setLoading(true);
            const url = `election/get-all`;
            const {data} = await query(url);
            setElections(data);
            setLoading(false);
        }
        fetchElections();
    },[flag]);

    return {
        loading,elections
    }
}



export const useUpdateElection = ()=>{
    const updateElection = async (id,body)=>{
        const url = `election/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateElection;
}



export const useDeleteElection = ()=>{
    const deleteElection = async (id)=>{
        const url = `election/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteElection
}