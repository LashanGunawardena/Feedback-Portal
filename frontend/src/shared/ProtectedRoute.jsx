import { Navigate } from "react-router-dom";

//Checks whether the user is logged in and restricts the access to the page if not logged in
export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to="/login" replace />;
    }

    return children;
}
