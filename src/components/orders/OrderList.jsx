import { useEffect, useState } from "react"
import { getAllOrdersSortedByTime, getOrdersByPickup, DeleteOrder } from "../../services/orderService.js"
import { OrdersFilter } from "./OrdersFilter.jsx"
import { Link } from "react-router-dom"
import "./orders.css"

//import icon script


export const OrderList = ({currentUser}) => {
    const [allOrders, setAllOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [filterDay, setFilterDay] = useState(0)
    const [showIncomplete, setShowIncomplete] = useState(false)
    
    //TODO
    const getAndSetAllOrders = () => {
        getAllOrdersSortedByTime().then(ordersArray =>{
            if (currentUser.isStaff){
            setAllOrders(ordersArray)}
            else{
                const customerOrders = ordersArray.filter(order => order.userId === currentUser.id)
                setAllOrders(customerOrders)
            }
        })
    }
    const handleClear = () =>{
        getAndSetAllOrders()
    }

    //initial render only
    useEffect(()=>{ 
        getAndSetAllOrders()
    },[currentUser])

    useEffect(() => {
        const dayOrders = allOrders.filter(ticket => 
          ticket.pickup === filterDay)
          setFilteredOrders(dayOrders)
      },[filterDay, allOrders])

      useEffect(() => {
        if(showIncomplete){
          const incompleteOrders = allOrders.filter(order => !order.completed)
          setFilteredOrders(incompleteOrders)
        } else{
          setFilteredOrders(allOrders)
        }
      }, [showIncomplete, allOrders])

    const OrderDeleted = async (orderId) =>{
        DeleteOrder(orderId)
    }


return (
    <div className="orders-container">
    <h2>Orders </h2>
    {currentUser.isStaff ? (
    <OrdersFilter 
    currentUser={currentUser} 
    setFilteredOrders={setFilteredOrders} 
    handleClear ={handleClear} 
    setShowIncomplete={setShowIncomplete} 
    setFilterDay={setFilterDay}/>
    ):("")}
    <article className="orders">
        {filteredOrders.map(orderObj => {
            return (
                <section className="order" key={orderObj.id}>
                    <Link to={`/orders/${orderObj.id}`}>
                        <header className="order-info">Order #{orderObj.id}</header>
                    </Link>
                    <footer>
                        <div className="order-info">{new Date(orderObj?.pickup).toDateString()}</div>
                        <div className="btn-container">
                            {/* does this button only show for employees? */}
                                <button className="delete-btn"
                                value={orderObj.id}
                                onClick={async () =>{
                                    await OrderDeleted(orderObj.id).then(()=>{
                                    getAndSetAllOrders()})
                                }}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                    </footer>
                </section>

            )
        })}
    </article>
</div>
)
}