import { Navigate } from "react-router-dom";
import { UserProviderProps } from "../App";

export const ProtectedRoutes= ({children}: UserProviderProps) =>{
    const isAuthenticated = localStorage.getItem("token") !== null
    if(!isAuthenticated) {
        return <Navigate to ="/login"/>        
    }
    return children
}

