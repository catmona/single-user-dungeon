import { exit } from "process";
import { Entity } from "./entity";

export class Room {
    public name: string;
    public description: string;
    public entities?: Entity[];
    private exit = new Array<Room>(4)
    
    public readonly id: string;
    private static numRooms = 0;
    
    constructor(name: string, desc: string) {
        this.name = name;
        this.description = desc;
        this.id = `r${++Room.numRooms}-"${name}"`;
    }
    
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
    
    public printRoom(): string {
        return(`${this.name}\n${this.description}\n${this.printExits()}`);
    }
 }
