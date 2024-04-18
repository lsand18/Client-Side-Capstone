//add calender and on change for pickup
//create save button - routes to confirmation page with total price
//create ok button on confirmation that routes to my orders
//send to database

import { useEffect, useState } from "react"
import { OrderOptions } from "./OrderOptions.jsx"
import { getSizes, getFlavors, getColors } from "../../services/orderService.js"

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
    const [cakeOptions, setCakeOptions] = useState({
        sizes: [],
        flavors: [],
        colors: []
    })

    useEffect(()=>{
        Promise.all([
            getSizes(),
            getFlavors(),
            getColors()
        ]).then(([sizes, flavors, colors]) =>{
            setCakeOptions(prevCakeOptions => ({
                ...prevCakeOptions,
                sizes,
                flavors,
                colors
            }))
        })
    }, [])

    useEffect(()=>{
        setTransientOrder(prevOrder => ({
            ...prevOrder,
            user: currentUser.id
        }))
    }, [currentUser])

    const handleDateChange = (event) => {
        const date = new Date(event.target.value).getTime()
        setTransientOrder(prevOrder => ({...prevOrder, pickup: date}))
    }

    return(
        <form>
            <h2> New Cookie Cake Order</h2>
            <OrderOptions
            cakeOptions = {cakeOptions}
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
            </fieldset>
        </form>
    )
}