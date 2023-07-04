import { COMMAND_LIST } from "./globals";

const MAX_CHARS = 50;
const MIN_CHARS = 0;

interface command_data {
    command: string;
    args: string[];
}

//returns {command, args[]}. Command contains "undefined" if an error occurs.
export function parseInput(input: string): command_data {
    let command = "";
    const args = new Array<string>();
    
    //check length of input against min & max
    if(input.length <= MIN_CHARS || input.length >= MAX_CHARS)
        return {command: "undefined", args: ["incorrect string entered"]};
    
    //separate input into array split by whitespace
    const inputs = input.split(" ");
    
    //lowercase first word if it exists
    if(inputs[0]) inputs[0] = inputs[0].toLowerCase();
    
    //make sure there isn't more than 1 command entered at once, but at least 1 command
    let foundCommand = false;
    inputs.forEach(w => {
        if(COMMAND_LIST.has(w)) {
            if(foundCommand) return {command: "undefined", args: ["too many commands entered"]}; //too many commands found
            foundCommand = true;
        }
    })
    
    if(!foundCommand) return {command: "undefined", args: ["no valid command found"]}; //no command found
    
    //check input for valid command
    const cmd = COMMAND_LIST.get(inputs[0]);
    if(cmd == undefined) return {command: "undefined", args: ["first word isn't a command"]}; //first word is not a valid command
    
    //set command to the valid command name
    command = inputs[0];
    console.debug(`command found: ${command}`);
    
    //trash the command from the input list
    inputs.shift();
    
    //if command has optional or required arguments, check inputs
    if(cmd.args.required > 0 || cmd.args.optional > 0) {
        let foundReq = 0, foundOpt = 0;
        inputs.forEach(w => {
            //if an odd number of commands found, discard optional connector words like "and" or "with"
            if(args.length % 2 == 1) {
                switch (w) {
                    case "a":
                    case "and":
                    case "with":
                    case "an":
                    case "the":
                        return; //continue to next word
                    default:
                        break;
                }
            }
            
            //TODO: number for entities. Squirrel.1 for example
            
            //add word to arg list
            args.push(w);
            
            if(foundReq < cmd.args.required) foundReq++;
            else if(foundOpt < cmd.args.optional) foundOpt++;
        })
        
        if(foundReq > cmd.args.required || foundOpt > cmd.args.optional) 
        return {command: "undefined", args: ["too many entities entered"]}; //too many arguments found for given command
    }
    
    return {command, args};
}