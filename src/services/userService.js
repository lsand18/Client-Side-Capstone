export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserByUserId = (userId) =>{
  return fetch (`http://localhost:8088/users/${userId}`).then(res => res.json())
}

export const getPunchesByUserId = async (userId) =>{
  return fetch (`http://localhost:8088/punches?userId=${userId}`).then(res => res.json())
}

export const PostCode = async (code) => {
  return fetch (`http://localhost:8088/code?id=1`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      code: code
    })
  }
)}

export const getRewardCode = () =>{
  return fetch (`http://localhost:8088/code?id=1`).then(res => res.json())
}

export const PostPunch = (punch) => {
  return fetch("http://localhost:8088/punches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(punch),
  }).then((res) => res.json())
}
