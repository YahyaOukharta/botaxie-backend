import { AxieGene } from "agp-npm";
import Axie from "../../types/Axie";
import AxieConfig, { AxieClass } from "../../types/AxieConfig";
import  {Instance } from "../../instances/entities/instance.entity";

const Web3 = require("web3")
// console.log(Web3.utils)
const utils = Web3.utils
const fromWei = utils.fromWei;

const DEBUG = false

function getPurity(genes: AxieGene) {

    let d = []
    d.push(genes.eyes.d.cls)
    d.push(genes.ears.d.cls)
    d.push(genes.back.d.cls)
    d.push(genes.mouth.d.cls)
    d.push(genes.horn.d.cls)
    d.push(genes.tail.d.cls)
    const occurrences = d.reduce(function (acc:any, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});
    let max = 0;
    for (const prop in occurrences) {
        if (occurrences[prop] > max)
            max = occurrences[prop]
    }
    return max;
}

function axieMatchesConfig(axie: Axie, config: AxieConfig): boolean {
    //price
    const price = parseFloat(fromWei(axie.order.currentPrice));
    if (price > config.maxPrice) {
        if (DEBUG)
            console.log("price too high", price, config.maxPrice);
        return false;
    }
    //stats
    const stats = axie.stats;
    if (config.minStats?.hp && stats.hp < config.minStats?.hp) {
        if (DEBUG)
            console.log("hp too low", stats.hp, config.minStats?.hp);
        return false;
    }
    if (config.minStats?.speed && stats.speed < config.minStats?.speed) {
        if (DEBUG)
            console.log("speed too low", stats.speed, config.minStats?.speed);
        return false;
    }
    if (config.minStats?.skill && stats.skill < config.minStats?.skill) {
        if (DEBUG)
            console.log("skill too low", stats.skill, config.minStats?.skill);
        return false;
    }
    if (config.minStats?.morale && stats.morale < config.minStats?.morale) {
        if (DEBUG)
            console.log("morale too low", stats.morale, config.minStats?.morale);
        return false;
    }
    //class
    const axieClass = axie.class.toLowerCase();
    if (config.class && axieClass !== config.class) {
        if (DEBUG)
            console.log("class doesnt match", axieClass, config.class);
        return false;
    }
    //ID
    const id = parseInt(axie.id);
    if (config.maxId && id > config.maxId) {
        if (DEBUG)
            console.log("ID too high", id, config.maxId);
        return false;
    }
    if (config.minId && id < config.minId) {
        if (DEBUG)
            console.log("ID too low", id, config.minId);
        return false;
    }
    //Breed Count
    const breedCount = axie.breedCount
    if (config.maxBreedCount && breedCount > config.maxBreedCount) {
        if (DEBUG)
            console.log("breedCount too high", breedCount, config.maxBreedCount);
        return false;
    }
    if (config.minBreedCount && breedCount < config.minBreedCount) {
        if (DEBUG)
            console.log("breedCount too low", breedCount, config.minBreedCount);
        return false;
    }

    //genes
    const genes = new AxieGene(axie.genes);
    //Pureness
    const pureness = genes.getGeneQuality();
    if (config.maxPureness && pureness > config.maxPureness) {
        if (DEBUG)
            console.log("pureness too high", pureness, config.maxPureness);
        return false;
    }
    if (config.minPureness && pureness < config.minPureness) {
        if (DEBUG)
            console.log("pureness too low", pureness, config.minPureness);
        return false;
    }
    //Purity
    const purity = getPurity(genes)
    if (DEBUG)
        console.log(purity)
    if (config.maxPurity && purity > config.maxPurity) {
        if (DEBUG)
            console.log("purity too high", purity, config.maxPurity);
        return false;
    }
    if (config.minPurity && purity < config.minPurity) {
        if (DEBUG)
            console.log("purity too low", purity, config.minPurity);
        return false;
    }

    //potentialPoints
    const potentialPoints = axie.potentialPoints;
    if (config.minPotentialPoints?.beast && potentialPoints.beast < config.minPotentialPoints?.beast) {
        if (DEBUG)
            console.log("beast potential points too low", potentialPoints.beast, config.minPotentialPoints?.beast);
        return false;
    }
    if (config.minPotentialPoints?.aquatic && potentialPoints.aquatic < config.minPotentialPoints?.aquatic) {
        if (DEBUG)
            console.log("aquatic potential points too low", potentialPoints.aquatic, config.minPotentialPoints?.aquatic);
        return false;
    }
    if (config.minPotentialPoints?.plant && potentialPoints.plant < config.minPotentialPoints?.plant) {
        if (DEBUG)
            console.log("plant potential points too low", potentialPoints.plant, config.minPotentialPoints?.plant);
        return false;
    }
    if (config.minPotentialPoints?.bug && potentialPoints.bug < config.minPotentialPoints?.bug) {
        if (DEBUG)
            console.log("bug potential points too low", potentialPoints.bug, config.minPotentialPoints?.bug);
        return false;
    }
    if (config.minPotentialPoints?.bird && potentialPoints.bird < config.minPotentialPoints?.bird) {
        if (DEBUG)
            console.log("bird potential points too low", potentialPoints.bird, config.minPotentialPoints?.bird);
        return false;
    }
    if (config.minPotentialPoints?.reptile && potentialPoints.reptile < config.minPotentialPoints?.reptile) {
        if (DEBUG)
            console.log("reptile potential points too low", potentialPoints.reptile, config.minPotentialPoints?.reptile);
        return false;
    }
    if (config.minPotentialPoints?.mech && potentialPoints.mech < config.minPotentialPoints?.mech) {
        if (DEBUG)
            console.log("mech potential points too low", potentialPoints.mech, config.minPotentialPoints?.mech);
        return false;
    }
    if (config.minPotentialPoints?.dawn && potentialPoints.dawn < config.minPotentialPoints?.dawn) {
        if (DEBUG)
            console.log("dawn potential points too low", potentialPoints.dawn, config.minPotentialPoints?.dawn);
        return false;
    }
    if (config.minPotentialPoints?.dusk && potentialPoints.dusk < config.minPotentialPoints?.dusk) {
        if (DEBUG)
            console.log("dusk potential points too low", potentialPoints.dusk, config.minPotentialPoints?.dusk);
        return false;
    }

    //parts
    const eyes = genes.eyes;
    if (DEBUG)
        console.log(eyes);
    if (config.eyesD && eyes.d.partId !== config.eyesD.partId) {
        if (DEBUG)
            console.log("eyesD doesnt match", eyes.d.partId, config.eyesD.partId);
        return false;
    }
    if (config.eyesR1 && eyes.r1.partId !== config.eyesR1.partId) {
        if (DEBUG)
            console.log("eyesR1 doesnt match", eyes.r1.partId !== config.eyesR1.partId);
        return false;
    }
    if (config.eyesR2 && eyes.r2.partId !== config.eyesR2.partId) {
        if (DEBUG)
            console.log("eyesR2 doesnt match", eyes.r2.partId, config.eyesR2.partId);
        return false;
    }
    const ears = genes.ears;
    if (DEBUG)
        console.log(ears);
    if (config.earsD && ears.d.partId !== config.earsD.partId) {
        if (DEBUG)
            console.log("earsD doesnt match", ears.d.partId, config.earsD.partId);
        return false;
    }
    if (config.earsR1 && ears.r1.partId !== config.earsR1.partId) {
        if (DEBUG)
            console.log("earsR1 doesnt match", ears.r1.partId !== config.earsR1.partId);
        return false;
    }
    if (config.earsR2 && ears.r2.partId !== config.earsR2.partId) {
        if (DEBUG)
            console.log("earsR2 doesnt match", ears.r2.partId, config.earsR2.partId);
        return false;
    }
    const back = genes.back;
    if (DEBUG)
        console.log(back);
    if (config.backD && back.d.partId !== config.backD.partId) {
        if (DEBUG)
            console.log("backD doesnt match", back.d.partId, config.backD.partId);
        return false;
    }
    if (config.backR1 && back.r1.partId !== config.backR1.partId) {
        if (DEBUG)
            console.log("backR1 doesnt match", back.r1.partId !== config.backR1.partId);
        return false;
    }
    if (config.backR2 && back.r2.partId !== config.backR2.partId) {
        if (DEBUG)
            console.log("backR2 doesnt match", back.r2.partId, config.backR2.partId);
        return false;
    }
    const mouth = genes.mouth;
    if (DEBUG)
        console.log(mouth);
    if (config.mouthD && mouth.d.partId !== config.mouthD.partId) {
        if (DEBUG)
            console.log("mouthD doesnt match", mouth.d.partId, config.mouthD.partId);
        return false;
    }
    if (config.mouthR1 && mouth.r1.partId !== config.mouthR1.partId) {
        if (DEBUG)
            console.log("mouthR1 doesnt match", mouth.r1.partId !== config.mouthR1.partId);
        return false;
    }
    if (config.mouthR2 && mouth.r2.partId !== config.mouthR2.partId) {
        if (DEBUG)
            console.log("mouthR2 doesnt match", mouth.r2.partId, config.mouthR2.partId);
        return false;
    }
    const horn = genes.horn;
    if (DEBUG)
        console.log(horn);
    if (config.hornD && horn.d.partId !== config.hornD.partId) {
        if (DEBUG)
            console.log("hornD doesnt match", horn.d.partId, config.hornD.partId);
        return false;
    }
    if (config.hornR1 && horn.r1.partId !== config.hornR1.partId) {
        if (DEBUG)
            console.log("hornR1 doesnt match", horn.r1.partId !== config.hornR1.partId);
        return false;
    }
    if (config.hornR2 && horn.r2.partId !== config.hornR2.partId) {
        if (DEBUG)
            console.log("hornR2 doesnt match", horn.r2.partId, config.hornR2.partId);
        return false;
    }
    const tail = genes.tail;
    if (DEBUG)
        console.log(tail);
    if (config.tailD && tail.d.partId !== config.tailD.partId) {
        if (DEBUG)
            console.log("tailD doesnt match", tail.d.partId, config.tailD.partId);
        return false;
    }
    if (config.tailR1 && tail.r1.partId !== config.tailR1.partId) {
        if (DEBUG)
            console.log("tailR1 doesnt match", tail.r1.partId !== config.tailR1.partId);
        return false;
    }
    if (config.tailR2 && tail.r2.partId !== config.tailR2.partId) {
        if (DEBUG)
            console.log("tailR2 doesnt match", tail.r2.partId, config.tailR2.partId);
        return false;
    }
    return true;
}

function filterAxies(axies: Axie[], config: AxieConfig): Axie[] {
    return axies.filter((axie) => axieMatchesConfig(axie, config));
}
export interface MatchData {
    matches: Object;
    matchedAxies: number[];
}

// export function filterForConfigs(axies: Axie[], configs: AxieConfig[]): MatchData {
//     const matches = {};
//     const matchedAxies = []
//     let j = 0;
//     for (const axie of axies) {
//         let i = 0;
//         for (const config of configs) {
//             if (!matches[i] && axieMatchesConfig(axie, config)) {
//                 matchedAxies.push(parseInt(axie.id));
//                 matches[i++] = parseInt(axie.id);
//                 break;
//             }
//             i++;
//         }
//         if (Object.keys(matches).length === configs.length) {
//             console.log("matched for all configs, stopping match at axie idx", j);
//             break;
//         }
//         j++;
//     }
//     return { matches, matchedAxies };
// }

export function filterForInstances(axies: Axie[], instances: Map<string,Instance>, configs: Map<string,AxieConfig>, busyInstances:Set<string>): MatchData {
    const matches : any= {};
    const matchedAxies = []
    let j = 0;
    for (const axie of axies) {
        for (const [instanceId, instance] of instances) {
            if (busyInstances.has(instanceId)){
                //console.log("instance",instanceId,"busy");
                continue;
            }
            const config = configs.get(instanceId);
            if (!config) throw "CONFIG NOT FOUND IN MAP, investigate!"
            if (!matches[instanceId] && axieMatchesConfig(axie, config)) {
                matchedAxies.push(parseInt(axie.id));   
                matches[instanceId] = parseInt(axie.id); 
                break;
            }
        }
        if (Object.keys(matches).length === instances.size) {
            console.log("matched for all configs, stopping match at axie idx", j);
            break;
        }
        j++;
    }
    return { matches, matchedAxies };
}