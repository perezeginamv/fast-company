import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavBar = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className=" nav-link" to="/">
                            Main
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className=" nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className=" nav-link" to="/users">
                            Users
                        </Link>
                    </li>
                </ul>
                <div className="d-flex">
                    <p>User</p>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
