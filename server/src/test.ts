import { NutEntity } from "./entities/nut";
import { SquirrelEntity } from "./entities/squirrel";
import { Entity } from "./entity";
import { parseCommand } from "./game";
import { Room } from "./room";


export function startGame() {
        const start = new Room("start", "a test room");
    start.entities = [
        new SquirrelEntity(),
        new NutEntity()
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
    console.log(parseCommand("feed squirrel", { room: start })); 
}
