import coloredCookie from "../../assets/coloredCookie.png"
import transparentCookie from "../../assets/coloredCookie.png"

export const CustomerRewards = ({randomCode}) => {
    //useEffect to pull user current rewards and sets state for level


    //add code input that changes state
    //on submit, function runs to check if code matches randomCode state, if it does
    //class of cookie changes so image of cookie will change

    //can set an image for each level, the image has the punches needed. the image changes as the 
    //reward level state changes
    return (
        <div>
            <img src={coloredCookie} />
            <img src={transparentCookie} />
        </div>
    )
}