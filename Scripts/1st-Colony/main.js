var roleHarvester = require('role.harvester');
var roleTempHarvester = require('role.tempHarvester');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleUpgrader = require('role.upgrader');
var roleCourier = require('role.courier');

module.exports.loop = function () {
 
    //Tower Defence   sdsds sdsd 
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
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //Auto Spawn Creeps, giving harvesters the priority
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    var tempHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'tempHarvester');

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var couriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'courier');
    var dateCreated = new Date();
    var timeCreated = dateCreated.getHours() + '' + dateCreated.getMinutes() + '' + dateCreated.getSeconds();

    if(harvesters.length < 4){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE, MOVE], ('h' + timeCreated), {role: 'harvester'});
        console.log('Current harvester count = ' + harvesters.length +
                    '\nSpawning new harvester: ' + newName);
    }

    else if(tempHarvesters.length < 1){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE, MOVE], ('tH' + timeCreated), {role: 'tempHarvester'});
        console.log('Current temp-harvester count = ' + tempHarvesters.length +
            '\nSpawning new temp-harvester: ' + newName);
    }


    else if(couriers.length < 2){
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,MOVE,MOVE, MOVE], ('c' + timeCreated), {role: 'courier'});
        console.log('Current courier count = ' + couriers.length +
            '\nSpawning new courier: ' + newName);
    }
    else if(upgraders.length < 3){
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY,CARRY, MOVE, MOVE], ('u' + timeCreated), {role: 'upgrader'});
        console.log('Current upgrader count = ' + upgraders.length +
                    '\nSpawning new upgrader: ' + newName);
    }

    else if(builders.length < 4){
        var newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], ('b' + timeCreated), {role: 'builder'});
        console.log('Current builder count = ' + builders.length +
                    '\nSpawning new builder: ' + newName);
    }

    else if(repairers.length < 2){
        var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], ('r' + timeCreated), {role: 'repairer'});
        console.log('Current repairer count = ' + repairers.length +
            '\nSpawning new repairer: ' + newName);
    }


    // Activate a creeps role
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'tempHarvester') {
            roleTempHarvester.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'courier') {
            roleCourier.run(creep);
        }
    }
}