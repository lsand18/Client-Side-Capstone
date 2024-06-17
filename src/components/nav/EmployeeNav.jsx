import { Link } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    return (
        <ul className="navbar">
        <li className="navbar-item">
            <Link to='/orders'>Orders</Link>
        </li>
        <li className="navbar-item">
            <Link to='/sales'>Sales</Link>
        </li>
        <li className="navbar-item">
            <Link to='/'>Code Generator</Link>
        </li>
        {localStorage.getItem("bakery_user") ? (
            <li className="navbar-item navbar-logout">
                <Link
                    className="navbar-link"
                    to=""
                    onClick={() => {
                        localStorage.removeItem("bakery_user")
                        navigate("/", { replace: true })
                    }}
                >
                    Logout
                </Link>
            </li>
        ) : (
            ""
        )}
    </ul>
    )
}