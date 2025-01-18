import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src="https://api.dicebear.com/8.x/avataaars/svg?seed=Felix"
                    className="
                                                                                                     rounded-circle
                                                                                                     shadow-1-strong
                                                                                                     me-3
                                                                                                 "
                    alt="avatar"
                    width="40"
                    height="40"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? +"show" : "")}>
                <Link to={`/user/${currentUser._id}`} className="dropdown-item">
                    Profile
                </Link>
                <Link to="logout" className="dropdown-item">
                    Log Out
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
