import { SignEntity } from "./entities/interactable";
import { NutEntity } from "./entities/nut";
import { SquirrelEntity } from "./entities/squirrel";
import { Entity } from "./entity";
import { parseCommand } from "./game";
import { game_message, game_state } from "./globals";
import { Room } from "./room";

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
    const welcomeMessage = "placeholder welcome text!\n\nEnter character's name:";
    
    return { message: welcomeMessage, roomId: "login" };
}

export function login(startRoomId: string): game_message {
    const loginMessage = `Account not found. Creating new guest account and joining server...\n\nWelcome to the world of #yellow [placeholder name]#! type "#red look#" to take a look around!`;
    
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
