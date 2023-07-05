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
        setOutputText(processText(inputText, false));
        
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
        setInputText(""); //clear input field
        setcurrentRoomId(output.roomId);
        setOutputText(processText(output.message, true));
    }
    
    //update container with new dummy containers with text
    useEffect(() => {
        const container = document.getElementById("output-container");
        if(!container) return;
        
        if(outputText) container.appendChild(outputText);
        container.scrollTop = container.scrollHeight;
        
    }, [outputText])
    
    //process text into a div
    function processText(text: string, color: boolean): HTMLDivElement {
        if(color) 
            return colorText(text);
        
        let container = document.createElement("div");
        
        let pre = document.createElement("div");
        let div = document.createElement("div");
        
        container.appendChild(pre);
        container.appendChild(div);
        
        pre.className = "inline text-green-400 font-semibold";
        div.className = "inline";
        
        pre.textContent = "\n>>  ";
        div.textContent = text;
        
        return container;
    }
    
    //color message using # as seperators
    function colorText(text: string): HTMLDivElement {
        let container = document.createElement("div");
        //container.className="inline"
        
        text.split("#").forEach(t => {
            console.log(`t: ${t}`);
            let div = document.createElement("div");
            div.textContent = t;
            div.className = "inline ";
            
            //check for color codes!
            let [firstWord, ...rest] = t.split(" ");
            switch (firstWord) {
                case "red":
                    div.className += "text-red-400";
                    div.textContent = rest.join(" ");
                    break;
                    
                case "cyan":
                    div.className += "text-cyan-400";
                    div.textContent = rest.join(" ");
                    break;
                    
                case "green":
                    div.className += "text-green-400";
                    div.textContent = rest.join(" ");
                    break;
                    
                case "yellow":
                    div.className += "text-yellow-400";
                    div.textContent = rest.join(" ");
                    break;
                    
                default:
                    div.className += "text-white";
                    break;
            }
            
            //add content to a dummy container
            container.appendChild(div);
        })
        
        return container;
    }
    
    return(
        <div className="m-2">
            <h1 className="text-lg font-extrabold">{currentRoomId}</h1>
            <div id="output-container" className="block whitespace-pre overflow-y-auto h-80"></div>
            <form className="mt-8 w-full" onSubmit={handleSubmit}>
                <label className="w-5 font-semibold text-green-400">{`>>`}</label>
                <input className="text-white ml-2 bg-transparent focus:outline-none" autoFocus type="text" value={inputText} onChange={handleChange}/>
            </form>
        </div> 
    )
}