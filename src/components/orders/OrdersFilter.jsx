// import { useNavigate } from "react-router-dom"
// import { getOrdersByPickup } from "../../services/orderService.js"
// import { useState, useEffect } from "react"
import "./orders.css"

export const OrdersFilter = ({ setFilterDay, setFilteredOrders, handleClear,setShowIncomplete, currentUser }) => {
    
   const handleDateChange = (event) => {
        const beginning = new Date(event.target.value).getTime()
        //sets timestamp for beginning of day
        setFilterDay(beginning)
    }

    return (
        <div className="filter-bar">
            <div className="dropdown">
            <label htmlFor="filterDay">Filter by Day:</label>
            <input type="date" id="filterDay" name="filterDay"
                onChange={(event) => {
                    event.target.value ? handleDateChange(event)
                        : handleClear()
                }}
            />
            </div>
            {currentUser.isStaff ?
        <div className="btn-container">
        <button className="filter-btn btn-primary"
        onClick={()=>{
            setShowIncomplete(true)
        }}>Show Incomplete</button>
        <button className="filter-btn btn-primary"
        onClick={()=>{
            setShowIncomplete(false)
        }}>Show All</button>
            
        </div> :
        <></>
        }
        </div>
    )
}