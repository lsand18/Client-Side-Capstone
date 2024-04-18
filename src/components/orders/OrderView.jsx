import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrdersByOrderId } from "../../services/orderService.js"
import "./Orders.css"

export const OrderView = ({currentUser}) => {
    const { orderId } = useParams()
    const [currentOrder, setCurrentOrder] = useState({})
    const [customer, setCustomer] = useState({})
    const [orderPrice, setOrderPrice] = useState(0)
    const navigate = useNavigate()

    const getAndSetOrder = () => {
        getOrdersByOrderId(orderId).then(orderArr => {
            orderObj = orderArr[0]
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
    },[currentOrder])


    return (
        <>
            <div className="orders-container">
                <div className="order-details">
            {currentUser.isStaff ?(
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
                <span>Cake Flavor: </span>
                {currentOrder.flavor}
            </div>
                </div>
                </div>
            </div>
        </>
    )
}