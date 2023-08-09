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



const cityEntrance = new Room("the city entrance", "yeah");
start3.setExit("N", cityEntrance);

const guildHall = new Room("the guild hall", "yeah");
cityEntrance.setExit("E", guildHall);

const cityStore = new Room("the city store", "yeah");
cityEntrance.setExit("W", cityStore);

const cityCenter = new Room("the city center", "yeah");
cityEntrance.setExit("N", cityCenter);

const cityMarket = new Room("the player market", "");
cityCenter.setExit("W", cityMarket);

const cityExit = new Room("the city exit", "");
cityCenter.setExit("E", cityExit);


const tavern = new Room("the tavern", "a tavern");
cityCenter.setExit("N", tavern);

const tavernRoom = new Room("tavern room", "");
tavern.setExit("E", tavernRoom);


