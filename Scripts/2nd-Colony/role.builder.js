var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep){
        if(creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false;
            creep.say('collecting energy');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity){
           creep.memory.building = true;
           creep.say('building');
        }

        if(creep.memory.building){
            var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(buildTargets.length){
                //Sort the buildTargets so that the highest progress completed % is finished first
                buildTargets.sort((a,b) => (b.progress / b.progressTotal) - (a.progress / a.progressTotal));

                if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(buildTargets[0]);
                }
            }else { //while unable to work act like an upgrader
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else{
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

module.exports = roleBuilder;