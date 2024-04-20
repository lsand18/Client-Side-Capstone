export const getAllOrdersSortedByTime = () => {
    return fetch(`http://localhost:8088/orders?_sort=pickup`).then(res => res.json())
}

export const getOrdersByPickup = (filterDayTime) => {
    return fetch (`http://localhost:8088/orders?pickup=${filterDayTime}`).then(res => res.json())
}

export const DeleteOrder = async (orderId) => {
    const deleteOptions = {
        method: "DELETE"
    }
    const response = await fetch(`http://localhost:8088/orders/${orderId}`, deleteOptions)
  }

  export const getSizes = () => {
    return fetch (`http://localhost:8088/sizes`).then(res => res.json())
  }
  export const getFlavors = () => {
    return fetch (`http://localhost:8088/flavors`).then(res => res.json())
  }
  export const getColors = () => {
    return fetch (`http://localhost:8088/colors`).then(res => res.json())
  }

  export const getOrdersByOrderId = (orderId) =>{
    return fetch (`http://localhost:8088/orders?id=${orderId}&_expand=size&_expand=flavor&_embed=orderColors`).then(res => res.json())
  }

  export const getCakeColorsByOrderId = (orderId) =>{
    return fetch (`http://localhost:8088/orderColors?orderId=${orderId}&_expand=color`).then(res => res.json())
  }
  export const addOrder = async (orderObj) => {
    const response = await fetch("http://localhost:8088/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObj),
    });
    return await response.json();
  };
  export const postColor = async (colorObj) => {
    const response = await fetch("http://localhost:8088/orderColors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colorObj),
    });
    return await response.json();
  };