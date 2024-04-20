import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { CustomerNav } from "../components/nav/CustomerNav.jsx"
import { OrderList } from "../components/orders/OrderList.jsx"
import { NewOrder } from "../components/forms/NewOrder.jsx"
import { OrderView } from "../components/orders/OrderView.jsx"


export const CustomerViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <CustomerNav />
                    <Outlet />
                </>
            }>
                <Route path="orders">
                    <Route index element={<OrderList currentUser = {currentUser}/>}/>
                    <Route path="/orders/:orderId" element={<OrderView />}/>
                </Route>
                <Route path="newOrder" element={<NewOrder currentUser={currentUser} />}/>
            </Route>
        </Routes>
    )
}