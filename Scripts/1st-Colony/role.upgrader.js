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
        }
	}
};

module.exports = roleUpgrader;