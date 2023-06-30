export class Entity {
    public name: string;
    public description: string;
    
    public readonly id: string;
    private static numEntities = 0;
    
    constructor(name: string, desc: string) {
        this.name = name;
        this.description = desc;
        this.id = `e${++Entity.numEntities}-${name}`
    }
}

