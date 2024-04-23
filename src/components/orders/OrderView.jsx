import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrdersByOrderId, DeleteOrder } from "../../services/orderService.js"
import "./orders.css"
import { CakeColors } from "./CakeColors.jsx"
import { getUserByUserId } from "../../services/userService.js"

export const OrderView = ({currentUser}) => {
    const { orderId } = useParams()
    const [currentOrder, setCurrentOrder] = useState({})
    const [customer, setCustomer] = useState({})
    // const [orderPrice, setOrderPrice] = useState(0)
    // const [colors, setColors]=useState([])
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


    return (
        <>
            <div className="orders-container">
                <div className="order">
            {currentUser?.isStaff ?(
                <>
                <div className="customer-info">
                    <span>Full Name: </span>
                    {customer.fullName}
                </div>
                <div className="customer-info">
                <span>Phone Number: </span>
                {customer.phone}
            </div>
            <div className="customer-info">
                <span>Email: </span>
                {customer.email}
            </div>
            </>
            ): ("")}
                <div className="order-info">
                <span>Cake Size: </span>
                {currentOrder?.size?.size}
                </div>
                <div className="order-info">
                <span>Cake Flavor: </span>
                {currentOrder?.flavor?.flavor}
                </div>
                <div className="order-info">
                <span>Frosting Colors: </span>
                <CakeColors orderId={orderId}/>
                </div>
                <div className="order-info">
                <span>Theme: </span>
                {currentOrder?.theme}
                </div>
                <div className="order-info">
                <span>Writing: </span>
                {currentOrder?.writing}
                </div>
                <div className="order-info">
                <span>Pickup Date: </span>
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
            
                </div>
            </div>
        </>
    )
}