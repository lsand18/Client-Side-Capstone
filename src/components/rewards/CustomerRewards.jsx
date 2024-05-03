import coloredCookie from "../../assets/coloredCookie.png"
import transparentCookie from "../../assets/transparentCookie.png"
import freeCookie from "../../assets/freeCookie.png"
import check from "../../assets/Check.png"
import "./rewards.css"
import { useEffect, useState } from "react"
import {getPunchesByUserId, getRewardCode, PostPunch } from "../../services/userService.js"
import { ImageRotator } from "./ImageRotator.jsx"


export const CustomerRewards = ({currentUser}) => {
  const [rewardLevel, setRewardLevel] = useState(0)
  const [customerInput, setCustomerInput] = useState("")
  const [rewardCode, setRewardCode] = useState ("")
  const [codesUsed, setCodesUsed] = useState([])

  useEffect(()=>{
    getPunchesByUserId(currentUser.id).then((punchArr)=>{
        setRewardLevel(punchArr.length)
        setCodesUsed(punchArr)
    })
  }, [currentUser, rewardLevel])

  useEffect(()=>{
    getRewardCode().then(codeObj =>{
        setRewardCode(codeObj.code)
    })
  },[])


  const imageElements = rewardLevel < 10 ?
  Array.from({length: rewardLevel},(_,index) =>(
    <ImageRotator key={index} image={coloredCookie}/> )):
    Array.from({length: 9},(_,index) =>(
      <ImageRotator key={index} image={coloredCookie}/> 
    // <img key={index} src={coloredCookie}/>
  ))
  const imageElementsTwo = 
  rewardLevel < 10 ? 
  Array.from({length: (9 - rewardLevel)},(_,index) =>(
    <ImageRotator key={index + rewardLevel} image={transparentCookie}/>)) : ""
    // <img key={10-index} src={transparentCookie}/>

  const handlePost = () => {
    const post = {
        userId: currentUser.id,
        code: rewardCode
    }
    PostPunch(post)
  }

    return (
        <div className="all">
          <div className="form">
        <form>
            <h3> Input Rewards Code: </h3>
            <fieldset>
                <div className="form-group">
                    <input type="text" className="form-control"
                    value={customerInput}
                onChange={(event)=>
                    setCustomerInput(event.target.value)
                }
                />
                <button
                className="form-btn"
                 onClick={(e) =>{
                    e.preventDefault()
                    if (customerInput === rewardCode && 
                    codesUsed.findIndex(punchObj => punchObj.code === rewardCode) === -1
                    ){
                        const copyUp = rewardLevel + 1
                        setRewardLevel(copyUp)
                        handlePost()
                        setCustomerInput("")
                    }else{
                        window.alert("The code you entered is incorrect or has already been used. Please try again!")
                        setCustomerInput("")
                    }
                }}
                > Submit </button>
                </div>
            </fieldset>
        </form>
        </div>
        <div className="rewardCard">
            {imageElements}
            {imageElementsTwo}
           {rewardLevel <= 9 ? (
            <ImageRotator image={freeCookie}/>
            // <img src={freeCookie} />
           ): (
            <ImageRotator image={check}/>
            // <img src={freeCookieColored} />
           )}
         
        </div>
        </div>
    )
}