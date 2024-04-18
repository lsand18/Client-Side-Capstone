export const OrderOptions = ({cakeOptions,transientOrder, setTransientOrder}) => {
//define change function - handleSizeChange
//cakeOptions, transientOrder drill prop

const handleSizeChange = (event) =>{
   const sizeId = parseInt(event.target.value)
   setTransientOrder(prevOrder => ({...prevOrder, size: sizeId}))
}
const handleFlavorChange = (event) =>{
    const flavorId = parseInt(event.target.value)
   setTransientOrder(prevOrder => ({...prevOrder, flavor: flavorId}))
}
const handleColorChange = (event) =>{
    const colorId = parseInt(event.target.value)
    const isChecked = event.target.checked;
    const colorIndex = transientOrder.colors.findIndex(color => color.id === colorId)

    if (isChecked){
        if (colorIndex === -1){
            setTransientOrder(prevOrder => ({
                ...prevOrder,
                colors: [...prevOrder.colors, cakeOptions.colors.find(color => color.id === colorId)]
            }))
        }
    } else {
        if (colorIndex !== -1){
            setTransientOrder(prevOrder => ({
                ...prevOrder,
                colors: prevOrder.colors.filter(color => color.id !== colorId)
            }))
        }
    }
}

return (
    <div className="order-options">
        <div>
            <h3> Cake Size</h3>
            <select onChange={handleSizeChange} value={transientOrder.size || ''}>
                <option value="">Select a Size</option>
                {cakeOptions.sizes.map(size => (
                    <option key={size.id} value = {size.id}>{size.size}</option>
                ))}
                </select>
        </div>
        <div>
            <h3> Cake Flavor</h3>
            <select onChange={handleFlavorChange} value={transientOrder.flavor || ''}>
                <option value="">Select a Flavor</option>
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
                            checked={transientOrder.colors?.some(selectedcolor => selectedcolor.id === color.id)}
                        />
                        <label htmlFor={`color-${color.id}`}>{color.color}</label>
                    </div>
                ))}
            </div>
    </div>
)
}