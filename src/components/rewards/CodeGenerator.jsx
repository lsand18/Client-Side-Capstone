import { useState } from "react"

export const CodeGenerator = ({randomCode, setRandomCode}) => {

    const generateRandomCode = () => {
        const code = Math.random().toString(36).substr(2, 6).toUpperCase()
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