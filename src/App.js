import React, { useState, useEffect } from "react";
import Users from "./components/users";

import api from "./api";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((date) => setUsers(date));
    }, []);

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
        <div>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    updateStatus={handleToggleBookMark}
                />
            )}
        </div>
    );
}

export default App;
