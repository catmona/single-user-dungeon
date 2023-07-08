import { Entity } from "./entity";
import { Room } from "./room";

export interface command_info {
    args: {
        required: number;
        optional: number;
    }
}

export interface command_data {
    command: string;
    args: string[];
}

export const COMMAND_LIST = new Map<string, command_info>([
    ["look", { args: { required: 0, optional: 1 } }],
    ["l", { args: { required: 0, optional: 1 } }],
    ["examine", { args: { required: 0, optional: 1 } }],
    
    ["feed", { args: { required: 2, optional: 0 } }],
    
    ["read", { args: { required: 1, optional: 1 } }],
    
    ["north", { args: { required: 0, optional: 0 } }],
    ["east", { args: { required: 0, optional: 0 } }],
    ["south", { args: { required: 0, optional: 0 } }],
    ["west", { args: { required: 0, optional: 0 } }],
    ["n", { args: { required: 0, optional: 0 } }],
    ["e", { args: { required: 0, optional: 0 } }],
    ["s", { args: { required: 0, optional: 0 } }],
    ["w", { args: { required: 0, optional: 0 } }],
    
    ["say", { args: { required: 1, optional: 0 } }],
    
    ["yell", { args: { required: 1, optional: 0 } }],
])

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