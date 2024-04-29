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
        currentCakeColors.map((color, index) =>{
        return(
            <div key={color.id} style={{marginRight: '5px'}}>
                {color.color?.color}{index !== currentCakeColors.length - 1 ? ',  ' : ''}
            </div>
        )
    })):(<div>None</div>)
}
    </>
)

}