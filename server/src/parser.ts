import { Command } from "./command";
import { game_state } from "./globals";

const MAX_CHARS = 100;
const MIN_CHARS = 0;

//returns a string with what should be printed to the screen and the updated gamestate
export function parseCommand(input: string, gameState: game_state): [string, game_state] {
    //parse input and check for errors
    const [cmd, args] = parse(input);
    
    return cmd.runCommand(gameState, args);
}

function parse(input: string): [Command, string[]] {
    //check length of input against min & max
    if(input.length <= MIN_CHARS || input.length >= MAX_CHARS)
        return [Command.errorCmd, []];
    
    //separate input into array split by whitespace
    const inputs = input.split(" ");
    
    const [commandName, ...args] = inputs;
    
    //contains the command or errorCmd
    const cmd = Command.getCommand(commandName.toLowerCase());
    return [cmd, args];
}