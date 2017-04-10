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
                    return(structure.structureType != STRUCTURE_CONTROLLER) &&
                        ((structure.hits < (structure.hitsMax/1.3333) && (structure.structureType != STRUCTURE_WALL))||
                            ((structure.hits < 2500) && (structure.structureType == STRUCTURE_WALL)))
                        ;}

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
            if(energyTarget == null) {
                //if there are no energy targets available, harvest the energy ;TODO recondsider this after harvester allocation?
                var sources = creep.room.find(FIND_SOURCES); //TODO investigate FIND_SOURCES_ACTIVE
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            }
        }
    }
};
module.exports = roleRepairer;