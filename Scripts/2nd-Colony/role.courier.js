var roleCourier = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.delivering && creep.carry.energy == 0) {
         creep.memory.delivering = false;
         creep.say('Collecting Energy');
         }
         if(!creep.memory.delivering && creep.carry.energy == creep.carryCapacity) {
         creep.memory.delivering = true;
         creep.say('Delivering');
         }

        if(creep.memory.delivering) {
            var deliverTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });

            if(deliverTargets.length > 0) {
                if(creep.transfer(deliverTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(deliverTargets[0]);
                }
            }else {
                creep.moveTo(Game.flags['Flag1']);
            }
            /*
            //currently not working due to no work body part
            else { //while unable to work act like an upgrader
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            */
        }
        else {
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

module.exports = roleCourier;