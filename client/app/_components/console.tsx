import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { processText } from "./helpers/utilities";
import { gsap } from "gsap";
import styles from '../_styles/console.module.css'

const ENDPOINT = "http://localhost:8000";

interface game_message {
    message: string;
    roomId: string;
}

export default function Console() {
    const [currentRoomId, setcurrentRoomId] = useState("login");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState<HTMLDivElement>();
    
    const [inputHistory, setInputHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    
    //get starting room when first loading page
    useEffect(() => {
        messageServer();
    }, [])
    
    //fires whenever the user types in the input box
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputText(event.target.value);
        
        //reset history index
        // setHistoryIndex(-1);
    }
    
    //change width of input text field whenever input text changes
    useEffect(() => {
        const input = document.getElementById("console-input");
        if(input) input.style.width = inputText.length + "ch";
        
    }, [inputText]);
    
    //fires when the user presses enter on the input box
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); //prevent default behaviour (reloading webpage)
        console.debug(`input: ${inputText}`);
        if(inputText === "") return;
        
        //add input to the user's input history
        if(inputText != "" && inputHistory[0] != inputText)
            setInputHistory(oldHistory => [inputText, ...oldHistory]);
        
        //reset history index
        setHistoryIndex(-1);
        
        //log user command in output container
        setOutputText(processText(inputText, false));
        
        //try to process user-entered command on the server
        messageServer();
    }
    
    async function messageServer() {
        fetch(ENDPOINT + "/api/message", {
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
    
    useEffect(() => {
        console.debug(historyIndex);
        if(historyIndex >= 0) {
            setInputText(inputHistory[historyIndex]);
        }
        else {
            setInputText("");
        }
    }, [historyIndex])
    
    function handleArrows(event: KeyboardEvent) {
        if(event.key == "ArrowUp" || event.key == "ArrowDown")
            lookHistory(event);
        else if(event.key == "ArrowLeft" || event.key == "ArrowRight")
            event.preventDefault();
    }
    
    // function moveCaret(event: KeyboardEvent) {
    //     const caret = document.getElementById("console-caret");
    //     if(!caret) return;
        
    //     if(event.key == "ArrowLeft") {
            
    //     }
    //     else if(event.key == "ArrowRight") {
            
    //     }
    // }
    
    
    function lookHistory(event: KeyboardEvent) {
        if(event.key == "ArrowUp") {
            event.preventDefault();
            if(historyIndex < inputHistory.length - 1)
                setHistoryIndex(historyIndex + 1);  
        }
        
        else if(event.key == "ArrowDown") {
            event.preventDefault();
            if(historyIndex > -1) 
                setHistoryIndex(historyIndex - 1);           
        }
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
        
        //animate!
        if(!outputText) return;
        
        let toAnimate = outputText.querySelectorAll(".console-char");
        let inputField = document.getElementById("console-input");
        let inputLabel = document.getElementById("console-label");
        
        gsap.to(toAnimate, {
            opacity: 1,
            stagger: 0.01,
            delay: 0.0,
            duration: 0.0,
            onStart: () => {
                inputField!.setAttribute("disabled", "disabled")
                inputLabel!.classList.remove("text-green-400");
                inputLabel!.classList.add("text-gray-500");
            },
            onComplete: () => {
                inputField!.removeAttribute("disabled");
                inputField!.focus();
                inputLabel!.classList.add("text-green-400");
                inputLabel!.classList.remove("text-gray-500");
                combineSpans(outputText.querySelectorAll(".console-line"));
            },
        })
        
    }, [outputText])
    
    //combine individual character spans back into spans consisting of words
    function combineSpans(lines: NodeList) {
        //for every line (different color code)
        lines.forEach(line => {
            const lineText = line.textContent; //gets the cumulative string from all children nodes
            line.textContent = lineText; //removes all children of the node 
        })
    }
    
    function focusInput() {
        const input = document.getElementById("console-input");
        if(input) input.focus();
    }
    
    
    return(
        <div className="m-2 font-mono pl-1 text-md lg:text-lg" onClick={e => focusInput()}>
            <div className={styles.crt}>
                {/* <h1 className="text-lg font-extrabold">{currentRoomId.split("\"")[1] || "login"}</h1> */}
                <div className="overflow-y-auto md:max-h-[80vh] max-h-[85vh]">
                    <div id="output-container" className="block whitespace-pre-wrap break-words"></div>
                    <form className="mt-8 w-full flex flex-row" onSubmit={handleSubmit}>
                        <label id="console-label" className="inline w-5 font-semibold text-green-400">{`>>`}</label>
                        <input 
                            className="inline peer text-white ml-2 max-w-full font-mono caret-transparent bg-transparent focus:outline-none" 
                            onKeyDown={e => handleArrows(e)} 
                            autoFocus 
                            type="text" 
                            value={inputText} 
                            onChange={handleChange}
                            id="console-input"
                        />
                        <span id="console-caret" className="w-[1ch] bg-gray-200 h-[20px] inline-block animate-caret invisible peer-focus:visible"/>
                    </form>
                </div>
            </div>
        </div> 
    )
}