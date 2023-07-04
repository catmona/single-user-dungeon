import { Entity } from "./entity";
import { UndefinedEntity, game_state } from "./globals";
import { parseInput } from "./parser";
import { Room } from "./room";

//returns a string with what should be printed to the screen and the updated gamestate
export function parseCommand(input: string, gameState: game_state): [string, game_state] {
    //parse input and check for errors
    const info = parseInput(input);
    if(info.command == "undefined") return [info.args[0], gameState];
    
    let target1 = new Entity("undefined", "an undefined entity");
    let target2 = new UndefinedEntity;
    let newRoom: Room | undefined;
    console.debug(info);
    
    switch(info.command) {
        case "look":
            if(info.args.length > 0) {
                //get entity from the entered string
                target1 = gameState.room.getEntityFromAlias(info.args[0]);
                // console.log(target1);
                if(!(target1 instanceof UndefinedEntity)) 
                    return [Entity.look(target1), gameState];
                else return ["target entity not found!", gameState];
            }
            //print description of room if no arguments entered
            else return [gameState.room.printRoom(), gameState];
            
        case "feed":
            if(info.args.length == 2) {
                //get entities from the entered string
                target1 = gameState.room.getEntityFromAlias(info.args[0]);
                target2 = gameState.room.getEntityFromAlias(info.args[1]);
                if(!(target1 instanceof UndefinedEntity || target2 instanceof UndefinedEntity)) 
                    return [Entity.feed(target1, target2), gameState];
                else return ["one or both target entities not found!", gameState];
            }
            //print message prompting the user to enter in arguments
            else return ["feed what to what?", gameState];
            
        case "read":
            if(info.args.length == 1) {
                //get entity from the entered string
                target1 = gameState.room.getEntityFromAlias(info.args[0]);
                if(!(target1 instanceof UndefinedEntity)) 
                    return [Entity.read(target1), gameState];
                else return ["target entity not found!", gameState];
            }
            //print message prompting the user to enter in arguments
            else return ["read what?", gameState];
            
        case "north":
        case "east":
        case "south":
        case "west":
        case "n":
        case "e":
        case "s":
        case "w":
            newRoom = gameState.room.getExit(info.command);
            if(newRoom == undefined) return ["You can't go that direction.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
        
        default:
            return [`Unrecognized command: ${info.command}`, gameState];
        
    }
}
