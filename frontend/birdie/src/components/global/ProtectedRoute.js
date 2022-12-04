import { Navigate, Outlet } from "react-router-dom";
import useUserContext from "../../contexts/UserContext";

function LoginRequiredRoute() {
    const { user } = useUserContext();
    return <>{user ? <Outlet /> : <Navigate to="/signin"></Navigate>}</>;
}

export default LoginRequiredRoute;
