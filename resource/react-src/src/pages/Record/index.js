import { Table, Input, Form, Select, Space, Modal, Button, Radio, Tag, message, DatePicker } from "antd";
import { useEffect, useState } from "react";
import useStore from "@/store";
import './index.scss'
const Record = () => {

    const { recordStore } = useStore();

    const { RangePicker } = DatePicker;

    const columns = [
        {
            title: 'recordid',
            dataIndex: 'recordid',
            className: 'columnHidden'
        },
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
            render: data => formatIncomeExpense(data)
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => recordAction(record)
        },
    ];
    const [billList, setBillList] = useState([]);

    const [queryBill, setQueryBill] = useState({
        item: "",
        category: "",
        paymentMethod: "",
        incomeExpense: "all",
        startDate: "",
        endDate: ""
    });

    const [newBill, setNewBill] = useState({
        item: "",
        category: "",
        paymentMethod: "",
        amount: 0,
        incomeExpense: "out"
    });

    const [oldBill, setOldBill] = useState({
        recordid: 0,
        item: "",
        category: "",
        paymentMethod: "",
        amount: 0,
        incomeExpense: "out"
    });

    const [refreshPage, setRefreshPage] = useState(false);

    const [open, setOpen] = useState(false);

    const [oldOpen, setOldOpen] = useState(false);

    const [loading, setLoading] = useState(false);

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
        console.log("oldopen: ", oldOpen);
        console.log("open: ", open);
    }, [refreshPage]);

    const formatIncomeExpense = (data) => {
        const type = {
            in: <Tag color="green">收入</Tag>,
            out: <Tag color="#f50">支出</Tag>
        };
        return type[data];
    }

    const showDeleteInfo = () => {
        message.info("删除记录成功");
    };

    const showModifyInfo = () => {
        message.info("修改记录成功");
    };

    const recordAction = (record) => {
        return (
            <div>
                <Button type="text" onClick={() => openOldBillModal(record)}>修改</Button>
                <Button type="text" onClick={() => deleteBillInfo(record.recordid)}>删除</Button>
            </div>
        );
    }

    const onFilterBill = async () => {
        console.log("filter: ", queryBill);
        const item = queryBill.item;
        const category = queryBill.category;
        const paymentMethod = queryBill.paymentMethod;
        const incomeExpense = queryBill.incomeExpense;
        const startDate = queryBill.startDate;
        const endDate = queryBill.endDate;
        const resp = await recordStore.getBillList(item, category, paymentMethod, incomeExpense, startDate, endDate);
        setRefreshPage(!refreshPage);
    }

    const onQueryItem = (value) => {
        setQueryBill({
            item: value.target.value,
            category: queryBill.category,
            paymentMethod: queryBill.paymentMethod,
            incomeExpense: queryBill.incomeExpense,
            startDate: queryBill.startDate,
            endDate: queryBill.endDate,
        });
    }

    const onQueryCategory = (value) => {
        setQueryBill({
            item: queryBill.item,
            category: value,
            paymentMethod: queryBill.paymentMethod,
            incomeExpense: queryBill.incomeExpense,
            startDate: queryBill.startDate,
            endDate: queryBill.endDate,
        });
    }

    const onQueryPaymentMethod = (value) => {
        setQueryBill({
            item: queryBill.item,
            category: queryBill.category,
            paymentMethod: value,
            incomeExpense: queryBill.incomeExpense,
            startDate: queryBill.startDate,
            endDate: queryBill.endDate,
        });
        console.log("payment: ", value);
    }

    const onQueryIncomeExpense = (value) => {
        setQueryBill({
            item: queryBill.item,
            category: queryBill.category,
            paymentMethod: queryBill.paymentMethod,
            incomeExpense: value.target.value,
            startDate: queryBill.startDate,
            endDate: queryBill.endDate,
        });
        console.log("inout: ", queryBill);
    }

    const onQueryDateRange = (value) => {
        setQueryBill({
            item: queryBill.item,
            category: queryBill.category,
            paymentMethod: queryBill.paymentMethod,
            incomeExpense: queryBill.incomeExpense,
            startDate: value[0].format("YYYY-MM-DD"),
            endDate: value[1].format("YYYY-MM-DD"),
        });
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

    const onOldItem = (value) => {
        setOldBill({
            recordid: oldBill.recordid,
            item: value.target.value,
            category: oldBill.category,
            paymentMethod: oldBill.paymentMethod,
            amount: oldBill.amount,
            incomeExpense: oldBill.incomeExpense
        });
    }

    const onOldCategory = (value) => {
        setOldBill({
            recordid: oldBill.recordid,
            item: oldBill.item,
            category: value,
            paymentMethod: oldBill.paymentMethod,
            amount: oldBill.amount,
            incomeExpense: oldBill.incomeExpense
        });
    }

    const onOldPaymentMethod = (value) => {
        setOldBill({
            recordid: oldBill.recordid,
            item: oldBill.item,
            category: oldBill.category,
            paymentMethod: value,
            amount: oldBill.amount,
            incomeExpense: oldBill.incomeExpense
        });
    }

    const onOldAmount = (value) => {
        setOldBill({
            recordid: oldBill.recordid,
            item: oldBill.item,
            category: oldBill.category,
            paymentMethod: oldBill.paymentMethod,
            amount: value.target.value,
            incomeExpense: oldBill.incomeExpense
        });
    }

    const onOldIncomeExpense = (value) => {
        setOldBill({
            recordid: oldBill.recordid,
            item: oldBill.item,
            category: oldBill.category,
            paymentMethod: oldBill.paymentMethod,
            incomeExpense: value.target.value
        });
    }

    const submitBillInfo = () => {
        setLoading(true);
        setTimeout(async () => {
            const item = newBill.item;
            const category = newBill.category;
            const paymentMethod = newBill.paymentMethod;
            const amount = newBill.amount;
            const incomeExpense = newBill.incomeExpense;
            const resp = await recordStore.submitBillInfo(item, category, paymentMethod, amount, incomeExpense);
            setRefreshPage(!refreshPage);
            setLoading(false);
            setOpen(false);
        }, 3000);
    }

    const submitOldBillInfo = () => {
        setLoading(true);
        setTimeout(async () => {
            const recordid = oldBill.recordid;
            const item = oldBill.item;
            const category = oldBill.category;
            const paymentMethod = oldBill.paymentMethod;
            const amount = oldBill.amount;
            const incomeExpense = oldBill.incomeExpense;
            const resp = await recordStore.submitOldBillInfo(recordid, item, category, paymentMethod, amount, incomeExpense);
            setRefreshPage(!refreshPage);
            setLoading(false);
            setOldOpen(false);
        }, 3000);
    }

    const deleteBillInfo = async (recordid) => {
        const resp = await recordStore.deleteBillInfo(recordid);
        console.log(resp);
        setRefreshPage(!refreshPage);
        showDeleteInfo();
    }

    const openAddBillModal = () => {
        setOpen(true);
    }

    const closeAddBillModal = () => {
        setOpen(false);
    }

    const openOldBillModal = (record) => {
        setOldOpen(true);
        setOldBill({
            recordid: record.recordid,
            item: record.item,
            category: record.category,
            paymentMethod: record.paymentMethod,
            amount: record.amount,
            incomeExpense: record.incomeExpense,
        });
    }

    const closeOldBillModal = () => {
        setOldOpen(false);
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
                    <RangePicker onChange={onQueryDateRange}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block onClick={onFilterBill}>
                        筛选
                    </Button>
                </Form.Item>
            </Form>
            {<Table columns={columns} dataSource={billList} />}
            <Modal
                open={oldOpen}
                title="Title"
                onOk={submitOldBillInfo}
                onCancel={closeOldBillModal}
                footer={[
                    <Button key="back" onClick={closeOldBillModal}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={submitOldBillInfo}>
                        提交
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item
                        label="记录名"
                        name="oldItem"
                        rules={[{ required: true, message: 'Please input your item!' }]}
                    >
                        <Space wrap>
                            <Input value={oldBill.item} onChange={onOldItem} />

                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="类型"
                        name="oldCategory"
                        rules={[{ required: true, message: '请选择类型' }]}
                    >
                        <Space wrap>
                            <Select
                                value={oldBill.category}
                                style={{ width: 120 }}
                                onChange={onOldCategory}
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
                        name="oldPaymentMethod"
                        rules={[{ required: true, message: '请选择支付方式' }]}
                    >
                        <Space wrap>
                            <Select
                                value={oldBill.paymentMethod}
                                style={{ width: 120 }}
                                onChange={onOldPaymentMethod}
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
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label="金额"
                        name="oldAmount"
                        rules={[{ required: true, message: '请填写金额' }]}
                    >
                        <Space wrap>
                            <Input value={oldBill.amount} onChange={onOldAmount}></Input>
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label="收支选择"
                        name="oldIncomeExpense"
                    >
                        <Space wrap>
                            <Radio.Group onChange={onOldIncomeExpense} value={oldBill.incomeExpense}>
                                <Radio value="in" >收入</Radio>
                                <Radio value="out" >支出</Radio>
                            </Radio.Group>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            Record
        </div>
    )
};
export default Record;