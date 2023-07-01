export abstract class Entity {
    public name: string;
    public description: string;
    public is: Record<string, boolean> = {}
    
    //automatically generated: `e1-"box"`
    public readonly id: string;
    private static numEntities = 0;
    
    constructor(name: string, desc: string) {
        this.name = name;
        this.description = desc;
        this.id = `e${++Entity.numEntities}-"${name}"`
        
        //set all adjectives to false to begin with, except for examineable
        this.is.edible = false; //can be eaten
        this.is.feedable = false; //can be used as food
        this.is.examineable = true; //can be looked at to see its description
    }
    
    //static methods for interacting with entities. 
    //TODO: move these to a seperate file?
    
    //shows the description of an entity.
    public static look(target: Entity): string {
        if(!target.is.examineable)
            return `You can't see the ${target.name}`
        
        return target.description;
    }
    
    //makes the target eat the food entity
    //TODO: check for inanimate/animate entities, item removal from room, effect from eating, etc.
    public static feed(target: Entity, food: Entity): string {
        if(!target.is.feedable)
        return `${target.name} doesn't eat food!`;
        
        if(!food.is.edible)
            return `${food.name} isn't edible!`; 
       
        return `${target.name} ate the ${food.name}`;
            
    }
    
}

