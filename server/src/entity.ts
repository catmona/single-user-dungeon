export class Entity {
    public name: string;
    public description: string;
    public is: Record<string, boolean> = {}
    
    public readonly id: string;
    private static numEntities = 0;
    
    constructor(name: string, desc: string) {
        this.name = name;
        this.description = desc;
        this.id = `e${++Entity.numEntities}-"${name}"`
        
        this.is.edible = false;
        this.is.feedable = false;
        this.is.examineable = true;
    }
    
    public static look(target: Entity): string {
        if(!target.is.examineable)
            return `You can't see the ${target.name}`
        
        return target.description;
    }
    
    public static feed(target: Entity, food: Entity): string {
        if(!target.is.feedable)
        return `${target.name} doesn't eat food!`;
        
        if(!food.is.edible)
            return `${food.name} isn't edible!`; 
       
        return `${target.name} ate the ${food.name}`;
            
    }
    
}

