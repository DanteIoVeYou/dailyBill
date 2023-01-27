import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import React from 'react';
import "./index.scss"
const { Header, Content, Footer, Sider } = Layout;
const MainLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { pathname } = useLocation();


    return (
        <div>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                    >
                        <Menu.Item key="/">
                            <Link to="/">个人主页</Link>
                        </Menu.Item>
                        <Menu.Item key="/record">
                            <Link to="/record">记录中心</Link>
                        </Menu.Item>
                        { 1===1 ? <Menu.Item key="/admin"><Link to="/admin">管理中心</Link></Menu.Item> : <></>}
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: '24px 16px 0',
                        }}
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
                            textAlign: 'center',
                        }}
                    >
                        dailybill ©2023 Created by Chemdim
                    </Footer>
                </Layout>
            </Layout>
        </div>

    );
};
export default MainLayout;