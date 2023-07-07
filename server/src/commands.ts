import { Entity } from "./entity";
import { UndefinedEntity, command_data, game_state } from "./globals";

export class Commands {
        
    public static look(info: command_data, gameState: game_state): [string, game_state] {
        let target1 = new UndefinedEntity;
        
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
    }
    
    public static feed(info: command_data, gameState: game_state): [string, game_state] {
        let target1 = new UndefinedEntity;
        let target2 = new UndefinedEntity;
        
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
    }
    
    static read(info: command_data, gameState: game_state): [string, game_state] {
        let target1 = new UndefinedEntity;
        
        if(info.args.length == 1) {
            //get entity from the entered string
            target1 = gameState.room.getEntityFromAlias(info.args[0]);
            if(!(target1 instanceof UndefinedEntity)) 
                return [Entity.read(target1), gameState];
            else return ["target entity not found!", gameState];
        }
        //print message prompting the user to enter in arguments
        else return ["read what?", gameState];
    }
    
    static move(info: command_data, gameState: game_state): [string, game_state] {
        const newRoom = gameState.room.getExit(info.command);
        if(newRoom == undefined) return ["You can't go that direction.", gameState];
        else gameState.room = newRoom;
        return [gameState.room.printRoom(), gameState];
    }
    
    static say(info: command_data, gameState: game_state): [string, game_state] {
        if(info.args.length == 1) {
            return [`You say, #yellow ${info.args[0]}#`, gameState];
        }
        
        else return ["say what?", gameState];
    }
}
