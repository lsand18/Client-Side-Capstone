import coloredCookie from "../../assets/coloredCookie.png"
import transparentCookie from "../../assets/transparentCookie.png"
import freeCookie from "../../assets/freeCookie.png"
import freeCookieColored from "../../assets/freeCookieColored.png"
import "./rewards.css"
import { useEffect, useState } from "react"
import {getPunchesByUserId, getRewardCode, PostPunch } from "../../services/userService.js"

//in order to protect against multiple uses,  check if CODE exist in pucnhes before adding

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
  }, [currentUser])

  useEffect(()=>{
    getRewardCode().then(codeObj =>{
        setRewardCode(codeObj.code)
    })
  },[])


  const imageElements = Array.from({length: rewardLevel},(_,index) =>(
    <img key={index} src={coloredCookie}/>
  ))
  const imageElementsTwo = Array.from({length: (9 - rewardLevel)},(_,index) =>(
    <img key={10-index} src={transparentCookie}/>
  ))

  const handlePost = () => {
    const post = {
        userId: currentUser.id,
        code: rewardCode
    }
    PostPunch(post)
  }

    return (
        <div className="all">
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
        <div className="rewardCard">
            {imageElements}
            {imageElementsTwo}
           {rewardLevel <= 9 ? (
            <img src={freeCookie} />
           ): (
            <img src={freeCookieColored} />
           )}
         
        </div>
        </div>
    )
}