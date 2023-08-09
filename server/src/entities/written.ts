import { Entity } from "../entity";

export class SignEntity extends Entity {
    
    constructor(content: string) {
        super("Sign", "a wooden signboard");
        this.is.readable = true;
        this.content = content;
    }
}