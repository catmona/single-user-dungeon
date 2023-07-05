export class Entity {
    private name: string;
    public description: string;
    public content: string;
    public is: Record<string, boolean> = {}
    public alias: Set<string>;
    
    //automatically generated: `e1-"box"`
    public readonly id: string;
    private static numEntities = 0;
    
    constructor(name: string, desc: string, ...aliases: string[]) {
        this.name = name;
        this.description = desc;
        this.content = "";
        this.id = `e${++Entity.numEntities}-"${name}"`
        
        //add aliases
        this.alias = new Set<string>([...aliases]);
        this.alias.add(name.toLowerCase());
        
        //set all adjectives to false to begin with, except for examineable
        this.is.edible = false; //can be eaten
        this.is.feedable = false; //can be used as food
        this.is.examineable = true; //can be looked at to see its description
        this.is.readable = false; //has content that can be read
    }
    
    public getName(): string {
        return `#red ${this.name}#`
    }
    
    
    //static methods for interacting with entities. 
    //TODO: move these to a seperate file?
    
    //shows the description of an entity.
    public static look(target: Entity): string {
        if(!target.is.examineable)
            return `You can't see the ${target.getName()}`
        
        return target.description;
    }
    
    //makes the target eat the food entity
    //TODO: check for inanimate/animate entities, item removal from room, effect from eating, etc.
    public static feed(target: Entity, food: Entity): string {
        if(!target.is.feedable)
            return `${target.getName()} doesn't eat food!`;
        
        if(!food.is.edible)
            return `${food.getName()} isn't edible!`; 
       
        return `${target.getName()} ate the ${food.getName()}`;
            
    }
    
    //prints the content of an entity
    //TODO: multiple pages
    public static read(target: Entity): string {
        if(!target.is.readable)
            return `You can't read a ${target.getName()}!`;
        
        if(target.content.length <= 0)
            return `You tried to read the the ${target.getName()}, but it's blank!`;
            
        return `You read the ${target.getName()}.\n${target.content}`;
    }
    
}

