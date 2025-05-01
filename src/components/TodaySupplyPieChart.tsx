import {useEffect, useState} from "react";
import {Pie} from "react-chartjs-2";
import axios from "axios";
import AxiosInstance from "@/config/AxiosInstance";

const TodaySupplyPieChart = () => {
    const [datas,setDatas] = useState([]);

    useEffect(()=>{
        getChartData();
    },[]);

    const getChartData = async () =>{
        const formattedDate = new Date();
        formattedDate.setHours(0, 0, 0, 0);
        const today = formattedDate.toISOString().slice(0, 10);
        try {
            const response = await AxiosInstance.get(`/suppliers/find-By-date/${today}`);
            setDatas(response.data);
        }catch (e) {
            console.log(e)
        }
    }

    const calculateDailyTotals = (data) => {
        return data.reduce((acc, supplier) => {
            const date = supplier.date.slice(0, 10);
            acc[date] = (acc[date] || 0) + supplier.totalPrice;
            return acc;
        }, {});
    };

    const orderLabels = Object.keys(calculateDailyTotals);
    const orderData = Object.values(calculateDailyTotals);

    const data={
        labels: orderLabels,
        datasets: [
            {
                data: orderData,
                fill:false,
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
    }

    const options={
        type: "doughnut",
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }
    return(
        <>
            <div className="w-5/12 h-5/12">
                <div className="text-center text-bg-primary">Expense</div>
                <Pie
                    options={options}
                    data={data}
                />
            </div>
        </>
    );
}
export default TodaySupplyPieChart;
