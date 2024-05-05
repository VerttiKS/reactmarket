// Users.jsx
import React from "react";
import UsersList from "../components/UserList";

const DUMMY_USERS = [
    {
        id: 'asdsad',
        name: 'John Smith',
        email: 'john@smith.com',
        admin: true
    }, {
        id: 'fdgfdgfd',
        name: 'John Wick',
        email: 'john@wick.com',
        admin: false
    }, {
        id: 'nbvvbnbv',
        name: 'Tony Stark',
        email: 'tony@stark.com',
        admin: true
    }
];

const Users = () => {
    return <UsersList items={DUMMY_USERS} />;
};

export default Users;