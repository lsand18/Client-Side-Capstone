import { useState, useEffect } from "react"
import { CustomerViews } from "./CustomerViews.jsx"
import { EmployeeViews } from "./EmployeeViews.jsx"


export const ApplicationViews = () => {

const [currentUser, setCurrentUser] = useState({});


useEffect(() => {
  const localBakeryUser = localStorage.getItem("bakery_user");
  const bakeryUserObject = JSON.parse(localBakeryUser);
  setCurrentUser(bakeryUserObject);
}, [])

  return currentUser.isStaff ? (
    <EmployeeViews currentUser={currentUser} />
  ) : (
    <CustomerViews currentUser={currentUser} /> 
  )

      
    
}