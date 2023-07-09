import { Command } from "./command";
import { game_state } from "./globals";

const MAX_CHARS = 100;
const MIN_CHARS = 0;

//returns {command, args[]}. Command contains "undefined" if an error occurs.
export function parseInput(input: string): [Command, string[]]{
    const args = new Array<string>();
    
    //check length of input against min & max
    if(input.length <= MIN_CHARS || input.length >= MAX_CHARS)
        return [Command.errorCmd, []];
    
    //separate input into array split by whitespace
    const inputs = input.split(" ");
    
    //lowercase first word if it exists
    if(inputs[0]) inputs[0] = inputs[0].toLowerCase();
    
    //make sure there isn't more than 1 command entered at once, but at least 1 command
    let foundCommand = false;
    inputs.forEach(w => {
        if(Command.commandList.has(w)) {
            if(foundCommand) return [Command.errorCmd, []]; //too many commands found
            foundCommand = true;
        }
    })
    
    if(!foundCommand) return [Command.errorCmd, []]; //no command found
    
    //check input for valid command
    const cmd = Command.getCommand(inputs[0]);
    console.debug(`command: ${cmd}`);
    
    //trash the command from the input list
    inputs.shift();
    
    //if command has optional or required arguments, check inputs
    if(cmd.reqArgs > 0 || cmd.optArgs > 0) {
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
            
            if(foundReq < cmd.reqArgs) foundReq++;
            else if(foundOpt < cmd.optArgs) foundOpt++;
        })
        
        if(foundReq > cmd.reqArgs || foundOpt > cmd.optArgs) 
        return [Command.errorCmd, []]; //too many arguments found for given command
    }
    
    return [cmd, args];
}


//returns a string with what should be printed to the screen and the updated gamestate
export function parseCommand(input: string, gameState: game_state): [string, game_state] {
    //parse input and check for errors
    const [cmd, args] = parseInput(input);
    
    return cmd.runCommand(gameState, args);
}
