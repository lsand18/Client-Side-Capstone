import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { CustomerNav } from "../components/nav/CustomerNav.jsx"
import { OrderList } from "../components/orders/OrderList.jsx"
import { NewOrder } from "../components/forms/NewOrder.jsx"
import { OrderView } from "../components/orders/OrderView.jsx"
import { EditOrder } from "../components/forms/EditOrder.jsx"
import { CustomerRewards } from "../components/rewards/CustomerRewards.jsx"


export const CustomerViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <CustomerNav />
                    <Outlet />
                </>
            }>
                <Route index element={<CustomerRewards currentUser={currentUser}/>} />
                <Route path="orders">
                    <Route index element={<OrderList currentUser = {currentUser}/>}/>
                    <Route path="/orders/:orderId" element={<OrderView />}/>
                    <Route path="/orders/:orderId/edit" element={<EditOrder />}/>
                </Route>
                <Route path="newOrder" element={<NewOrder currentUser={currentUser} />}/>
                
            </Route>
        </Routes>
    )
}