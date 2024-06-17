import { useEffect, useState } from "react"
import "./sales.css"
import { getAllOrdersSortedByTime, getFlavors, getSizes } from "../../services/orderService.js"
import { Link } from "react-router-dom"
import { SalesChart } from "./SalesChart.jsx"


export const Sales = () => {
    const [allOrders, setAllOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [filterMonth, setFilterMonth] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const [salesMessage,setSalesMessage] = useState("")
    const [mostPopularSize, setMostPopularSize] = useState("")
    const [mostPopularFlavor, setMostPopularFlavor] = useState("")
    const [sizes, setSizes] = useState([])
    const [flavors, setFlavors] = useState([])

    useEffect(()=>{
        getSizes().then((sizeArr)=> setSizes(sizeArr))
        getFlavors().then((flavorArr)=> setFlavors(flavorArr))
    },[])

    const getAndSetAllOrders = () => {
        getAllOrdersSortedByTime().then(ordersArr => {
            setAllOrders(ordersArr)
        })
    }
    useEffect(() => {
        getAndSetAllOrders()
   }, [])

   const calculateTotalSales = () => {
        let priceAdd = 0
        filteredOrders.forEach(order => {
            if(order.size){
                priceAdd += order.size.price
            }
        })
        setTotalSales(priceAdd)
    }

    useEffect(()=>{
        setFilteredOrders(allOrders)
    },[allOrders])

    useEffect(()=>{
        calculateMostPopular()
        calculateTotalSales()
    },[filteredOrders])

    useEffect(() => {
        if (filterMonth !== 0) {
            const chosenMonthNumber = filterMonth - 1
            const selectedMonthOrders = allOrders.filter(order => new Date(order.pickup).getMonth() === chosenMonthNumber)
            setFilteredOrders(selectedMonthOrders)
        }else {
            setFilteredOrders(allOrders)
        }
    }, [filterMonth, allOrders])

    useEffect(() => {
        if (totalSales !== 0){
            setSalesMessage(`${totalSales.toLocaleString("en-US",{style: "currency",currency:"USD"})}`)
        } else {
            setSalesMessage("No Sales This Month")
        }
    }, [totalSales])



 const calculateMostPopular = () => {
    if(filteredOrders.length === 0){
        setMostPopularFlavor("N/A")
        setMostPopularSize("N/A")
        return;
    } else {
    const sizeCounter = {}
    const flavorCounter = {}

    filteredOrders.forEach(order =>{
        if(sizeCounter[order.sizeId]){
            sizeCounter[order.sizeId]++
        }else{
            sizeCounter[order.sizeId] = 1
        }

        if(flavorCounter[order.flavorId]){
            flavorCounter[order.flavorId]++
        }else{
            flavorCounter[order.flavorId] = 1
        }
    })

    const mostPopularSizeId = Object.keys(sizeCounter).reduce((a,b)=> sizeCounter[a]>sizeCounter[b] ? a : b)
    const mostPopularSizeName = sizes.find(size => size.id === parseInt(mostPopularSizeId))?.size || "N/A" 
    setMostPopularSize(mostPopularSizeName)

    const mostPopularFlavorId = Object.keys(flavorCounter).reduce((a,b)=> flavorCounter[a]>flavorCounter[b] ? a : b)
    const mostPopularFlavorName = flavors.find(flavor => flavor.id === parseInt(mostPopularFlavorId))?.flavor || "N/A" 
    setMostPopularFlavor(mostPopularFlavorName)
 }}

    return (
        <div className="allSales">
            <div className="filter">
        <select onChange={(event) => {
            setFilterMonth(parseInt(event.target.value))
        }}>
            <option value="0">Select Month</option>
            <option value="1">January</option>
            <option value="2">Febuary</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </div>
              <div className="info">
              <div className="words">
        
    <div className="message">
        <h4 className="salesInfo">Total Sales:</h4><b>{salesMessage}</b>
        <h4 className="salesInfo"> Most Popular Flavor: </h4><b>{mostPopularFlavor}</b>
        <h4 className="salesInfo"> Most Popular Size: </h4><b>{mostPopularSize}</b>
    </div>
    </div>
    <SalesChart allOrders={allOrders}/>
    </div>
        <div className="orders-container">
            <h1> Orders </h1>
            {filteredOrders.map(orderObj => {
                return (
                    <section className="order-item" key={orderObj.id}>
                        <Link to={`/orders/${orderObj.id}`}>
                            <header className="order-item-info">Order #{orderObj.id}</header>
                        </Link>
                        <footer>
                            <div className="order-item-info">
                                {orderObj.flavor?.flavor} 
                            </div>
                            <div className="order-item-info">
                                {orderObj.size?.size}
                            </div>
                            <div className="order-item-info">
                                {"$" + orderObj.size?.price}
                            </div>
                        </footer>
                    </section>
                )
            })}
        </div>
        </div>
    )
}