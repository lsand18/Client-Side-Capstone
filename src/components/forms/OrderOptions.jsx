import { useState, useEffect } from "react"
import { getSizes, getFlavors, getColors } from "../../services/orderService.js"

export const OrderOptions = ({transientOrder, setTransientOrder}) => {
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

const handleSizeChange = (event) =>{
   const sizeId = parseInt(event.target.value)
   setTransientOrder(prevOrder => ({...prevOrder, sizeId: sizeId}))
}
const handleFlavorChange = (event) =>{
    const flavorId = parseInt(event.target.value)
   setTransientOrder(prevOrder => ({...prevOrder, flavorId: flavorId}))
}
const handleColorChange = (event) =>{
    const selectedColorId = parseInt(event.target.value)
    const isChecked = event.target.checked;
    const colorIndex = transientOrder.orderColors.findIndex(orderColor => orderColor.id === selectedColorId)

    if (isChecked){
        if (colorIndex === -1){
            setTransientOrder(prevOrder => ({
                ...prevOrder,
                orderColors: [...prevOrder.orderColors, cakeOptions.colors.find(color => color.id === selectedColorId)]
            }))
        }
    } else {
        if (colorIndex !== -1){
            setTransientOrder(prevOrder => ({
                ...prevOrder,
                orderColors: [...prevOrder.orderColors.filter(color => color.id !== selectedColorId)]
            }))
        }
    }
}

return (
        <fieldset>
            <div className="form-group">
            <h3> Cake Size</h3>
            <select onChange={handleSizeChange} >
                <option defaultValue={transientOrder?.size?.size}>{transientOrder?.size?.size}</option>
                {cakeOptions.sizes.map(size => (
                    <option key={size.id} value = {size.id}>{size.size}</option>
                ))}
                </select>
        </div>
        <div className="form-group">
            <h3> Cake Flavor</h3>
            <select onChange={handleFlavorChange} >
                <option defaultValue={transientOrder?.flavor?.flavor}>{transientOrder.flavor?.flavor}</option>
                {cakeOptions.flavors.map(flavor => (
                    <option key={flavor.id} value = {flavor.id}>{flavor.flavor}</option>
                ))}
                </select>
        </div>
        <div>
                <h3>Frosting Colors</h3>
                {cakeOptions.colors.map(color => (
                    <div key={color.id}>
                        <input
                            type="checkbox"
                            value={color.id}
                            onChange={handleColorChange}
                            id={`color-${color.id}`}
                            checked={transientOrder.orderColors?.some(selectedcolor => selectedcolor.id === color.id)}
                        />
                        <label htmlFor={`color-${color.id}`}>{color.color}</label>
                    </div>
                ))}
            </div>
            </fieldset>
)
}