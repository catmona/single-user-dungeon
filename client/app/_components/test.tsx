import { ChangeEvent, FormEvent, useEffect, useState } from "react";
const ENDPOINT = "http://localhost:8000";

interface game_message {
    message: string;
    roomId: string;
}

export default function Test() {
    const [currentRoomId, setcurrentRoomId] = useState("");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    
    //get starting room when first loading page
    useEffect(() => {
        fetch(ENDPOINT)
            .then(res =>res.text())
            .then(out => setcurrentRoomId(out))
    }, [])
    
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputText(event.target.value);
    }
    
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.debug(`input: ${inputText}`);
        fetch(ENDPOINT + "/api/test", {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                message: inputText,
                roomId: currentRoomId
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(out => handleOutput(out));
    }
    
    function handleOutput(output: game_message) {
        console.log(output.message);
        setcurrentRoomId(output.roomId);
    }
    
    return(
        <div>
            {currentRoomId}
            <span>{outputText}</span>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputText} onChange={handleChange}/>
            </form>
        </div>
    )
}