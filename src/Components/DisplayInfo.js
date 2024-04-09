import React, { useEffect, useState } from "react";
import "./DisplayInfo.scss";

// class DisplayInfo extends React.Component {


//     render() {
//         let { listUsers } = this.props;
//         return (
//             <div className="DisplayInfo-container">

//                 {true &&
//                     listUsers.map((user) => {
//                         return (
//                             <div key={user.id} className={+user.age > 18 ? "red" : "green"}>
//                                 <div>
//                                     My name is {user.name}
//                                 </div>
//                                 <div>
//                                     My age is {user.age}
//                                 </div>
//                                 <button onClick={() => this.props.handleDeleteUser(user)}>Delete</button>
//                                 <hr></hr>
//                             </div>
//                         );
//                     })
//                 }


//             </div>
//         );
//     }
// }

const DisplayInfo = (props) => {

    const { listUsers } = props;

    const [isShowListUsers, setShowListUsers] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            if (listUsers.length === 0) {
                alert("No user found");
            }
        }, 100);
    }, [listUsers]);


    const handleShowHide = () => {
        setShowListUsers(!isShowListUsers);
    }
    return (
        <div className="DisplayInfo-container">
            <div>
                <span onClick={() => handleShowHide()}>{isShowListUsers ? "Hide list users" : "Show list users"}</span>
            </div>
            {isShowListUsers &&
                listUsers.map((user) => {
                    return (
                        <div key={user.id} className={+user.age > 18 ? "red" : "green"}>
                            <div>
                                My name is {user.name}
                            </div>
                            <div>
                                My age is {user.age}
                            </div>
                            <button onClick={() => props.handleDeleteUser(user)}>Delete</button>
                            <hr></hr>
                        </div>
                    );
                })
            }
        </div>
    );

}

export default DisplayInfo;