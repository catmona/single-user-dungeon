import { useEffect, useState } from "react";

export default function Test() {
    const [res, setRes] = useState(0);
    
    useEffect(() => {
        fetch("http://localhost:8000")
            .then(res =>res.text())
            .then(out => setRes(out))
    })
    
    return(
        <div>
            {res}
        </div>
    )
}