import {Routes,Route} from "react-router-dom";
import Login from "../../admin/login";
import AdminDashboardLayout from "../../admin/layout";
import AdminDashboard from "../../admin/dashboard";
import Users from "../../admin/user";
import Results from "../../admin/result";
import Election from "../../admin/election";


export default function AdminRoutes(){

    return(
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Login/>}/>
                <Route path="/" element={<AdminDashboardLayout/>}>
                    <Route path="" index element={<AdminDashboard/>}/>
                    <Route path="users" element={<Users/>}/>
                    <Route path="results" element={<Results/>}/>
                    <Route path="election" element={<Election/>}/>
                </Route>
            </Routes>
        </>
    )
}