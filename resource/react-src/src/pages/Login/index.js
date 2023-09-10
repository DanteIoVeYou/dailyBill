import React, { useState } from 'react';
import "./index.scss"
import { Button, Form, Input, Alert, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import useStore from '@/store';
import ResponseStatus from '@/utils/status.Response';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import USER_SESSION_KEY from '@/utils/common';


const Login = () => {
    const [loginError, setLoginError] = useState(0);

    const naviagte = useNavigate();

    const { loginStore } = useStore();

    const onFinish = async (values) => {
        const { username, password } = values;
        const resp = await loginStore.login({
            username, password
        });
        if (resp.status === ResponseStatus.INVALID_LOGIN) {
            setLoginError(1);
            naviagte("/login", { replace: true });
        } else if (resp.status === ResponseStatus.VALID_LOGIN) {
            setLoginError(0);
            sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(resp.data));
            naviagte("/", { replace: true });
        } else if(resp.status === ResponseStatus.INVALID_ILLEGAL_USER_STATUS) {
            setLoginError(2);
            naviagte("/login", { replace: true });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login'>
            {loginError === 1 ? <Alert type='error' message='username or password wrong' banner/> : <div></div>}
            {loginError === 2 ? <Alert type='error' message='invalid user status, please contact with admin' banner/> : <div></div>}
            <div className='login-container'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" size="large" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {/* <Row>
                <Col
                    md={{
                        span:8,
                        push:8
                    }} 
                    xs={{
                        span:22,
                        push:1
                    }}
                >
            <Card title="dailyBill">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" size="large" block style={{width: "20vw"}}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
                </Col>
            </Row> */}

        </div>
    );
};
export default Login;