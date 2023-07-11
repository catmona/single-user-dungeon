import { Entity } from "../entity";

export class NutEntity extends Entity {
    
    constructor() {
        super("Nut", "a small nut!");
        this.is.edible = true;
    }
}

export class AppleEntity extends Entity {
    
    constructor() {
        super("Apple", "a red juicy apple!");
        this.is.edible = true;
    }
}