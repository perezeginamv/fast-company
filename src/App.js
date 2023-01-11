import React, { useState } from "react";
import Users from "./components/users";

import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers(users.filter((item) => item._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                updateStatus={handleToggleBookMark}
            />
        </>
    );
}

export default App;
