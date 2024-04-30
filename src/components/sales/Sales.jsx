import { useEffect, useState } from "react"
import "./sales.css"
import { getAllOrdersSortedByTime } from "../../services/orderService.js"
import { Link } from "react-router-dom"

export const Sales = () => {
    //add filter for month
    //add most popular size
    //add most popular flavor
    // to do this, use array count method for both and display 
    // const [allOrders, setAllOrders] = useState({})
    const [filteredOrders, setFilteredOrders] = useState({})
    const [filterMonth, setFilterMonth] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const [salesMessage,setSalesMessage] = useState("")

    const getAndSetAllOrders = () => {
        getAllOrdersSortedByTime().then(ordersArr => {
            setFilteredOrders(ordersArr)
            //might need to set filtered orders. we do not need all orders
        })
    }

    useEffect(() => {
        getAndSetAllOrders()
    }, [])

    useEffect(() => {
        //write fetch call with end and beg of month
        //make async?

        //or write an if statement.. if filter month is not zero
        // if (chosenMonth !== 0) {
        //     const chosenMonthNumber = chosenMonth - 1
        //     const selectedMonthOrders = allOrders.filter(order => new Date(order.timestamp).getMonth() === chosenMonthNumber)
        getOrdersByMonth().then(orderArr => {
            setFilteredOrders(orderArr)
        })
    }, [filterMonth])

    useEffect(() => {
        if (totalSales !== 0){
            setSalesMessage(`Total Sales: ${totalSales.toLocaleString("en-US",{style: "currency",currency:"USD"})}`)
        } else {
            setSalesMessage("No Sales This Month")
        }
    }, [totalSales])

    return (
        <>
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
    <div>
        <b>{salesMessage}</b>
    </div>
        <div className="orders-container">
            <h1> Orders </h1>
            {filteredOrders.map(orderObj => {
                return (
                    <section className="order-item" key={orderObj.id}>
                        <Link to={`orders/${orderObj.id}`}>
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
                                {orderObj.size?.price}
                            </div>
                        </footer>
                    </section>
                )
            })}
        </div>
        </>
    )
}