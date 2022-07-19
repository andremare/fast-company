import React, { useState } from "react";
import api from "./api";
import "bootstrap/dist/css/bootstrap.css";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";
import user from "./components/user";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleToggleBookmark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    return (
        <div>
            <SearchStatus length={users.length} />
            <Users
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
                users={users}
            />
        </div>
    );
};

export default App;
