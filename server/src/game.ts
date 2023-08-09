import { SquirrelEntity } from "./entities/creatures";
import { NutEntity } from "./entities/objects";
import { SignEntity } from "./entities/written";
import { Room } from "./room";

export const startRoom = new Room("A clearing in a dense forest", "You're surrounded by large trees and vegetation. There's a sign near you that looks like you can #red read# it. The canopy is thick, not allowing much light to filter through, but with some focus you can make out a path snaking between the trees as if in spite of its environment.");
startRoom.entities = [ 
    new SignEntity("Welcome to #yellow Kynopsia#! You must be confused, but don't worry, if you read this then you're off to a great start! Head north by typing #red north# or #red n# to follow the forest path, and read all the signs you see!") 
];


const start2 = new Room("A path in a dense forest", "You cut around the trees, trying your best to follow the path, but it's clear that it hasn't been maintained or even used in a very long time. You think you lose the path a few times, but you always manage to find your way back somehow. The path continues North, but there's a sign here - maybe you should #red read# it!");
startRoom.setExit("N", start2);
start2.entities = [
    new SquirrelEntity(),
    new NutEntity(),
    new SignEntity("You can look at things in more detail by typing #red look [noun]# or #red l [noun]#! Try looking at the things in this room in more detail! Keep following the path once you've had your fun.")
]


const start3 = new Room("The end of the path in a dense forest", "You come, finally, to the end of the path. Before you lies a village, existing within the forest in an impossible amalgamation of careful architecture and the unchecked advance of nature. In between you and the village's entrance is a final sign. Perhaps you should #red read# it.");
start2.setExit("N", start3);
start3.entities = [
    new SignEntity("Good job following basic instructions! Commands, like the ones you've been typing, are how you interact with the world of Kynopsia and its many diverse inhabitants - inhabitants you should be able to meet very soon! \nType #red list# to see the full list of commands, and #red help [command]# to get information about specific commands! You can also type #red help# on its own for some general guidance if you're confused! \n\nContinue North now - you're ready to join your friends and have countless adventures! Welcome to #yellow Kynopsia#!")
]



const cityEntrance = new Room("Balial - Town Entrance", "yeah"); //introduce say and social aspects, lead to guild hall
start3.setExit("N", cityEntrance);


const guildHall = new Room("Balial - Guild Hall", "yeah"); //empty feeling, lack of players. maybe expand to more than 1 room for believability
cityEntrance.setExit("E", guildHall);


const cityStore = new Room("Balial - The Rusted Scale", "yeah"); //introduce aging server. npc not working? not content that is lead to
cityEntrance.setExit("W", cityStore);



const cityCenter = new Room("Balial - Town Center", "yeah"); //big! town message board, traces of previous events
cityEntrance.setExit("N", cityCenter);


const cityMarket = new Room("Balial - Player Marketplace", ""); //"see list of open shops. max count is 60, type --- 2 to see the next page!"
cityCenter.setExit("W", cityMarket);


const cityExit = new Room("Balial - Town Gates", ""); //introduce concept of server costs. sign that says the server is only the first starting town now to conserve memory
cityCenter.setExit("E", cityExit);



const tavern = new Room("Balial - The Red Flagon", "A tavern."); //call to adventure. this is where the adventure would have started, and had started for many people. signs, wanted posters, evidence of previous events. think aardwolf!
cityCenter.setExit("N", tavern);


const tavernRoom = new Room("The Red Flagon - Storeroom", "An empty storeroom."); //interactivity. counter? candles? messages scratched into wall?
tavern.setExit("E", tavernRoom);


