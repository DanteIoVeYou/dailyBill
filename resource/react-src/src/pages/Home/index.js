import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import useStore from '@/store';
import moment from 'moment';
import USER_SESSION_KEY from '@/utils/common';
import { Tabs } from 'antd';


const Home = () => {
    const ref = useRef();

    const { homeStore } = useStore();

    const tabs = [
        {
            label: "Pie",
            key: "pie"
        },
        {
            label: "Bar",
            key: "bar"
        }
    ];

    const changeChart = (key) => {
        if(key === "pie") {
            pieChartInit();
        } else if(key === "bar") {
            barChartInit();   
        }
    }
    
    const getMouthBill = async () => {
        const time = moment().format('YYYY-MM-DD').split('-');
        const year = time[0];
        const month = time[1];
        const userid = JSON.parse(sessionStorage.getItem(USER_SESSION_KEY)).userid;
        const resp = await homeStore.getMouthBill(userid, year, month);
        return resp;
    }

    const barChartInit = async () => {
        echarts.dispose(ref.current);
        const chart = echarts.init(ref.current);
        const data = await getMouthBill();
        let names = [];
        let values = [];
        for(let index = 0; index < data.length; index++) {
            names.push(data[index].name);
            values.push(data[index].value);
        }
        chart.setOption({
            title: {
                text: '当月花销'
            },
            xAxis: {
                data: names
            },
            yAxis: {
            },
            series: [
                {
                    type: 'bar',
                    data: values,
                    label: {
                        show: true
                    }
                }
            ]
        });
    }

    const pieChartInit = async () => {
        echarts.dispose(ref.current);
        const chart = echarts.init(ref.current);
        const data = await getMouthBill();
        chart.setOption({
            title: {
                text: '当月花销',
            },
            series: {
                type: 'pie',
                data: data,
                label: {
                    show: true,
                    formatter: (args) => {
                        return args.name + "\n金额：￥" + args.value + "\n占比：" + args.percent + "%";
                    }
                }
            }
        });
    }
    
    useEffect(() => {
        barChartInit();
    }, []);

    return (
        <div>
            <Tabs defaultActiveKey='bar' items={tabs} onTabClick={changeChart}/>
            <div ref={ref} style={{ width: "50vw", height: "50vh" }}></div>
            Home
        </div>
    );
};

export default Home;