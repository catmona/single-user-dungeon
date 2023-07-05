import { ChangeEvent, FormEvent, useEffect, useState } from "react";
const ENDPOINT = "http://localhost:8000";

export default function Test() {
    const [res, setRes] = useState(0);
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    
    useEffect(() => {
        fetch(ENDPOINT)
            .then(res =>res.text())
            .then(out => setRes(out))
    })
    
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
                input: inputText,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(out => console.log(out))
        
    }
    
    return(
        <div>
            {res}
            <span>{outputText}</span>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputText} onChange={handleChange}/>
            </form>
        </div>
    )
}