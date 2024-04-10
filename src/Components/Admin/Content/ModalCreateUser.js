import './ModalCreateUser.scss';

const Modal = (props) => {

    return (
        <>
            <div className='overlay' onClick={() => props.setShowModal(false)}> </div>
            <div className="modal">
                <div className="modal-header">
                    <h2>Add New User</h2>
                </div>
                <div className="modal-content">
                    {/* form: email, password, username, role (ADMIN/USER), image */}
                    <form>
                        <div className="form-group">
                            <div className='group'>

                                <label>Email</label>
                                <input type="email" />
                            </div>
                            <div className='group'>

                                <label>Password</label>
                                <input type="password" />
                            </div>

                        </div>
                        <div className="form-group">
                            <div className='group'>

                                <label>Username</label>
                                <input type="text" />
                            </div>
                            <div className='group'>
                                <label>Role</label>
                                <br />
                                <select>
                                    <option Value={"USER"} >USER</option>
                                    {/* <option value={"ADMIN"}>ADMIN</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" className='inputImg' />
                        </div>
                    </form>

                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => props.setShowModal(false)}>Close</button>
                    <button className="btn-save" onClick={() => props.setShowModal(false)}>Save</button>

                </div>
            </div>
        </>
    )
}
export default Modal;