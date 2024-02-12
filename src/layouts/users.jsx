import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
const Users = () => {
    const params = useParams();
    const { usersId } = params;
    return <>{usersId ? <UserPage userId={usersId} /> : <UsersListPage />}</>;
};

export default Users;
