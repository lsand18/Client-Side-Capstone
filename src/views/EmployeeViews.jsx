import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav.jsx"
import { OrderList } from "../components/orders/OrderList.jsx"
import { OrderView } from "../components/orders/OrderView.jsx"


export const EmployeeViews = ({currentUser}) => {
    return (
        <Routes> 
        <Route path="/" element={
            <>
            <EmployeeNav />
            <Outlet />
            </>
        }>
             <Route path="orders">
                    <Route index element={<OrderList currentUser = {currentUser}/>}/>
                    <Route path="/orders/:orderId" element={<OrderView currentUser={currentUser}/>}/>
                </Route>
       </Route>
        </Routes>
    )
    }