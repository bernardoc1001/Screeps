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
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return (structure.structureType !== STRUCTURE_CONTROLLER) &&
                        ((structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL) ||
                        (structure.hits < 1000 && structure.structureType === STRUCTURE_WALL));
                }
            });

            //further sort the following by proximity in case of a tie
            targets.sort((a,b) => a.hits - b.hits);
            let lowestHealthTargets = targets.filter(t => t.hits === targets[0].hits );
            let lowestAndClosestTargets = _.sortBy(lowestHealthTargets, t => creep.pos.getRangeTo(t));
            /*
            //==================================debug==================================================
            let lHTDebugArray =[];
            for(let i in lowestHealthTargets){
                lHTDebugArray.push({"hits": lowestHealthTargets[i].hits,
                                    "distance": creep.pos.getRangeTo(lowestHealthTargets[i])});
            }
            console.log('lowestHealth debug: ', JSON.stringify(lHTDebugArray));

            let lACTDebugArray =[];
            for(let i in lowestAndClosestTargets){
                lACTDebugArray.push({"hits": lowestAndClosestTargets[i].hits,
                    "distance": creep.pos.getRangeTo(lowestAndClosestTargets[i])});
            }
            console.log('lowestAndClosest debug: ', JSON.stringify(lACTDebugArray));
            //debug the targets sorting
            let debugArray = [];
            for(let i in targets){
                debugArray.push(targets[i].hits);
            }
            console.log('All Targets hits: ', JSON.stringify(debugArray));

            //==================================================================================
            */
            if(lowestAndClosestTargets.length > 0) {
                console.log(JSON.stringify(creep.name),
                    ' repair target is: ', JSON.stringify(lowestAndClosestTargets[0]['structureType']), JSON.stringify(lowestAndClosestTargets[0]['pos']),
                    ' hits ', lowestAndClosestTargets[0].hits,
                    ', percent =  ' , lowestAndClosestTargets[0].hits / lowestAndClosestTargets[0].hitsMax, '%',
                    'distance: ' ,creep.pos.getRangeTo(lowestAndClosestTargets[0]));


                if(creep.repair(lowestAndClosestTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(lowestAndClosestTargets[0]);
                }
            } else { //while unable to work act like an upgrader
                /*
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
                */
            }
        } else{
            /*
            //while there is an energy crisis make the repairiers just mine from the second source ;TODO fix this
            var energyTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (energyStores) => energyStores.structureType == STRUCTURE_CONTAINER &&
                energyStores.store[RESOURCE_ENERGY] > 0
            });
            if(creep.withdraw(energyTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(energyTarget);
            }
            */
            let energyTarget = null;
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