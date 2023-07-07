//color message using # as seperators
    export function colorText(text: string): HTMLDivElement {
        let container = document.createElement("div");
        container.className = ""
        
        text.split("#").forEach(t => {
            let line = document.createElement("span");
            let lineText = t;
            
            //the string to be colored, or the entire string if no colors exist
            //line.textContent = t; 
            line.className = "";
            
            //check for color codes!
            let [firstWord, ...rest] = t.split(" ");
            switch (firstWord) {
                case "red":
                    line.className += "text-red-400";
                    lineText = rest.join(" "); //skip color code
                    break;
                    
                case "cyan":
                    line.className += "text-cyan-400";
                    lineText = rest.join(" "); //skip color code
                    break;
                    
                case "green":
                    line.className += "text-green-400";
                    lineText = rest.join(" "); //skip color code
                    break;
                    
                case "yellow":
                    line.className += "text-yellow-400";
                    lineText = rest.join(" "); //skip color code
                    break;
                    
                default:
                    line.className += "text-white";
                    //no color code to skip, assume white
                    break;
            }
            
            for(const c of lineText) {
                let char = document.createElement("span");
                char.textContent = c;
                char.className = "console-char opacity-0 transition-opacity"
                
                line.appendChild(char);
            }
            
            //add content to a dummy container
            container.appendChild(line);
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