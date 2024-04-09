import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import bgImg from '../../assets/bg2.jpg';

import { BiLogoReact } from "react-icons/bi";
import { GrDiamond } from "react-icons/gr";
import { RiDashboardFill } from "react-icons/ri";


const Sidebars = () => {
    return (

        <Sidebar className='sidebar-container' style={{ backgroundImage: `url(${bgImg})`, backgroundSize: `contain` }}>
            <div className='Sidebar-header'>
                <BiLogoReact style={{
                    color: '#64b4fa',
                    fontSize: '50px',
                    marginLeft: '1rem'
                }} />
                <h1 className='logo'>
                    NamVo
                </h1>
            </div>
            <Menu
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
                <SubMenu label="Dash Board" icon={<RiDashboardFill
                    style={{
                        color: '#000',
                        fontSize: '20px'
                    }}
                />}>
                </SubMenu>
                <SubMenu label="Feature" icon={<GrDiamond
                    style={{
                        color: '#000',
                        fontSize: '20px'
                    }}
                />}>
                    <MenuItem className="sub" component={<Link to="/calendar" />}>Quản lý Users</MenuItem>
                    <MenuItem className="sub" component={<Link to="/e-commerce" />}>Quản lý bài Quiz</MenuItem>
                    <MenuItem className="sub" component={<Link to="/e-commerce" />}>Quản lý câu hỏi</MenuItem>
                </SubMenu>

            </Menu>
        </Sidebar>

    );
}
export default Sidebars;