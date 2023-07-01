import { Entity } from "../entity";

export class SquirrelEntity extends Entity {
    
    constructor() {
        super("Squirrel", "a cute lil guy");
        this.is.feedable = true;
    }
}