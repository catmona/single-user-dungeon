//color message using # as seperators
    export function colorText(text: string): HTMLDivElement {
        let container = document.createElement("div");
        container.className = ""
        
        const colors = new Map<string, string>([
            ["red", "text-red-400"],
            ["blue", "text-blue-400"],
            ["cyan", "text-cyan-400"],
            ["green", "text-green-400"],
            ["yellow", "text-yellow-400"],
            ["orange", "text-orange-400"],
            ["gray", "text-gray-400"],
            ["white", "text-white"],
        ])
        
        text.split("#").forEach(t => {
            let line = document.createElement("span");
            
            //the string to be colored, or the entire string if no colors exist
            let lineText = t;
            line.className = "console-line ";
            
            //check for color codes!
            let [firstWord, ...rest] = t.split(" ");
            let colorClass = colors.get(firstWord);
            
            //if there is a color code in the line
            if(colorClass) {
                line.className += colorClass; //color line
                lineText = rest.join(" "); //skip color code
            }
            else {
                line.className += colors.get("white"); //no color code found
            }
            
            //split line into multiple <span>'s containing individual characters
            //for animating
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