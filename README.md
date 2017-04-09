# Screeps

##Introduction:
This repository is to hold all of my Screeps related files.  Screeps is an AI Scripting MMO Game aimed at programmers.  
You can find the main website for the game at [screeps.com](https://screeps.com/).


###Useful Notes for Working Locally:

####Screeps Autocomplete
[Screeps Autocomplete](https://github.com/Garethp/ScreepsAutocomplete) is a useful project that is compatible with multiple IDEs.

####Point Screeps to another local directory
You can make screeps find files anywhere on your system by making a symlink. 

To do this on windows first:

1) Open cmd as an administrator
2) Find the CLASSPATH to the screep local files by going ingame and on the bottom left click `Open local folder`
3) Type in the following:

`mklink /d <CLASSPATH_TO_SCREEP'S_screeps.com_DIRECTORY> <CLASSPATH_TO_DIR_CONTAINING_ALL_YOUR_SCRIPTS>`

In linux:

1) Open a terminal
2) Find the CLASSPATH to the screep local files by going ingame and on the bottom left click `Open local folder`
3) Type the following:

`ln -s <CLASSPATH_TO_DIR_CONTAINING_ALL_YOUR_SCRIPTS> <CLASSPATH_TO_SCREEP'S_screeps.com_DIRECTORY>`


Now screeps should pick up your scripts