import { useEffect, useState } from "react";
//import "./TableUser.scss"; //using the same css file as TableUserPaginate.js


const TableQuiz = (props) => {

    const { listQuiz } = props;

    return (
        <>
            <table className="table table-quiz ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Difficulty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 && listQuiz.map((quiz, index) => {
                        return (
                            <tr key={`quiz-row-${index}`}>
                                <td>{quiz.id}</td>
                                <td>{quiz.name}</td>
                                <td>{quiz.description}</td>
                                <td>{quiz.difficulty}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => props.handleClickEditBtn(quiz)}>Edit</button>
                                    <button className="delete-btn" onClick={() => props.handleClickDeleteBtn(quiz)}>Delete</button>
                                </td>
                            </tr>
                        );

                    }
                    )}

                    {(!listQuiz || listQuiz?.length === 0) && <tr><td colSpan="5" style={{ textAlign: "center" }}>Not Found Data</td></tr>}
                </tbody>
            </table>
        </>
    );

}
export default TableQuiz;