import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrdersByOrderId, DeleteOrder } from "../../services/orderService.js"
import "./orders.css"
import { CakeColors } from "./CakeColors.jsx"
import { getUserByUserId } from "../../services/userService.js"
import { completeOrderChange } from "../../services/orderService.js"

export const OrderView = ({currentUser}) => {
    const { orderId } = useParams()
    const [currentOrder, setCurrentOrder] = useState({})
    const [customer, setCustomer] = useState({})
    const navigate = useNavigate()

    const getAndSetOrder = () => {
        getOrdersByOrderId(orderId).then(orderArr => {
            const orderObj = orderArr[0]
            setCurrentOrder(orderObj)
        })
    }

    //initital render only
    useEffect(() => {
        getAndSetOrder()
    }, [])
    
    useEffect(()=>{
        getUserByUserId(currentOrder.userId).then(user =>{
            setCustomer(user)
        })
    },[currentUser, currentOrder])

    const completeOrder = () => {
        const copy = {
            id: currentOrder.id,
            sizeId: currentOrder.sizeId,
            flavorId: currentOrder.flavorId,
            userId: currentOrder.userId,
            theme: currentOrder.theme,
            writing: currentOrder.writing,
            pickup: currentOrder.pickup,
            completed: true
        }
        completeOrderChange(copy).then(()=>{
            navigate(`/orders`)
        })
    }


    return (
        <>
            {currentUser?.isStaff ?(
                <div className="customer">
                    <h3> Customer Info: </h3>
                <div className="customer-info">
                    <h4>Full Name: </h4>
                    {customer.fullName}
                </div>
                <div className="customer-info">
                <h4>Phone Number: </h4>
                {customer.phone}
            </div>
            <div className="customer-info">
                <h4>Email: </h4>
                {customer.email}
            </div>
            </div>
            ): ("")}
             <div className="order">
            <h2> Order Info: </h2>
                <div className="order-info">
                <h4>Cake Size: </h4>
                {currentOrder?.size?.size}
                </div>
                <div className="order-info">
                <h4>Cake Flavor: </h4>
                {currentOrder?.flavor?.flavor}
                </div>
                <div className="order-info">
                <h4>Frosting Colors: </h4>
                <CakeColors orderId={orderId}/>
                </div>
                <div className="order-info">
                <h4>Theme: </h4>
                {"\"" + currentOrder?.theme + "\""}
                </div>
                <div className="order-info">
                <h4>Writing: </h4>
                {"\"" + currentOrder?.writing + "\""}
                </div>
                <div className="order-info">
                <h4>Pickup Date: </h4>
                {new Date(currentOrder?.pickup).toLocaleDateString('en-US', {timeZone: 'GMT', dateStyle: 'medium'})}
                </div>
                {(new Date().getTime() + 86400) < currentOrder.pickup ?(
                <>
                <div className="btn-container">
                    <button className="btn-primary"
                    onClick={()=>{
                        navigate(`/orders/${currentOrder.id}/edit`)
                    }}>Edit</button>
            <button className="btn-primary"
            onClick={()=>{
                DeleteOrder(currentOrder.id).then(()=>{
                    navigate(`/orders`)
                })
            }}>Cancel Order</button>
        </div>
        </>
            ):("")}
            {currentUser?.isStaff && currentOrder.completed===false ? (
                <button className="btn-primary"
                onClick={completeOrder}
                >Complete Order</button>
            ): ("")}
                </div>
        </>
    )
}