import { Children } from "react";
import { auth } from "../../firebase"
import { Navigate } from "react-router-dom";
import Home from "../../routes/home";


export default function ProtectRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = auth.currentUser;
    if(user === null){
        return <Navigate to="/login"/>
    }
    return <Home/>
}