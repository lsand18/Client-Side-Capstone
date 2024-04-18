import { useNavigate } from "react-router-dom"
import { getOrdersByPickup } from "../../services/orderService.js"
import { useState, useEffect } from "react"
import "./orders.css"

export const OrdersFilter = ({ setFilterDay, setFilteredOrders, handleClear,setShowIncomplete, currentUser }) => {
    // const navigate = useNavigate()
   

    const handleDateChange = (event) => {
        console.log(event.target.value)
        const beginning = new Date(event.target.value).getTime()
        console.log(beginning)
        //sets timestamp for beginning of day
        setFilterDay(beginning)
    }

    //function for when calender is cleared
   
    // useEffect(()=>{
    //     getOrdersByPickup(filterDay).then(ordersArray =>{
    //         setFilteredOrders(ordersArray)
    //     })
    // },[filterDay])

    return (
        <div className="filter-bar">
            {/* <button className="btn-primary"
                onClick={() => { navigate('orders/create') }}> New Order </button> */}

            <div className="dropdown"></div>
            <label htmlFor="filterDay">Filter by Day:</label>
            <input type="date" id="filterDay" name="filterDay"
                onChange={(event) => {
                    event.target.value ? handleDateChange(event)
                        : handleClear()
                }}
            />
            {currentUser.isStaff ?
        <>
        <button className="filter-btn btn-primary"
        onClick={()=>{
            setShowIncomplete(true)
        }}>Show Incomplete</button>
        <button className="filter-btn btn-primary"
        onClick={()=>{
            setShowIncomplete(false)
        }}>Show All</button>
            
        </> :
        <></>
        }
        </div>
    )
}