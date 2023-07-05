import { ChangeEvent, FormEvent, useEffect, useState } from "react";
const ENDPOINT = "http://localhost:8000";

interface game_message {
    message: string;
    roomId: string;
}

export default function Test() {
    const [currentRoomId, setcurrentRoomId] = useState("");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState<HTMLDivElement>();
    
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
        setcurrentRoomId(output.roomId);
        setOutputText(colorText(output.message));
    }
    
    useEffect(() => {
        const container = document.getElementById("output-container");
        if(!container) return;
        
        if(outputText) container.appendChild(outputText);
        container.scrollTop = container.scrollHeight;
        
    }, [outputText])
    
    function colorText(text: string): HTMLDivElement {
        console.log(text);
        let div = document.createElement("div");
        // div.className = "dis"
        div.textContent = text;
        return div;
    }
    
    return(
        <div className="m-2">
            <h1 className="text-lg font-xtrabold">{currentRoomId}</h1>
            <div id="output-container" className="block whitespace-pre overflow-y-auto h-80"></div>
            <form className="mt-2" onSubmit={handleSubmit}>
                <input className="text-black w-full" type="text" value={inputText} onChange={handleChange}/>
            </form>
        </div>
    )
}