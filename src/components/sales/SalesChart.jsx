import { Chart as ChartJS } from "chart.js/auto";
import { Line } from 'react-chartjs-2'
import "./sales.css"
import { useEffect, useState } from "react";

export const SalesChart = ({allOrders}) => {
const [janSales, setJanSales] = useState(0)
const [febSales, setFebSales] = useState(0)
const [marchSales, setMarchSales] = useState(0)
const [aprilSales, setAprilSales] = useState(0)
const [maySales, setMaySales] = useState(0)
const [juneSales, setJuneSales] = useState(0)


useEffect(() => {
    const janOrders = allOrders.filter(order => new Date(order.pickup).getMonth() === 0)
    let janTotal = 0
    janOrders.forEach(order =>{
       
        if(order.size){
            janTotal += order.size.price
        }
    })
    setJanSales(janTotal);

    const febOrders = allOrders.filter(order => new Date(order.pickup).getMonth() === 1)
    let febTotal = 0
    febOrders.forEach(order =>{
       
        if(order.size){
            febTotal += order.size.price
        }
    })
    setFebSales(febTotal)

    const marchOrders = allOrders.filter(order => new Date(order.pickup).getMonth() === 2)
    let marchTotal = 0
    marchOrders.forEach(order =>{
       
        if(order.size){
            marchTotal += order.size.price
        }
    })
    setMarchSales(marchTotal)

    const aprilOrders = allOrders.filter(order => new Date(order.pickup).getMonth() === 3)
    let aprilTotal = 0
    aprilOrders.forEach(order =>{
       
        if(order.size){
            aprilTotal += order.size.price
        }
    })
    setAprilSales(aprilTotal)
    
    const mayOrders = allOrders.filter(order => new Date(order.pickup).getMonth() === 4)
    let mayTotal = 0
    mayOrders.forEach(order =>{
       
        if(order.size){
            mayTotal += order.size.price
        }
    })
    setMaySales(mayTotal)

    const juneOrders = allOrders.filter(order => new Date(order.pickup).getMonth() === 5)
    let juneTotal = 0
    juneOrders.forEach(order =>{
       
        if(order.size){
            juneTotal += order.size.price
        }
    })
    setJuneSales(juneTotal)
    
},[allOrders])

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
       datasets: [
        {
            label: 'Sales by Month',
            data: [janSales, febSales, marchSales, aprilSales, maySales, juneSales],
            fill: false,
            borderColor: 'white',
            tension: 0.1
        }
    ]
};
 return(

<div className="chart">
<h2> YTD Sales</h2>
<Line data={data}/>
</div>
 )
}