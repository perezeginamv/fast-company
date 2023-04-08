import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";
const Users = () => {
    const params = useParams();
    const { usersId } = params;
    console.log(params);
    return <>{usersId ? <UserPage userId={usersId} /> : <UsersList />}</>;
};

export default Users;
