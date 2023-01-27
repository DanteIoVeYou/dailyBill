import React from 'react';
import "./index.scss"
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import useStore from '@/store';
import ResponseStatus from '@/utils/status.Response';

const Login = () => {
    const naviagte = useNavigate();
    const { loginStore } = useStore();

    const onFinish = async (values) => {
        const { username, password } = values;
        const resp = await loginStore.login({
            username, password
        });
        if (resp.status === ResponseStatus.INVALID_LOGIN) {
            naviagte("/login", { replace: true });
        } else if (resp.status === ResponseStatus.VALID_LOGIN) {
            naviagte("/", { replace: true });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
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

        </div>
    );
};
export default Login;