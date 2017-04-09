var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES); //TODO investigate FIND_SOURCES_ACTIVE
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var deliverTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    //TODO if a spawner in the same room can't create a basic harvester, only target spawner or extension
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;}
                            //structure.structureType == STRUCTURE_CONTAINER) &&
                                //structure.store[RESOURCE_ENERGY] < structure.storeCapacity;}
            });
            if(deliverTarget != undefined) {
                if(creep.transfer(deliverTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(deliverTarget);
                }
            }else {
                creep.moveTo(Game.flags['Flag1']);
            }
        }
    }
};

module.exports = roleHarvester;