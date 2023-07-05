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
        new SignEntity("@red wow! you can read without glasses!"),
    ]

    const end = new Room("end", "the finishing room");
    const a = new SquirrelEntity();
    const b = new NutEntity();
    
    end.entities = [
        a, b
    ]

    start.setExit("N", end);  
    
    // console.log(parseCommand("test", { room: start })); 
    // console.log(parseCommand("look", { room: start })); 
    // console.log(parseCommand("look squirrel", { room: start })); 
    //console.log(parseCommand("read sign", { room: start })[0]); 
    return start.id;
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
