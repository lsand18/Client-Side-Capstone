export const getCurrentFlavors = () => {
    return fetch(`http://localhost:8088/currentFlavors`).then((res) =>
      res.json()
    )
  }