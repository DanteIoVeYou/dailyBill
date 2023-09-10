import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button, FloatButton, Layout, Menu, theme } from 'antd';
import React from 'react';
import "./index.scss"
import { AccountBookFilled, AccountBookOutlined, AccountBookTwoTone, HomeFilled, HomeOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import USER_SESSION_KEY from "@/utils/common";
import logo from "../../assets/bill.png" 

const { Header, Content, Footer, Sider } = Layout;
const MainLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { pathname } = useLocation();

    const naviagte = useNavigate();

    const logout = ()=>{
        sessionStorage.removeItem(USER_SESSION_KEY);
        naviagte("/login", {replace: true});
    };
    

    return (
        <div>
            <Layout style={{width: '100vw', height: '100vh'}}>
                <Sider
                    // breakpoint="lg"
                    // collapsedWidth="0"
                    style={{width: 200}}
                >
                    <div>
                        <img src={logo} className="logo"/>
                    </div>
                    <Menu
                        // theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                    >
                        <Menu.Item key="/" icon={<HomeOutlined />}>
                            <Link to="/">个人主页</Link>
                        </Menu.Item>
                        <Menu.Item key="/record" icon={<AccountBookOutlined />}>
                            <Link to="/record">记录中心</Link>
                        </Menu.Item>
                        { JSON.parse(sessionStorage.getItem(USER_SESSION_KEY)) !==null ? (JSON.parse(sessionStorage.getItem(USER_SESSION_KEY)).isAdmin===1 ? <Menu.Item key="/admin" icon={<UserOutlined />}><Link to="/admin">管理中心</Link></Menu.Item> : <></>) : (console.log("user not set"))}
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                        }}
                    >
                        {/* <span style={{fontSize: '30px', fontWeight: 'bold', paddingLeft: '2rem'}}>dailyBill</span> */}
                        <span>
                            <Button type="text" icon={<PoweroffOutlined />} onClick={logout} style={{float: 'right', height: '100%', marginRight: '0.3em'}}>logout</Button>
                        </span>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                        }}
                        className="layout-content"
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet />
                            content
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        dailyBill ©2023 Chemdim. All rights reserved.
                    </Footer>
                </Layout>
            </Layout>
            <FloatButton.BackTop />
        </div>

    );
};
export default MainLayout;