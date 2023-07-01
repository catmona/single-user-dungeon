import { Entity } from "../entity";

export class NutEntity extends Entity {
    
    constructor() {
        super("Nut", "a small nut!");
        this.is.edible = true;
    }
}