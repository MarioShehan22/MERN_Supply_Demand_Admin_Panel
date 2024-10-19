import {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {defaults} from "chart.js/auto";
import AxiosInstance from "@/config/AxiosInstance";

defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const Expense = () => {
    const [datas,setDatas] = useState([]);
    const [select,setSelect] = useState('last7Days');

    useEffect(()=>{
        getChartData();
    },[select]);
    const getChartData = async () =>{
        try {
            const response = await AxiosInstance.get('/suppliers/find-supply-by-date/'+select);
            setDatas(response.data);
        }catch (e) {
            console.log(e)
        }
    }

    const dailyTotalCost = datas.reduce((acc, suplly) => {
        const date = suplly.date.slice(0, 10); // Extract date only (YYYY-MM-DD)
        acc[date] = (acc[date] || 0) + suplly.totalPrice;
        return acc;
    }, {});

    const orderLabels = Object.keys(dailyTotalCost);
    const orderData = Object.values(dailyTotalCost);

    const data={
        labels:orderLabels,
        datasets:[
            {
                label:'data',
                data:orderData,
                fill:false
            }
        ]
    }

    const options={
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }
    const handleClick=(e)=>{
        setSelect(e.target.value);
    }
    return(
        <>
            <div className="w-5/12 h-5/12">
                <div className="text-center text-bg-primary">Expense</div>
                <Line
                    options={options}
                    data={data}
                />
                <form id="dateFilterForm">
                    <select id="dateFilterSelect" onClick={handleClick}>
                        <option value="today">Today</option>
                        <option value="last7Days">Last 7 Days</option>
                        <option value="thirtyDaysAgo">Last 30 Days</option>
                        <option value="lastYear">Last Year</option>
                    </select>
                </form>
            </div>
        </>
    );
}
export default Expense;
