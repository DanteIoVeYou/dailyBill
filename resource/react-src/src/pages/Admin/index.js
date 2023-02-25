import { useEffect, useState } from "react";
import useStore from "@/store";
import { Form, Input, Table, Modal, Button, FloatButton } from 'antd';
import { UserAddOutlined } from "@ant-design/icons";
import http from "@/utils/http";
import './index.scss';
import { paste } from "@testing-library/user-event/dist/paste";
const { Search } = Input;
const Admin = () => {

    const { adminStore } = useStore();
    const [userList, setUserList] = useState({
        list: []
    });
    const [query, setQuery] = useState({
        username: ""
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRepeatPassword, setNewRepeatPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");


    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '流水记录数',
            dataIndex: 'recordCount',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '上次登陆时间',
            dataIndex: 'lastLoginTime',
        },
        {
            title: '操作',
            key: 'action',
        },
    ];

    const onSearch = (value) => {
        setQuery({ username: value });
        console.log(value);
    };
    const openAddUserModal = () => {
        setOpen(true);
    }
    const submitUserInfo = (values) => {
        setLoading(true);
        setTimeout(async () => {
            console.log("add user");
            const resp = await adminStore.submitUserInfo(newUsername, newPassword, newEmail);
            setAddUser(!addUser);
            setLoading(false);
            setOpen(false);
        }, 3000);
    };
    const closeAddUserModal = () => {
        setOpen(false);
    };
    const onNewUsername = (value) => {
        setNewUsername(value.target.value);
    }
    const onNewPassword = (value) => {
        setNewPassword(value.target.value);
    }
    const onNewRepeatPassword = (value) => {
        setNewRepeatPassword(value.target.value);
    }
    const onNewEmail = (value) => {
        setNewEmail(value.target.value);
    }
    useEffect(() => {
        const loadUserList = async () => {
            const resp = await http.get("/user/userlist?username=" + query.username);
            console.log("data: ", resp.data);
            setUserList({ list: resp.data });
        }
        loadUserList();
    }, [query, addUser]);
    return (
        <div>
            <div>
                <FloatButton onClick={ openAddUserModal } icon={<UserAddOutlined />}/>
                <Modal
                    open={open}
                    title="Title"
                    onOk={submitUserInfo}
                    onCancel={closeAddUserModal}
                    footer={[
                        <Button key="back" onClick={closeAddUserModal}>
                            返回
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={submitUserInfo}>
                            提交
                        </Button>,
                    ]}
                >

                    <Form
                        name="basic"
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input onChange={onNewUsername} />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input onChange={onNewEmail} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password onChange={onNewPassword} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="repeatPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password again!',
                                },
                            ]}
                        >
                            <Input.Password onChange={onNewRepeatPassword} />
                        </Form.Item>

                    </Form>
                </Modal>
                <Search placeholder="输入用户名查找" onSearch={onSearch} enterButton />
            </div>
            {<Table columns={columns} dataSource={userList.list} />}
        </div>
    );
};
export default Admin;