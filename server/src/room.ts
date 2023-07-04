import { exit } from "process";
import { Entity } from "./entity";
import { UndefinedEntity } from "./globals";

export class Room {
    public name: string;
    public description: string;
    public entities?: Entity[];
    private exit = new Array<Room>(4)
    
    //automatically generated: `r1-"start room"`
    public readonly id: string;
    private static numRooms = 0;
    
    constructor(name: string, desc: string) {
        this.name = name;
        this.description = desc;
        this.id = `r${++Room.numRooms}-"${name}"`;
    }
    
    //returns an entity with a matching alias if it exists
    public getEntityFromAlias(alias: string, n = 1): Entity {
        if(!alias) {
            console.debug("no matching entity found!");
            return new UndefinedEntity;
        }
        //convert input to lowercase just in case
        alias = alias.toLowerCase();
        let i = 0;
        let last = new Entity("", "");
        console.debug(`Looking for entity with alias: ${alias}`)
        
        //check for "n"th occurance of a matching alias
        this.entities?.forEach(e => {
            if(e.alias.has(alias)) {
                i++;
                last = e;
                if(i == n) {
                    return;
                }
            }
        })
        
        //if matching entity was found but not the "n"th occurance, return the last matching entity instead
        if(i > 0) {
            console.debug(`entity found: ${last.id}`);
            return last;
        }
        
        //if no matching entity was found, return undefined
        console.debug("no matching entity found!");
        return new UndefinedEntity;
    }
    
    //Sets an exit to a room. It also sets that room's entrance to lead back to 
    //the current room. This can be disabled by setting oneWay to true.
    public setExit(dir: string, room: Room, oneWay = false): void {
        switch (dir) {
            case "N":
                this.exit[0] = room;
                if(!oneWay) room.setExit("S", this, true);
                break;
            case "E":
                this.exit[1] = room;
                if(!oneWay) room.setExit("W", this, true);
                break;
            case "S":
                this.exit[2] = room;
                if(!oneWay) room.setExit("N", this, true);
                break;
            case "W":
                this.exit[3] = room;
                if(!oneWay) room.setExit("E", this, true);
                break;
            default:
                console.debug(`incorrect room exit ${dir} assigned to room ${this.id}`);
                exit;
        }
    }
    
    public getExit(dir: string): Room | null {
        switch (dir) {
            case "N":
                return this.exit[0];
            case "E":
                return this.exit[1];
            case "S":
                return this.exit[2];
            case "W":
                return this.exit[3];
            default:
                return null;
        }
    }
    
    //Prints entities one after the other.
    //TODO: needs a/an formatting and different description for if an entity is inanimate or not.
    public printEntities(): string {
        let out = "";
        this.entities?.forEach(function(e: Entity) {
            out += `There is a ${e.name} here.\n`
        })
        
        return out;
    }
    
    //prints the exits to a room like [ North, East, South, West ]
    public printExits(): string {
        let out = "Possible Exits: \n[ "
        let numExits = 0;
        
        for(let i = 0; i < this.exit.length; i++) {
            if(this.exit[i] != undefined) {
                numExits++;
                if(numExits > 1) out += ", ";
                
                if(i == 0) out += "North";
                else if(i == 1) out += "East";
                else if(i == 2) out += "South";
                else out += "West";
            }
        }
        
        if (numExits == 0) out = "No Possible Exits."
        else out += " ]"
        return out;
    }
    
    //prints all the details about a room, for when the user enters it.
    public printRoom(): string {
        return(`${this.name}\n${this.description}\n${this.printEntities()}\n${this.printExits()}`);
    }
 }
