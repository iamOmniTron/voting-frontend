import { Routes,Route } from "react-router-dom";
import LoginUser from "../../user/login";
import Home from "../../user/home";
import VoteDetails from "../../user/details";
import HomePage from "../../user";
import Vote from "../../user/vote";
import ElectionResult from "../../user/results";


export default function UserRoutes(){
    return(
        <>
            <Routes>
                <Route path="/login" element={<LoginUser/>}/>
                <Route path="*" element={<LoginUser/>}/>
                <Route path="/" element={<Home/>}>
                    <Route path="" element={<HomePage/>}/>
                    <Route path="vote-details" element={<VoteDetails/>}/>
                    <Route path="vote" element={<Vote/>}/>
                    <Route path="result" element={<ElectionResult/>}/>
                </Route>
            </Routes>
        </>
    )
}