//color message using # as seperators
    export function colorText(text: string): HTMLDivElement {
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
    
//process text into a div which can be added to the output container
export function processText(text: string, color: boolean): HTMLDivElement {
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