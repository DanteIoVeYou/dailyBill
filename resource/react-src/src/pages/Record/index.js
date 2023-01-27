import { Table, Input, Form, Select, Space, Modal, Button, Radio } from "antd";
import { useEffect, useState } from "react";
import useStore from "@/store";
const Record = () => {
    const { recordStore } = useStore();
    const columns = [
        {
            title: '时间',
            dataIndex: 'payDate',
        },
        {
            title: '流水名',
            dataIndex: 'item',
        },
        {
            title: '金额',
            dataIndex: 'amount',
        },
        {
            title: '分类',
            dataIndex: 'category',
        },
        {
            title: '支付方式',
            dataIndex: 'paymentMethod',
        },
        {
            title: '收支',
            dataIndex: 'incomeExpense',
        },
        {
            title: '操作',
            key: 'action',
        },
    ];
    const [billList, setBillList] = useState([]);
    const [queryBill, setQueryBill] = useState({
        item: "",
        category: "",
        paymentMethod: "",
        incomeExpense: "all"
    });
    const [newBill, setNewBill] = useState({
        item: "",
        category: "",
        paymentMethod: "",
        amount: 0,
        incomeExpense: "out"
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addBill, setAddBill] = useState(false);

    useEffect(() => {
        const loadBillList = async () => {
            const item = queryBill.item;
            const category = queryBill.category;
            const paymentMethod = queryBill.paymentMethod;
            const incomeExpense = queryBill.incomeExpense;
            const resp = await recordStore.getBillList(item, category, paymentMethod, incomeExpense);
            setBillList(resp.data);
        }
        loadBillList();
    }, [addBill]);


    const onFilterBill = async () => {
        console.log("filter: ", queryBill);
        const item = queryBill.item;
        const category = queryBill.category;
        const paymentMethod = queryBill.paymentMethod;
        const incomeExpense = queryBill.incomeExpense;
        const resp = await recordStore.getBillList(item, category, paymentMethod, incomeExpense);
        setAddBill(!addBill);
    }

    const onQueryItem = (value) => {
        setQueryBill({
            item: value.target.value,
            category: queryBill.category,
            paymentMethod: queryBill.paymentMethod,
            incomeExpense: queryBill.incomeExpense
        });
    }

    const onQueryCategory = (value) => {
        setQueryBill({
            item: queryBill.item,
            category: value,
            paymentMethod: queryBill.paymentMethod,
            incomeExpense: queryBill.incomeExpense
        });
    }

    const onQueryPaymentMethod = (value) => {
        setQueryBill({
            item: queryBill.item,
            category: queryBill.category,
            paymentMethod: value,
            incomeExpense: queryBill.incomeExpense
        });
        console.log("payment: ", value);
    }

    const onQueryIncomeExpense = (value) => {
        setQueryBill({
            item: queryBill.item,
            category: queryBill.category,
            paymentMethod: queryBill.paymentMethod,
            incomeExpense: value
        });
        console.log("inout: ", value);
    }

    const onNewItem = (value) => {
        setNewBill({
            item: value.target.value,
            category: newBill.category,
            paymentMethod: newBill.paymentMethod,
            amount: newBill.amount,
            incomeExpense: newBill.incomeExpense
        });
    }

    const onNewCategory = (value) => {
        setNewBill({
            item: newBill.item,
            category: value,
            paymentMethod: newBill.paymentMethod,
            amount: newBill.amount,
            incomeExpense: newBill.incomeExpense
        });
    }

    const onNewPaymentMethod = (value) => {
        setNewBill({
            item: newBill.item,
            category: newBill.category,
            paymentMethod: value,
            amount: newBill.amount,
            incomeExpense: newBill.incomeExpense
        });
    }

    const onNewAmount = (value) => {
        console.log("amt: ", value);
        setNewBill({
            item: newBill.item,
            category: newBill.category,
            paymentMethod: newBill.paymentMethod,
            amount: value.target.value,
            incomeExpense: newBill.incomeExpense
        });
    }
    const onNewIncomeExpense = (value) => {
        setNewBill({
            item: newBill.item,
            category: newBill.category,
            paymentMethod: newBill.paymentMethod,
            incomeExpense: value.target.value
        });
    }
    const submitBillInfo = () => {
        console.log("vvv: ", newBill);
        setLoading(true);
        setTimeout(async () => {
            const item = newBill.item;
            const category = newBill.category;
            const paymentMethod = newBill.paymentMethod;
            const amount = newBill.amount;
            const incomeExpense = newBill.incomeExpense;
            const resp = await recordStore.submitBillInfo(item, category, paymentMethod, amount, incomeExpense);
            setAddBill(!addBill);
            setLoading(false);
            setOpen(false);
        }, 3000);
    }

    const openAddBillModal = () => {
        setOpen(true);
    }

    const closeAddBillModal = () => {
        setOpen(false);
    }


    return (

        <div>
            <Button type="primary" onClick={openAddBillModal}>添加记录</Button>
            <Modal
                open={open}
                title="Title"
                onOk={submitBillInfo}
                onCancel={closeAddBillModal}
                footer={[
                    <Button key="back" onClick={closeAddBillModal}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={submitBillInfo}>
                        提交
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item
                        label="记录名"
                        name="newItem"
                        rules={[{ required: true, message: 'Please input your item!' }]}
                    >
                        <Input onChange={onNewItem} />
                    </Form.Item>

                    <Form.Item
                        label="类型"
                        name="newCategory"
                        rules={[{ required: true, message: '请选择类型' }]}
                    >
                        <Space wrap>
                            <Select
                                defaultValue=""
                                style={{ width: 120 }}
                                onChange={onNewCategory}
                                options={[
                                    { value: '' },
                                    { value: '餐饮美食' },
                                    { value: '服饰装扮' },
                                    { value: '日用百货' },
                                    { value: '家具家装' },
                                    { value: '数码电器' },
                                    { value: '户外运动' },
                                    { value: '美容美发' },
                                    { value: '母婴亲子' },
                                    { value: '宠物' },
                                    { value: '公交出行' },
                                    { value: '爱车养车' },
                                    { value: '住房物业' },
                                    { value: '酒店旅游' },
                                    { value: '文化休闲' },
                                    { value: '医疗健康' },
                                    { value: '公益' },
                                    { value: '投资理财' },
                                    { value: '保险' },
                                    { value: '借贷' },
                                    { value: '缴费充值' },
                                    { value: '红包' },
                                    { value: '转账' },
                                    { value: '账户存取' },
                                ]}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label="支付方式"
                        name="newPaymentMethod"
                        rules={[{ required: true, message: '请选择支付方式' }]}
                    >
                        <Select
                            defaultValue=""
                            style={{ width: 120 }}
                            onChange={onNewPaymentMethod}
                            options={[
                                { value: '' },
                                { value: '现金' },
                                { value: '数字人民币' },
                                { value: '微信' },
                                { value: '支付宝' },
                                { value: '借记卡' },
                                { value: '信用卡' },
                                { value: '花呗白条' },
                                { value: '加密货币' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="金额"
                        name="newAmount"
                        rules={[{ required: true, message: '请填写金额' }]}
                    >
                        <Input onChange={onNewAmount}></Input>

                    </Form.Item>
                    <Form.Item
                        label="收支选择"
                        name="newIncomeExpense"
                    >
                        <Radio.Group onChange={onNewIncomeExpense} defaultValue="out" value={newBill.incomeExpense}>
                            <Radio value="in" >收入</Radio>
                            <Radio value="out" >支出</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
            <Form
                name="filterBill"
                onFinish={onFilterBill}
                autoComplete="off"
            >
                <Form.Item
                    label="记录名"
                    name="item"
                    rules={[{ required: false, message: 'Please input your item!' }]}
                >
                    <Input onChange={onQueryItem} />
                </Form.Item>

                <Form.Item
                    label="分类"
                    name="category"
                    rules={[{ required: false, message: 'Please choose your category!' }]}
                >
                    <Select
                        defaultValue=""
                        style={{ width: 120 }}
                        onChange={onQueryCategory}
                        options={[
                            { value: '餐饮美食' },
                            { value: '服饰装扮' },
                            { value: '日用百货' },
                            { value: '家具家装' },
                            { value: '数码电器' },
                            { value: '户外运动' },
                            { value: '美容美发' },
                            { value: '母婴亲子' },
                            { value: '宠物' },
                            { value: '公交出行' },
                            { value: '爱车养车' },
                            { value: '住房物业' },
                            { value: '酒店旅游' },
                            { value: '文化休闲' },
                            { value: '医疗健康' },
                            { value: '公益' },
                            { value: '投资理财' },
                            { value: '保险' },
                            { value: '借贷' },
                            { value: '缴费充值' },
                            { value: '红包' },
                            { value: '转账' },
                            { value: '账户存取' },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="支付方式"
                    name="paymentMethod"
                    rules={[{ required: false, message: 'Please input your item!' }]}
                >
                    <Select
                        defaultValue=""
                        style={{ width: 120 }}
                        onChange={onQueryPaymentMethod}
                        options={[
                            { value: '现金' },
                            { value: '数字人民币' },
                            { value: '微信' },
                            { value: '支付宝' },
                            { value: '借记卡' },
                            { value: '信用卡' },
                            { value: '花呗白条' },
                            { value: '加密货币' },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="收支选择"
                    name="incomeExpense"
                >
                    <Radio.Group onChange={onQueryIncomeExpense} defaultValue="all" value={queryBill.incomeExpense}>
                        <Radio value="in" >收入</Radio>
                        <Radio value="out" >支出</Radio>
                        <Radio value="all" >所有</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block onClick={onFilterBill}>
                        筛选
                    </Button>
                </Form.Item>
            </Form>
            {<Table columns={columns} dataSource={billList} />}
            Record
        </div>
    )
};
export default Record;