import React, { useState } from "react";


const AddUserInfo = (props) => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (name === "" || age === "") {
            alert("Please fill all the fields");
            return;
        }
        else {
            props.handleAddUser({ ...{ name: name, age: age } });
            setName("");
            setAge("");
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <label htmlFor="name">Your Name: </label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="age">Your age: </label>
                <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} />


                <button>Submit</button>
            </form>
        </>
    );
}

export default AddUserInfo;