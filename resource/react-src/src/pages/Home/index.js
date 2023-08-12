import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import useStore from '@/store';
import moment from 'moment';
import USER_SESSION_KEY from '@/utils/common';


const Home = () => {
    const ref = useRef();
    const { homeStore } = useStore();
    const getMouthBill = async () => {
        const time = moment().format('YYYY-MM-DD').split('-');
        const year = time[0];
        const month = time[1];
        const userid = JSON.parse(sessionStorage.getItem(USER_SESSION_KEY)).userid;
        const resp = await homeStore.getMouthBill(userid, year, month);
        return resp;
    }

    const chartInit = async () => {
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
        chartInit();
    }, []);
    return (
        <div>
            <div ref={ref} style={{ width: "600px", height: "400px" }}></div>
            Home
        </div>
    );
};

export default Home;