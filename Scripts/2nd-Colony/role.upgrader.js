var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else{
            var energyTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (energyStores) => energyStores.structureType == STRUCTURE_CONTAINER &&
                energyStores.store[RESOURCE_ENERGY] > 0
            });
            if(creep.withdraw(energyTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(energyTargets[0]);
            }
            if(energyTargets[0] == null) {
                //if there are no energy targets available, harvest the energy ;TODO recondsider this after harvester allocation?
                var sources = creep.room.find(FIND_SOURCES); //TODO investigate FIND_SOURCES_ACTIVE
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            }

        }
	}
};

module.exports = roleUpgrader;