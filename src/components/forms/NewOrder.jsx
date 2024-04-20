//add calender and on change for pickup
//create save button - routes to confirmation page with total price
//create ok button on confirmation that routes to my orders
//send to database

import { useEffect, useState } from "react"
import { OrderOptions } from "./OrderOptions.jsx"
import { getSizes, getFlavors, getColors, addOrder, postColor } from "../../services/orderService.js"
import { useNavigate } from "react-router-dom"

export const NewOrder = ({currentUser}) => {
    const [transientOrder, setTransientOrder]= useState({
        size: 0,
        flavor: 0,
        user: 0,
        theme: "",
        writing: "",
        img: "",
        pickup: 0,
        completed: false,
        colors: []
    })
    // const [cakeOptions, setCakeOptions] = useState({
    //     sizes: [],
    //     flavors: [],
    //     colors: []
    // })
    const navigate = useNavigate()

    // useEffect(()=>{
    //     Promise.all([
    //         getSizes(),
    //         getFlavors(),
    //         getColors()
    //     ]).then(([sizes, flavors, colors]) =>{
    //         setCakeOptions(prevCakeOptions => ({
    //             ...prevCakeOptions,
    //             sizes,
    //             flavors,
    //             colors
    //         }))
    //     })
    // }, [])

    useEffect(()=>{
        setTransientOrder(prevOrder => ({
            ...prevOrder,
            user: currentUser.id
        }))
    }, [currentUser])

    const handleDateChange = (event) => {
        //add check for future date
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
            "userId": transientOrder.user,
            "sizeId": transientOrder.size,
            "flavorId": transientOrder.flavor,
            "theme": transientOrder.theme,
            "writing": transientOrder.writing,
            "pickup": transientOrder.pickup,
            "completed": transientOrder.completed
        }
        await addOrder(orderObj).then(response => {
            {transientOrder.colors.map(color => {
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
            <h2> New Cookie Cake Order</h2>
            <OrderOptions
            // cakeOptions = {cakeOptions}
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
                    // event.target.value ? 
                    handleDateChange(event)
                //         : handleClear()
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