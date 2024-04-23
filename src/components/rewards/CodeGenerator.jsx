import { useState} from "react"
import { PostCode } from "../../services/userService.js"

export const CodeGenerator = () => {
    const [randomCode, setRandomCode] = useState("")

    const generateRandomCode = () => {
        const code = Math.random().toString(36).substr(2, 6).toUpperCase()
        PostCode(code)
        setRandomCode(code)
    }

    return(
        <div>
            <h2> Generate Code </h2>
            <button onClick={generateRandomCode}>
                New Code
            </button>
            {randomCode && (
                <div>
                    <h3> Random Code: </h3>
                    <p>{randomCode}</p>
                    </div>
            )}
        </div>
    )
}