import { useState} from "react"
import { PostCode } from "../../services/userService.js"
import "./code.css"

export const CodeGenerator = () => {
    const [randomCode, setRandomCode] = useState("")

    const generateRandomCode = () => {
        const code = Math.random().toString(36).substr(2, 6).toUpperCase()
        PostCode(code)
        setRandomCode(code)
    }

    return(
        <div className="codeBox">
            <h2> Generate Code </h2>
            <button 
            className="btn-primary"
            onClick={generateRandomCode}>
                New Code
            </button>
            {randomCode && (
                <div className="code">
                    <h3> Random Code: </h3>
                    <p>{randomCode}</p>
                    </div>
            )}
        </div>
    )
}