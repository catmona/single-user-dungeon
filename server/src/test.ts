import { Entity } from "./entity";
import { Room } from "./room";


export function startGame() {
        const start = new Room("start", "a test room");
    start.entities = [
        new Entity("box", "a normal box")
    ]

    const end = new Room("end", "the finishing room");
    end.entities = [
        new Entity("squirrel", "a normal squirrel")
    ]

    start.setExit("N", end);    
}
