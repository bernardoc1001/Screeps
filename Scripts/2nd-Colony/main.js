var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleUpgrader = require('role.upgrader');
var roleCourier = require('role.courier');

function creepRecipe(spawn,role) {
    var recipe;
    if (role == 'harvester'){
        switch (0){
            case spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]):
                recipe = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
                break;
            case spawn.canCreateCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]):
                recipe = [WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
                break;
            case spawn.canCreateCreep([WORK,WORK,CARRY,MOVE,MOVE]):
                recipe = [WORK,WORK,CARRY,MOVE,MOVE];
                break;
            default:
                recipe = [WORK,CARRY,MOVE];
        }
    }
    else if (role == 'courier'){
        switch (0){
            case spawn.canCreateCreep([CARRY,CARRY,MOVE,MOVE]):
                recipe = [CARRY,CARRY,MOVE,MOVE];
                break;
            default:
                recipe = [CARRY,MOVE];
        }
    }
    else if (role == 'builder'){
        switch (0){
            case spawn.canCreateCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]):
                recipe = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE];
                break;
            default:
                recipe = [WORK,CARRY,MOVE];
        }
    }
    else if (role == 'upgrader'){
        switch (0){
            case spawn.canCreateCreep([WORK, WORK, CARRY, CARRY,CARRY, MOVE, MOVE]):
                recipe = [WORK, WORK, CARRY, CARRY,CARRY, MOVE, MOVE];
                break;
            default:
                recipe = [WORK,CARRY,MOVE];
        }
    }
    else if (role == 'repairer'){
        switch (0){
            case spawn.canCreateCreep([WORK, CARRY, CARRY, MOVE, MOVE]):
                recipe = [WORK, CARRY, CARRY, MOVE, MOVE];
                break;
            default:
                recipe = [WORK, CARRY, MOVE]
        }
    }
    return recipe;
}
module.exports.loop = function () {
 
    //Tower Defence
     var tower = Game.getObjectById('583ae35d6f39766257e63cb2');
     if(tower){
         /*  //Temporarily disable tower repairing
         var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
         });
         if(closestDamagedStructure){
            tower.repair(closestDamagedStructure);
         }
        */
         var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
         if(closestHostile){
            tower.attack(closestHostile);
         }
     }
    

    // Clear Dead Creeps memory
    for(let name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //Auto Spawn Creeps, giving harvesters the priority
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var couriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'courier');
    var dateCreated = new Date();
    var timeCreated = dateCreated.getHours() + '' + dateCreated.getMinutes() + '' + dateCreated.getSeconds();
    var spawn1 = Game.spawns['Spawn1'];
    if(harvesters.length < 4){
        let newName = Game.spawns['Spawn1'].createCreep(creepRecipe(spawn1,'harvester'), ('h' + timeCreated), {role: 'harvester'});
        console.log('Current harvester count = ' + harvesters.length +
                    '\nSpawning new harvester: ' + newName);
    }

    else if(couriers.length < 2){
        let newName = Game.spawns['Spawn1'].createCreep(creepRecipe(spawn1,'courier'), ('c' + timeCreated), {role: 'courier'});
        console.log('Current courier count = ' + couriers.length +
            '\nSpawning new courier: ' + newName);
    }
    else if(builders.length < 4){
        let newName = Game.spawns['Spawn1'].createCreep(creepRecipe(spawn1,'builder'), ('b' + timeCreated), {role: 'builder'});
        console.log('Current builder count = ' + builders.length +
            '\nSpawning new builder: ' + newName);
    }
    else if(upgraders.length < 3){
        let newName = Game.spawns['Spawn1'].createCreep(creepRecipe(spawn1,'upgrader'), ('u' + timeCreated), {role: 'upgrader'});
        console.log('Current upgrader count = ' + upgraders.length +
                    '\nSpawning new upgrader: ' + newName);
    }
    else if(repairers.length < 2){
        let newName = Game.spawns['Spawn1'].createCreep(creepRecipe(spawn1,'repairer'), ('r' + timeCreated), {role: 'repairer'});
        console.log('Current repairer count = ' + repairers.length +
            '\nSpawning new repairer: ' + newName);
    }


    // Activate a creeps role
    for(let name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role){
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'courier':
                roleCourier.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;

        }
    }
}