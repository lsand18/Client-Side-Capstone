import { useState, useEffect } from "react"
import { getCakeColorsByOrderId, getColors } from "../../services/orderService.js"

export const CakeColors = ({orderId}) => {
// const [colors, setColors] = useState([])
const [currentCakeColors, setCurrentCakeColors] = useState([])

    // useEffect(()=>{
    //     getColors().then((colorArr)=>{
    //         setColors(colorArr)
    //     })
    // },[])

    useEffect(()=>{
        getCakeColorsByOrderId(orderId).then(colorArr =>{
            setCurrentCakeColors(colorArr)
        })
    },[orderId])

return (
        <>
        {currentCakeColors.lenth !== 0?(
        currentCakeColors.map(color =>{
        return(
            <div key={color.id}>
                {color.color?.color}
            </div>
        )
    })):(<div>None</div>)
}
    </>
)

}