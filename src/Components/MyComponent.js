import React, { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";


const MyComponent = () => {



    const listUsers = [
        {
            id: 1,
            name: "John",
            age: 25
        },
        {
            id: 2,
            name: "Nanacy",
            age: 22
        },
        {
            id: 3,
            name: "Doe",
            age: 16
        }
    ]

    const [users, setUsers] = useState(listUsers);
    const handleAddUser = (user) => {
        user.id = Math.floor(Math.random() * 1000);
        setUsers([user, ...users]);
    }

    const handleDeleteUser = (user) => {
        setUsers(users.filter((u) => u.id !== user.id));

    }

    // componentDidMount() {
    //     document.title = "Hello It's MyComponent";
    // }

    return (
        <>
            <AddUserInfo
                handleAddUser={handleAddUser}
            />
            <br />
            <DisplayInfo
                listUsers={users}
                handleDeleteUser={handleDeleteUser}
            />
        </>
    );

}

export default MyComponent;