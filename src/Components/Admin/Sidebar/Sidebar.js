import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import bgImg from '../../../assets/bg2.jpg';

import { BiLogoReact } from "react-icons/bi";
import { GrDiamond } from "react-icons/gr";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react';


const Sidebars = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (

        <Sidebar collapsed={isCollapsed} className='sidebar-container' style={{ backgroundImage: `url(${bgImg})`, backgroundSize: `contain` }}>
            <div className='collapseMenuBtn'>
                <AiOutlineMenu className='btn' onClick={() => setIsCollapsed(!isCollapsed)} />
            </div>
            <Link to={"/"} className='Sidebar-header'>
                <BiLogoReact style={{
                    color: '#64b4fa',
                    fontSize: '60px',
                    marginLeft: '8px',
                }} />
                {!isCollapsed &&
                    <h1 className='logo'>
                        NamVo
                    </h1>
                }

            </Link>
            <Menu
                closeOnClick={true}
                menuItemStyles={{
                    button: {
                        // the active class will be added automatically by react router
                        // so we can use it to style the active menu item
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        },
                    },
                }}
            >
                <MenuItem icon={<RiDashboardFill
                    style={{
                        color: '#000',
                        fontSize: '20px'
                    }} />}
                    component={<Link to="/admins" />}>Dash Board
                </MenuItem>
                <SubMenu label="Feature" icon={<GrDiamond
                    style={{
                        color: '#000',
                        fontSize: '20px'
                    }}

                />}>
                    <MenuItem className="sub" component={<Link to="/admins/manageUsers" />}>Quản lý Users</MenuItem>
                    <MenuItem className="sub" component={<Link to="/admins/manageQuizzes" />}>Quản lý bài Quiz</MenuItem>
                    <MenuItem className="sub" component={<Link to="/admins/manageQuestions" />}>Quản lý câu hỏi</MenuItem>
                </SubMenu>

            </Menu>
        </Sidebar >

    );
}
export default Sidebars;