var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var energyTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (//structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER) &&
                        //structure.structureType == STRUCTURE_SPAWN ||
                        //structure.structureType == STRUCTURE_TOWER) &&
                        structure.store[RESOURCE_ENERGY] < structure.storeCapacity;}
                    //structure.energy < structure.energyCapacity;}
            });
            if(energyTarget != undefined) {
                if(creep.transfer(energyTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyTarget);
                }
            }else {
                creep.moveTo(Game.flags['Flag1']);
            }
        }
    }
};

module.exports = roleHarvester;