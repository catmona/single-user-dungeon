import { Entity } from "./entity";
import { Room } from "./room";

export interface game_state {
    room: Room;
}

export interface game_message {
    message: string;
    roomId: string;
}

export class UndefinedEntity extends Entity {
    constructor() {
        super("undefined", "an undefined entity");
    }
}

export const WELCOME =               
`  /\\ /\\___ _ __   ___  _ __  ___(_) __ _ 
 / //_/ _ \\ '_ \\ / _ \\| '_ \\/ __| |/ _\` |
/ __ \\  __/ | | | (_) | |_) \\__ \\ | (_| |
\\/  \\/\\___|_| |_|\\___/| .__/|___/_|\\__,_|
                      |_|                
Welcome to #cyan Kenopsia MUD#
Players Currently Online: #yellow 1#
Last Connection from this IP: #yellow July 10, 2005#
`

export const HELP = 
`
placeholder help message
`