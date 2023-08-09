import { Entity } from "../entity";

export class SquirrelEntity extends Entity {
    
    constructor() {
        super("Squirrel", "An objectively cute and majestic creature. If there's food nearby, maybe you can try to #red feed# it? If you dont know how, type #red help feed#!", "squirl");
        this.is.feedable = true;
    }
}