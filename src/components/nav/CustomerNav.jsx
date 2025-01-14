import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-item">
                {/* change this link */}
                <Link to='/'>Rewards</Link>
            </li>
            <li className="navbar-item">
                {/* change this link */}
                <Link to='/orders'>My Orders</Link>
            </li>
            <li className="navbar-item">
                {/* change this link */}
                <Link to='/newOrder'>Order A Cake</Link>
            </li>
            <li className="navbar-item">
                {/* change this link */}
                <Link to='/currentFlavors'>Current Flavors</Link>
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
