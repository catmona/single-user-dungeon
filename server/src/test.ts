import { NutEntity } from "./entities/nut";
import { SquirrelEntity } from "./entities/squirrel";
import { Entity } from "./entity";
import { Room } from "./room";


export function startGame() {
        const start = new Room("start", "a test room");
    start.entities = [
        new SquirrelEntity()
    ]

    const end = new Room("end", "the finishing room");
    const a = new SquirrelEntity();
    const b = new NutEntity();
    
    end.entities = [
        a, b
    ]

    start.setExit("N", end);  
    console.log(start.printRoom()); 
    console.log(Entity.feed(a, b)) 
}
