// import { useEffect, useState } from "react";
import { useEffect } from "react";
import "./TableUser.scss";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
    const { listUser, pageCount, currentPage, fetchListUsersWithPaginate } = props;

    const handlePageClick = (event) => {
        props.setCurrentPage(+event.selected + 1);
    };



    useEffect(() => {
        const refreshTable = async (currentPage) => {
            await fetchListUsersWithPaginate(currentPage);
        }
        refreshTable(currentPage);
    }, [currentPage, fetchListUsersWithPaginate])


    return (
        <>
            <table className="table-user-paginate table" >
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
            <div className="tablePagination">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>

        </>
    );

}
export default TableUserPaginate;