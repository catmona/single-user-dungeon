import { SignEntity } from "./entities/written";
import { AppleEntity, NutEntity } from "./entities/objects";
import { SquirrelEntity } from "./entities/creatures";
import { parseCommand } from "./parser";
import { WELCOME, game_message, game_state } from "./globals";
import { Room } from "./room";
import { Command } from "./command";
import { startRoom } from "./game";

//returns the id of the starting room
export function startGame(): string {
    Command.setupCommands();
    
    const start = startRoom;
    
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
    loginMessage += `#Welcome to the world of #yellow [Kenopsia]#! type "#red look#" or #red l# to take a look around, and #red help# if you're lost!`;
    
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
