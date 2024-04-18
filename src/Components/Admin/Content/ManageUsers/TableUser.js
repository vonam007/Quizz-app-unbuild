// import { useEffect, useState } from "react";
import "./TableUser.scss";

const TableUser = (props) => {


    const { listUser } = props;
    return (
        <>
            <table className="table table-user ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser && listUser.length > 0 &&
                        listUser.map((user, index) => {
                            return (
                                <tr key={`table-user-${user.id}`}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="view-btn" onClick={() => props.handleClickViewBtn(user)}>View</button>
                                        <button className="edit-btn" onClick={() => props.handleClickEditBtn(user)}>Edit</button>
                                        <button className="delete-btn" onClick={() => props.handleClickDeleteBtn(user)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    {listUser && listUser.length === 0 && <tr><td colSpan="5" style={{ textAlign: "center" }}>Not Found Data</td></tr>}
                </tbody>
            </table>
        </>
    );

}
export default TableUser;