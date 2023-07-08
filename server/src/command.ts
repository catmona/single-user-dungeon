import { Entity } from "./entity";
import { UndefinedEntity, game_state } from "./globals";

interface Func {
    (gameState: game_state, args: string[]): [string, game_state]
}

export class Command {
    public reqArgs = 0; //required # of arguments
    public optArgs = 0; //optional # of arguments
    private func: Func;
    
    constructor(reqArgs: number, optArgs: number, func: Func) {
        this.reqArgs = reqArgs;
        this.optArgs = optArgs;
        this.func = func;
    }
    
    public runCommand(gameState: game_state, args: string[]): [string, game_state] {
        if(this.func) return this.func(gameState, args);
        
        return(["command not found", gameState]);
    }
}


export class CommandList {
    static commandList: Map<string, Command>
    static errorCmd = new Command(0, 0, function(gameState: game_state, args: string[]): [string, game_state] {
        return ["What?", gameState];
    });
    
    static getCommand(name: string): Command {
        const cmd = this.commandList.get(name);
        if(cmd == undefined) return this.errorCmd;
        
        return cmd;
    }
    
    static setupCommands() {
        
        const lookCmd = new Command(0, 1, function(gameState: game_state, args: string[]): [string, game_state] {
            let target1 = new UndefinedEntity;
        
            if(args.length > 0) {
                //get entity from the entered string
                target1 = gameState.room.getEntityFromAlias(args[0]);
                // console.log(target1);
                if(!(target1 instanceof UndefinedEntity)) 
                    return [Entity.look(target1), gameState];
                else return ["target entity not found!", gameState];
            }
            //print description of room if no arguments entered
            else return [gameState.room.printRoom(), gameState];
        });
        
        const feedCmd = new Command(2, 0, function(gameState: game_state, args: string[]): [string, game_state] {
            let target1 = new UndefinedEntity;
            let target2 = new UndefinedEntity;
            
            if(args.length == 2) {
                //get entities from the entered string
                target1 = gameState.room.getEntityFromAlias(args[0]);
                target2 = gameState.room.getEntityFromAlias(args[1]);
                if(!(target1 instanceof UndefinedEntity || target2 instanceof UndefinedEntity)) 
                    return [Entity.feed(target1, target2), gameState];
                else return ["one or both target entities not found!", gameState];
            }
            //print message prompting the user to enter in arguments
            else return ["feed what to what?", gameState];
        });
        
        const readCmd = new Command(1, 0, function(gameState: game_state, args: string[]): [string, game_state] {
            let target1 = new UndefinedEntity;
        
            if(args.length == 1) {
                //get entity from the entered string
                target1 = gameState.room.getEntityFromAlias(args[0]);
                if(!(target1 instanceof UndefinedEntity)) 
                    return [Entity.read(target1), gameState];
                else return ["target entity not found!", gameState];
            }
            //print message prompting the user to enter in arguments
            else return ["read what?", gameState];
        });
        
        const moveNCmd = new Command(1, 0, function(gameState: game_state, args: string[]): [string, game_state] {
            const newRoom = gameState.room.getExit("N");
            if(newRoom == undefined) return ["You can't go North.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
        });
        
        const moveSCmd = new Command(1, 0, function(gameState: game_state, args: string[]): [string, game_state] {
            const newRoom = gameState.room.getExit("S");
            if(newRoom == undefined) return ["You can't go South.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
        });
        
        const moveECmd = new Command(1, 0, function(gameState: game_state, args: string[]): [string, game_state] {
            const newRoom = gameState.room.getExit("E");
            if(newRoom == undefined) return ["You can't go East.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
        });
        
        const moveWCmd = new Command(1, 0, function(gameState: game_state, args: string[]): [string, game_state] {
            const newRoom = gameState.room.getExit("W");
            if(newRoom == undefined) return ["You can't go West.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
        });
        
        const sayCmd = new Command(1, 0, function(gameState: game_state, args: string[]): [string, game_state] {
            if(args.length > 0) {
                return [`You say #yellow "${args.join(" ")}"#`, gameState];
            }
            
            else return ["say what?", gameState];
        });
        
        const yellCmd = new Command(1, 0, function(gameState: game_state, args: string[]): [string, game_state] {
            if(args.length > 0) {
                return [`You yell #orange "${args.join(" ")}"#`, gameState];
            }
            
            else return ["yell what?", gameState];
        });
        
        this.commandList = new Map<string, Command>();
        this.commandList.set("look", lookCmd);
        this.commandList.set("l", lookCmd);
        this.commandList.set("examine", lookCmd);
        
        this.commandList.set("feed", feedCmd);
        
        this.commandList.set("read", readCmd);
        
        this.commandList.set("north", moveNCmd);
        this.commandList.set("n", moveNCmd);
        
        this.commandList.set("south", moveSCmd);
        this.commandList.set("s", moveSCmd);
        
        this.commandList.set("east", moveECmd);
        this.commandList.set("e", moveECmd);
        
        this.commandList.set("west", moveWCmd);
        this.commandList.set("w", moveWCmd);
        
        this.commandList.set("say", sayCmd);
        
        this.commandList.set("yell", yellCmd);
    }
}