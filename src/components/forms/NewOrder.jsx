import { useEffect, useState } from "react"
import { OrderOptions } from "./OrderOptions.jsx"
import { addOrder, postColor } from "../../services/orderService.js"
import { useNavigate } from "react-router-dom"
import "./forms.css"

export const NewOrder = ({currentUser}) => {
    const [transientOrder, setTransientOrder]= useState({
        sizeId: 0,
        flavorId: 0,
        userId: 0,
        theme: "",
        writing: "",
        img: "",
        pickup: 0,
        completed: false,
        orderColors: []
    })
    const navigate = useNavigate()

    useEffect(()=>{
        setTransientOrder(prevOrder => ({
            ...prevOrder,
            userId: currentUser.id
        }))
    }, [currentUser])

    const handleDateChange = (event) => {
        console.log(event.target.value)
        const date = new Date(event.target.value).getTime()
        console.log(date)
        setTransientOrder(prevOrder => ({...prevOrder, pickup: date}))
    }

    const handleSubmit = async (e) => {
        //add window alert
        e.preventDefault()
        console.log("order submitted")
        const orderObj = {
            "userId": transientOrder.userId,
            "sizeId": transientOrder.sizeId,
            "flavorId": transientOrder.flavorId,
            "theme": transientOrder.theme,
            "writing": transientOrder.writing,
            "pickup": transientOrder.pickup,
            "completed": transientOrder.completed
        }
        await addOrder(orderObj).then(response => {
            {transientOrder.orderColors.map(color => {
            const colorObj = {
                "orderId": response.id,
                "colorId": color.id,
            }
         postColor(colorObj)
        })}
        }).then(navigate(`/orders`))
        
    }

    return(
        <form>
            <h1> New Cookie Cake Order</h1>
            <OrderOptions
            transientOrder = {transientOrder} 
            setTransientOrder={setTransientOrder}/>
            <fieldset>
                <div className="form-group">
                    <label>Theme: </label>
                    <input 
                    type="text" className="form-control"
                    placeholder="birthday, gradution, etc"
                    onChange={(event)=>{
                        const copy = {...transientOrder}
                        copy.theme=event.target.value
                        setTransientOrder(copy)
                    }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Writing: </label>
                    <input 
                    type="text" className="form-control"
                    placeholder=""
                    onChange={(event)=>{
                        const copy = {...transientOrder}
                        copy.writing=event.target.value
                        setTransientOrder(copy)
                    }} />
                </div>
            </fieldset>
            <fieldset>
            <div className="dropdown">
            <label htmlFor="filterDay">Pickup Day:</label>
            <input type="date" id="pickup" name="pickup"
                onChange={(event) => {
                    handleDateChange(event)
                }}
            />
        </div>
        <div className="btn-container">
            <button className="btn-primary"
            onClick={handleSubmit}
            >Submit Order</button>
        </div>
            </fieldset>
        </form>
    )
}