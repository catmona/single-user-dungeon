import { ChangeEvent, FormEvent, useEffect, useState } from "react";
const ENDPOINT = "http://localhost:8000";

interface game_message {
    message: string;
    roomId: string;
}

export default function Test() {
    const [currentRoomId, setcurrentRoomId] = useState("login");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState<HTMLDivElement>();
    
    //get starting room when first loading page
    useEffect(() => {
        messageServer();
    }, [])
    
    //fires whenever the user types in the input box
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputText(event.target.value);
    }
    
    //fires when the user presses enter on the input box
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); //prevent default behaviour (reloading webpage)
        console.debug(`input: ${inputText}`);
        
        //log user command in output container
        setOutputText(processText(inputText, false));
        
        //try to process user-entered command on the server
        messageServer();
    }
    
    async function messageServer() {
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
        .then(res => res.json()) //convert output to object
        .then(out => handleOutput(out)); //handle server output
            //TODO: handle errors
    }
    
    //clears input text, changes roomID, and processess the output from the server
    function handleOutput(output: game_message) {
        //TODO: handle errors
        setInputText(""); //clear input field
        setcurrentRoomId(output.roomId);
        setOutputText(processText(output.message, true));
    }
    
    //whenever we get new output, add it to the output container log
    useEffect(() => {
        const container = document.getElementById("output-container");
        if(!container) return;
        
        //add new output to container
        if(outputText) container.appendChild(outputText);
        
        //scroll to bottom of scrollbox
        const scrollbox = container.parentElement;
        if(scrollbox) scrollbox.scrollTop = scrollbox.scrollHeight;
        
    }, [outputText])
    
    //process text into a div which can be added to the output container
    function processText(text: string, color: boolean): HTMLDivElement {
        if(color) 
            return colorText(text);
        
        //if not coloring, assume it's input
        let container = document.createElement("div");
        
        //pre is the two chevrons, ">>", used to denote user input
        let pre = document.createElement("div");
        let input = document.createElement("div");
        
        container.appendChild(pre);
        container.appendChild(input);
        
        pre.className = "inline text-green-400 font-semibold font-mono";
        input.className = "inline font-mono";
        
        //newline to create a space between the previous log entry and the new one
        pre.textContent = "\n>> ";
        input.textContent = text;
        
        return container;
    }
    
    //color message using # as seperators
    function colorText(text: string): HTMLDivElement {
        let container = document.createElement("div");
        container.className = " "
        
        text.split("#").forEach(t => {
            let text = document.createElement("span");
            
            //the string to be colored, or the entire string if no colors exist
            text.textContent = t; 
            text.className = " ";
            
            //check for color codes!
            let [firstWord, ...rest] = t.split(" ");
            switch (firstWord) {
                case "red":
                    text.className += "text-red-400";
                    text.textContent = rest.join(" "); //skip color code
                    break;
                    
                case "cyan":
                    text.className += "text-cyan-400";
                    text.textContent = rest.join(" "); //skip color code
                    break;
                    
                case "green":
                    text.className += "text-green-400";
                    text.textContent = rest.join(" "); //skip color code
                    break;
                    
                case "yellow":
                    text.className += "text-yellow-400";
                    text.textContent = rest.join(" "); //skip color code
                    break;
                    
                default:
                    text.className += "text-white";
                    //no color code to skip, assume white
                    break;
            }
            
            //add content to a dummy container
            container.appendChild(text);
        })
            
        return container;
    }
    
    return(
        <div className="m-2 font-mono">
            <h1 className="text-lg font-extrabold">{currentRoomId}</h1>
            <div className="overflow-y-auto md:max-h-[80vh] max-h-[85vh]">
                <div id="output-container" className="block whitespace-pre-wrap break-words"></div>
                <form className="mt-8 w-full flex flex-row" onSubmit={handleSubmit}>
                    <label className="inline w-5 font-semibold text-green-400">{`>>`}</label>
                    <input className="inline text-white ml-2 w-full font-mono caret-white bg-transparent focus:outline-none" autoFocus type="text" value={inputText} onChange={handleChange}/>
                </form>
            </div>
        </div> 
    )
}