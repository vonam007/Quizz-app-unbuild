
import { useEffect, useState } from "react";

import ModalCreateUser from './ModalCreateUser';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

import './ManageUsers.scss';

// import TableUser from './TableUser';
import { getAllUsers, getUsersWithPaginate } from '../../../../services/apiService';
import TableUserPaginate from "./TableUserPaginate";


const ManageUsers = (props) => {

    const LIMIT_USER_PER_PAGE = 3;

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [listUser, setListUser] = useState([]);
    const [UserEdit, setUserEdit] = useState({});
    const [UserView, setUserView] = useState({});
    const [UserDelete, setUserDelete] = useState({});

    useEffect(() => {
        fetchListUsersWithPaginate(1);
        // fetchListUsers()
    }, []);
    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }
    const fetchListUsersWithPaginate = async (pageNum) => {
        let res = await getUsersWithPaginate(pageNum, LIMIT_USER_PER_PAGE);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickEditBtn = (user) => {
        setShowModalEdit(true);
        setUserEdit(user);
    }
    const handleClickViewBtn = (user) => {
        setShowModalView(true);
        setUserView(user);
    }
    const handleClickDeleteBtn = (user) => {
        setShowModalDelete(true);
        setUserDelete(user);
    }


    return (
        <div className="manage-users-container">
            {showModalCreate && <ModalCreateUser
                setShowModal={setShowModalCreate}
                fetchListUsers={fetchListUsers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            //fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            />}
            {showModalEdit && <ModalUpdateUser
                setShowModal={setShowModalEdit}
                UserEdit={UserEdit}
                fetchListUsers={fetchListUsers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            //fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            />}
            {showModalView && <ModalViewUser
                setShowModal={setShowModalView}
                user={UserView}
            />}
            {showModalDelete && <ModalDeleteUser
                setShowModal={setShowModalDelete}
                user={UserDelete}
                fetchListUsers={fetchListUsers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            //fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            />}

            <div className="title">
                <h1>Admin Manage Users</h1>
            </div>
            <div className="content">
                <button className="add-user-btn" onClick={() => setShowModalCreate(!showModalCreate)}>
                    Add A New User
                </button>
                <div>
                    {/* <TableUser
                        listUser={listUser}
                        handleClickEditBtn={handleClickEditBtn}
                        handleClickViewBtn={handleClickViewBtn}
                        handleClickDeleteBtn={handleClickDeleteBtn}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickEditBtn={handleClickEditBtn}
                        handleClickViewBtn={handleClickViewBtn}
                        handleClickDeleteBtn={handleClickDeleteBtn}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </div>
            </div>
        </div>
    );
}
export default ManageUsers;