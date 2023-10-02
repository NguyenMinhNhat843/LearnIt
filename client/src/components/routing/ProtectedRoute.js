import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import Spinner from 'react-bootstrap/Spinner'
import { Navigate } from "react-router-dom"
import NavbarMenu from "../layout/NavbarMenu"

const ProtectedRoute = ({element: Element}) => {
    const {
        authState: {
            isAuthenticated,
            authLoading
        }
    } = useContext(AuthContext)

    if(authLoading) {
        return (
            <div className="
                d-flex 
                justify-content-center 
                align-items-center"
            >
                <Spinner animation='border' variant='info' />
            </div>
        )
    }

    return isAuthenticated 
            ? (
                <>
                    <NavbarMenu />
                    {Element}    
                </>
            )
            : <Navigate to='/login' />
}

export default ProtectedRoute;