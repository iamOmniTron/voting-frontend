import { useEffect, useState } from "react";
import { destroy, mutate, query} from "../utils/fetch"



export const useCreateVote = ()=>{

    const createVote = async (body)=>{
        const url = `vote/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createVote;
}


export const useVotes = (flag,candidate)=>{
    const [loading,setLoading] = useState(false);
    const [votes,setVotes] = useState([]);
    useEffect(()=>{
        const fetchVotes = async ()=>{
            setLoading(true);
            const url = `votes/candidate/?candidate=${candidate}`;
            const {data} = await query(url);
            setVotes(data);
            setLoading(false);
        }
        fetchVotes();
    },[flag,candidate]);

    return {
        loading,votes
    }
}