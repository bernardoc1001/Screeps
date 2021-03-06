var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repairing');
        }

        if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return (structure.structureType != STRUCTURE_WALL) &&
                            structure.hits < (structure.hitsMax/2);}
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else { //while unable to work act like an upgrader
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else{
            var energyTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (energyStores) => energyStores.structureType == STRUCTURE_CONTAINER &&
                energyStores.store[RESOURCE_ENERGY] > 0
            });
            if(creep.withdraw(energyTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(energyTarget);
            }
        }
    }
};
module.exports = roleRepairer;