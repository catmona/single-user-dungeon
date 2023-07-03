import { Entity } from "../entity";

export class SquirrelEntity extends Entity {
    
    constructor() {
        super("Squirrel", "a cute lil guy", "squirl");
        this.is.feedable = true;
    }
}