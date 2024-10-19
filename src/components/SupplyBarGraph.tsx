import {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {defaults} from "chart.js/auto";
import AxiosInstance from "@/config/AxiosInstance";
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const SupplyBarGraph = () => {
    const [supplys,setSupplys] = useState([]);

    useEffect(()=>{
        getChartData();
    },[]);
    const getChartData = async () =>{
        const date = new Date(); // Method 1 (current date at midnight UTC)
        date.setHours(0, 0, 0, 0)
        const today = date.toISOString().slice(0, 10);
        try {
            const response = await AxiosInstance.get(`/suppliers/find-By-date/${today}`);
            setSupplys(response.data);
            console.log(supplys);
        }catch (e) {
            console.log(e)
        }
    }

    const supplyData = supplys.map((item) => item.supplys);
    const supplyLabels = supplys.map((item) => item.name);

    console.log(supplyLabels); // Output: [25, 50]
    console.log(supplyData); // Output: ["tuna", "Prawns"]
    const data={
        labels:supplyLabels,
        datasets:[
            {
                label:'data',
                data:supplyData,
                fill:false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }
        ]
    }

    const options={
        type: 'bar',
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }
    return(
        <>
            <div className="w-5/12 h-5/12 gap-5">
                <div className="mt-5 text-center bg-green-400 text-white">Today Supply</div>
                <Bar
                    options={options}
                    data={data}
                />
            </div>
        </>
    );
}
export default SupplyBarGraph;
