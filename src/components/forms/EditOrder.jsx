import { useEffect, useState } from "react"
import { getCakeColorsByOrderId, getOrdersByOrderId, postColor, updateOrder, DeleteColor } from "../../services/orderService.js"
import { useParams } from "react-router-dom"
import { OrderOptions } from "./OrderOptions.jsx"
import { useNavigate } from "react-router-dom"
import "./forms.css"

export const EditOrder = () => {
const [transientOrder, setTransientOrder] = useState({
        sizeId: 0,
        flavorId: 0,
        userId: 0,
        theme: "",
        writing: "",
        pickup: 0,
        completed: false,
        orderColors: [],
        size:{},
        flavor: {}
})
const { orderId } = useParams()
const navigate = useNavigate()

useEffect(()=>{
getOrdersByOrderId(orderId).then((orderArr)=>{
    const orderObj = orderArr[0]
    setTransientOrder({
        sizeId: orderObj.sizeId,
        flavorId: orderObj.flavorId,
        userId: orderObj.userId,
        theme: orderObj.theme,
        writing: orderObj.writing,
        pickup: orderObj.pickup,
        size: orderObj.size,
        flavor: orderObj.flavor,
        orderColors: []
    })
})
},[orderId])

useEffect(()=> {
    getCakeColorsByOrderId(orderId).then((orderArr)=>{
        const colors = orderArr.map(orderColor => orderColor.color)
        setTransientOrder( prevOrder =>({
            ...prevOrder,
            orderColors: [...prevOrder.orderColors, ...colors]
        }))
    })
},[orderId])

const handleDateChange = () => {
    console.log("make the date work hehe")
}

const handleSave = async (e) =>{
    e.preventDefault()
    const order = {
        id: parseInt(orderId),
        sizeId: transientOrder.sizeId,
        flavorId: transientOrder.flavorId,
        userId: transientOrder.userId,
        theme: transientOrder.theme,
        writing: transientOrder.writing,
        pickup: transientOrder.pickup,
        completed: false,
    }
    await updateOrder(order)
    await checkColors()
    navigate(`/orders`)
}    

const checkColors = async () => {
    getCakeColorsByOrderId(parseInt(orderId)).then(orderArr =>{
        {orderArr.map((orderObj)=>{
            const colorIndex = transientOrder.orderColors?.findIndex(color => color.colorId === orderObj.colorId)
        if (colorIndex === -1){
            DeleteColor(orderObj.id)
        }
        })}
        {
            transientOrder.orderColors.map((colorObj)=>{
                const colorIndex = orderArr.findIndex(color => color.colorId === colorObj.colorId)
                if (colorIndex === -1){
                    const newColorObj = {
                        orderId: parseInt(orderId),
                        colorId: colorObj.id
                    }
                    postColor(newColorObj)
                }
            })
        }
    })
}

const formatDateFromTimestamp = () => {
    const date = new Date(transientOrder.pickup)
    const year = date.getFullYear()
    const month = String(date.getMonth()+1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
}

return (
        <form>
            <h2> Edit Cake Order</h2>
            <OrderOptions
            transientOrder = {transientOrder} 
            setTransientOrder={setTransientOrder}/>
            <fieldset>
                <div className="form-group">
                    <label>Theme: </label>
                    <input 
                    type="text" className="form-control"
                    placeholder="birthday, gradution, etc"
                    defaultValue={transientOrder.theme}
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
                    defaultValue={transientOrder.writing}
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
            value={formatDateFromTimestamp()}
                onChange={(event) => {
                    // event.target.value ? 
                    handleDateChange(event)
                //         : handleClear()
                }}
            />
        </div>
        <div className="btn-container">
            <button className="btn-primary"
            onClick={handleSave}
            >Save Order</button>
        </div>
            </fieldset>
        </form>
    )
}