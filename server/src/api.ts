import { SignEntity } from "./entities/interactable";
import { NutEntity } from "./entities/nut";
import { SquirrelEntity } from "./entities/squirrel";
import { parseCommand } from "./parser";
import { WELCOME, game_message, game_state } from "./globals";
import { Room } from "./room";
import { readFileSync } from "fs";

//returns the id of the starting room
export function startGame(): string {
    const start = new Room("start", "a test room");
    start.entities = [
        new SquirrelEntity(),
        new NutEntity(),
        new SignEntity("wow! you can read without glasses!"),
    ]

    const end = new Room("end", "the finishing room");
    const a = new SquirrelEntity();
    const b = new NutEntity();
    
    end.entities = [
        a, b
    ]

    start.setExit("N", end);  
    
    return start.id;
}

export function promptLogin(): game_message {
    const welcomeMessage = WELCOME + "\n\nEnter your account name to continue thy adventure:";
    console.log(welcomeMessage)
    return { message: welcomeMessage, roomId: "login" };
}

export function login(startRoomId: string): game_message {
    let loginMessage = `#red Error fetching character - account has been permanently deleted. Creating new guest account and joining server...\n`;
    loginMessage += `                                                              \n`;
    loginMessage += `#Welcome to the world of #yellow [Kenopsia]#! type "#red look#" to take a look around, and maybe "#red read#" the #red Sign#!`;
    
    return { message: loginMessage, roomId: startRoomId }
}

export function message(gameMessage: game_message): game_message {
    const currentRoom = Room.getRoomById(gameMessage.roomId);
    
    //check for invalid room id
    if(currentRoom == undefined) {
        return {message: "error: invalid room ID!", roomId: gameMessage.roomId};
    }
    
    //room id is valid
    const gameState = { room: currentRoom };
    const [message, newState] = parseCommand(gameMessage.message, gameState)
    return({ message: message, roomId: newState.room.id });
}
