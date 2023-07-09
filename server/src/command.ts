import { Entity } from './entity';
import { HELP, UndefinedEntity, game_state } from './globals';

interface Func {
   (gameState: game_state, args: string[]): [string, game_state];
}

export class Command {
   private names = [''];
   private desc = '';
   private syntax = '';
   private func: Func;

   //contains a mapping of every command & command alias to its relevant data
   static commandList = new Map<string, Command>();

   //thrown when an invalid command is entered
   static errorCmd = new Command(['Error'], '#red Command does not exist.#', '', function (
      gameState: game_state,
      args: string[]
   ): [string, game_state] {
      return ['What?', gameState];
   });

   constructor(names: string[], desc: string, syntax: string, func: Func) {
      this.desc = desc;
      this.names = names;
      this.syntax = syntax;
      this.func = func;

      //add to command list
      names.forEach((e) => {
         e = e.toLowerCase();
         Command.commandList.set(e, this);
      });
   }

   public runCommand(gameState: game_state, args: string[]): [string, game_state] {
      if (this.func) return this.func(gameState, args);

      return ['command not found', gameState];
   }

   public getHelpFile() {
      return `#red ${this.names[0]}#\n${this.desc}\n\nSyntax: #blue ${this.syntax}#\nAliases: #orange ${this.names
         .join('#, #orange ')
         .toLowerCase()}#`;
   }

   //returns the valid command of the error command if the command name doesn't exist
   static getCommand(name: string): Command {
      const cmd = this.commandList.get(name);
      if (cmd == undefined) return this.errorCmd;

      return cmd;
   }

   //runs once at startup, populates the commandList map
   static setupCommands() {
      Command.commandList = new Map<string, Command>(); //clears the error command from the list

      //look at or examine an entity or room
      const lookCmd = new Command(
         ['Look', 'l', 'examine'],
         `Look at something to see a description of it, or look around you to get a description of the room you're in.`,
         `"look [noun]" / "look"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            let target1 = new UndefinedEntity();

            if (args.length > 0) {
               //get entity from the entered string
               target1 = gameState.room.getEntityFromAlias(args[0]);
               // console.log(target1);
               if (!(target1 instanceof UndefinedEntity)) return [Entity.look(target1), gameState];
               else return ['Look at what?', gameState];
            }
            //print description of room if no arguments entered
            else return [gameState.room.printRoom(), gameState];
         }
      );

      //feed
      const feedCmd = new Command(
         ['Feed'],
         `Feed something to something else. Both things need to be in the room you're currently in.`,
         `"feed [noun] the [noun]" / "feed [noun] [noun] / feed [noun] to [noun]`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            let target1 = new UndefinedEntity();
            let target2 = new UndefinedEntity();

            if (args.length > 1 && args.length < 4) {
               if (args.length == 3) {
                  if (args[1] == 'to') {
                     target1 = gameState.room.getEntityFromAlias(args[2]);
                     target2 = gameState.room.getEntityFromAlias(args[0]);
                  } else {
                     target1 = gameState.room.getEntityFromAlias(args[0]);
                     target2 = gameState.room.getEntityFromAlias(args[2]);
                  }
               } else if (args.length == 2) {
                  target1 = gameState.room.getEntityFromAlias(args[0]);
                  target2 = gameState.room.getEntityFromAlias(args[1]);
               }

               if (!(target1 instanceof UndefinedEntity || target2 instanceof UndefinedEntity))
                  return [Entity.feed(target1, target2), gameState];
               else return ['Feed what to what?', gameState];
            }
            //print message prompting the user to enter in arguments
            else return ['Feed what to what?', gameState];
         }
      );

      //read an entity if it has content that is readable
      const readCmd = new Command(
         ['Read'],
         `Read something! If the thing you're reading has more than 1 page, read the next page by adding the page number`,
         `"read [noun]" / "read [noun] 2"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            let target1 = new UndefinedEntity();

            if (args.length == 1) {
               //get entity from the entered string
               target1 = gameState.room.getEntityFromAlias(args[0]);
               if (!(target1 instanceof UndefinedEntity)) return [Entity.read(target1), gameState];
               else return ['Read what?!', gameState];
            }
            //print message prompting the user to enter in arguments
            else return ['Read what?', gameState];
         }
      );

      //move through the north exit
      const moveNCmd = new Command(
         ['North', 'n'],
         `Move through the North exit of the current room.`,
         `"north"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            const newRoom = gameState.room.getExit('N');
            if (newRoom == undefined) return ["You can't go North.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
         }
      );

      //move through the south exit
      const moveSCmd = new Command(
         ['South', 's'],
         `Move through the South exit of the current room.`,
         `"south"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            const newRoom = gameState.room.getExit('S');
            if (newRoom == undefined) return ["You can't go South.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
         }
      );

      //move through the east exit
      const moveECmd = new Command(
         ['East', 'e'],
         `Move through the East exit of the current room.`,
         `"east"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            const newRoom = gameState.room.getExit('E');
            if (newRoom == undefined) return ["You can't go East.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
         }
      );

      //move through the west exit
      const moveWCmd = new Command(
         ['West', 'w'],
         `Move through the West exit of the current room.`,
         `"west"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            const newRoom = gameState.room.getExit('W');
            if (newRoom == undefined) return ["You can't go West.", gameState];
            else gameState.room = newRoom;
            return [gameState.room.printRoom(), gameState];
         }
      );

      //say something in yellow text
      const sayCmd = new Command(
         ['Say'],
         `Say something! All the people who are in the room with you will hear what you say!`,
         `"Say [blah blah blah]"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            if (args.length > 0) {
               return [`You say #yellow "${args.join(' ')}"#`, gameState];
            } else return ['say what?', gameState];
         }
      );

      //yell something in orange text
      const yellCmd = new Command(
         ['Yell', 'shout'],
         `Yell something so that the whole server can hear you! Even people not in the same room as you will be able to hear what you say.`,
         `"yell [blah blah blah"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            if (args.length > 0) {
               return [`You yell #orange "${args.join(' ')}"#`, gameState];
            } else return ['yell what?', gameState];
         }
      );

      //access the help file for a command or the general help file
      const helpCmd = new Command(
         ['Help'],
         `Get the help file for a given command, or a general help file explaining the game and the basics of how to play!`,
         `"help [command]" / "help"`,

         function (gameState: game_state, args: string[]): [string, game_state] {
            if (args.length > 0) {
               const cmd = Command.getCommand(args[0]);

               if (cmd != Command.errorCmd) return [cmd.getHelpFile(), gameState];
               else return ['No help file for entered command found.', gameState];
            }
            return [HELP, gameState];
         }
      );

      // console.debug(this.commandList);
   }
}
