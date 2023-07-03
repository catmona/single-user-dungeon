import { COMMAND_LIST } from "./globals";

const MAX_CHARS = 50;
const MIN_CHARS = 0;

//returns true if the input is a valid command, false otherwise
export function parseInput(input: string): boolean {
    let command = "";
    const args = new Array<string>();
    
    //check length of input against min & max
    if(input.length <= MIN_CHARS || input.length >= MAX_CHARS)
        return false;
    
    //separate input into array split by whitespace
    const inputs = input.split(" ");
    
    //make sure there isn't more than 1 command entered at once, but at least 1 command
    let foundCommand = false;
    inputs.forEach(w => {
        if(COMMAND_LIST.has(w)) {
            if(foundCommand) return false; //too many commands found
            foundCommand = true;
        }
    })
    
    if(!foundCommand) return false; //no command found
    
    //check input for valid command
    const cmd = COMMAND_LIST.get(inputs[0]);
    if(cmd == undefined) return false; //first word is not a valid command
    
    //set command to the valid command name
    command = inputs[0];
    
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
                        return; //continue to next word
                    default:
                        break;
                }
            }
            
            //add word to arg list
            args.push(w);
            
            if(foundReq < cmd.args.required) foundReq++;
            else if(foundOpt < cmd.args.optional) foundOpt++;
        })
    }
    
    return parseCommand(command, args);
}

//returns true if parse completes, false otherwise
function parseCommand(cmd: string, args: string[]): boolean {
        //get entities from arguments
        
    
        //connect names to entities in room if they exist in the current room
        
        return false;
}
