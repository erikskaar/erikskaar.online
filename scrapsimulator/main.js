
let gameTime = 0.1;
let clickGain = 1;

////////////////RESOURCES//////////////////



let minerals = {
    amount: 200000,
    target: document.querySelector("#minerals"),
    multiplier: 1,
    gain: gameTime
};




//////////////////UNITS///////////////////
let queens = {
    amount: 0, //current amount
    target: document.querySelector("#queens"), //current amount on the screen
    costTarget: document.querySelector("#queenCost"), //current cost on the screen
    gain: 0, //how many you gain per tick
    cost: 2000, //cost of the unit
    multiplier: 1, //how many you gain with each purchase
    unlocked: true //if the unit is unlocked
};



let drones = {
    amount: 1,
    target: document.querySelector("#drones"),
    costTarget: document.querySelector("#droneCost"),
    mineSpeed: 1,
    gain: 0,
    cost: 100,
    multiplier: 1,
    unlocked: true
};

let qDrones = {
    amount: 0,
    target: document.querySelector("#qDrones"),
    costTarget: document.querySelector("#phantomTarget"),
    mineSpeed: 0.5,
    gain: 0,
    cost: 0,
    multiplier: 1,
    unlocked: true
}


let zerglings = {
    amount: 0,
    target: document.querySelector("#zerglings"),
    costTarget: document.querySelector("#lingCost"),
    mineSpeed: 2,
    gain: 0,
    cost: 400,
    multiplier: 1,
    unlocked: true
};
let roaches = {
    amount: 0,
    target: document.querySelector("#roaches"),
    costTarget: document.querySelector("#roachCost"),
    mineSpeed: 100,
    gain: 0,
    cost: 50000,
    multiplier: 1,
    unlocked: true
};
let hydras = {
    amount: 0,
    target: document.querySelector("#hydras"),
    costTarget: document.querySelector("#hydraCost"),
    mineSpeed: 240,
    gain: 0,
    cost: 120000,
    multiplier: 1,
    unlocked: false
};

units = [drones,qDrones,queens,zerglings,roaches,hydras];



//////////UPGRADES/////////////////////
let mBoost = {
    enabled: false,
    cost: 1000,
    costTarget: document.querySelector("#mBoost")
}
let mA1 = {
    enabled: false,
    cost: 1000,
    costTarget: document.querySelector("#mA1")
}
let gRecon = {
    enabled: false,
    cost: 400000,
    costTarget: document.querySelector("#gRecon")
}
let gSpines = {
    enabled: false,
    cost: 800000,
    costTarget: document.querySelector("#gSpines")
}
let aGlands = {
    enabled: false,
    cost: 120000,
    costTarget: document.querySelector("#aGlands")
}
let lair = {
    enabled: false,
    cost: 250000,
    costTarget: document.querySelector("#lair")
}

let upgrades = [mBoost, mA1, gRecon, gSpines, aGlands, lair];











/////////COST INCREASE/////////////
//more is less
drones.costIncrease = 300;
zerglings.costIncrease = 250;
queens.costIncrease = 100;
roaches.costIncrease = 50;
hydras.costIncrease = 25;









function manuallyMine() {
    minerals.amount +=clickGain;
}



function update() {
    //gain
    minerals.gain = gameTime*(drones.amount*drones.mineSpeed*drones.multiplier + zerglings.amount*zerglings.mineSpeed*zerglings.multiplier + qDrones.amount*qDrones.mineSpeed*qDrones.multiplier + roaches.amount*roaches.mineSpeed*roaches.multiplier+hydras.amount*hydras.mineSpeed*hydras.multiplier);
    qDrones.gain = queens.amount/50;
    for (let i=0;i<units.length;i++) {
        if (units[i].cost>minerals.amount || !units[i].unlocked) {
            units[i].costTarget.parentElement.style.color = "red";
        } else {
            units[i].costTarget.parentElement.style.color = "rgb(32, 95, 178)";
        }
    
    }
    for (let i=0;i<upgrades.length;i++) {
        if (upgrades[i].cost>minerals.amount) {
            upgrades[i].costTarget.style.color = "red";
        } else {
            upgrades[i].costTarget.style.color = "rgb(32, 95, 178)";
        }
    }
    document.querySelector("#mPs").innerHTML = Math.floor(minerals.gain*100*gameTime);

}


function addUnit(unit) {
    if (minerals.amount >= unit.cost && unit.unlocked) {
        unit.amount +=1;
        minerals.amount -= unit.cost;
        unit.cost = Math.floor(Math.pow(unit.cost,(1+unit.amount/unit.costIncrease)));
        if (unit.cost.toString().length>4) {
            unit.costTarget.innerHTML = unit.cost/1000 + "k";
        } else {
            unit.costTarget.innerHTML = unit.cost;
        }
        
        console.log(unit.cost);

    } else {
        console.log("You can't afford that");
    }
    
}

function addUpgrade(upgrade) {
    if (minerals.amount >=upgrade.cost && !upgrade.enabled) {
        upgrade.enabled = true;
        minerals.amount -= upgrade.cost;
        console.log(upgrade + " enabled");
    }
}


function gain(object) {
    object.amount += object.gain;
    object.target.innerHTML = Math.floor(object.amount);


}


function checkForUpgrades() {
    for (let i = 0; i < upgrades.length; i++) {
        if (upgrades[i].enabled) {
            upgrades[i].costTarget.style.backgroundColor = "green";
            upgrades[i].costTarget.style.color = "white";
        }
    }
    if (mBoost.enabled) {
        zerglings.multiplier = 2;

    }
    if (mA1.enabled) {
        clickGain = 10;
    }
    if (gRecon.enabled) {
        roaches.multiplier = 2;
    }
    if (gSpines.enabled) {
        hydras.multiplier = 2;
    }
    if (aGlands.enabled) {
        zerglings.multiplier = 8;
    }
    if (lair.enabled) {
        hydras.unlocked = true;
        gameTime = 0.15;
    }


}










window.setInterval(function(){
    gain(minerals);
    /*
    gain(drones);
    gain(qDrones);
    gain(zerglings);
    gain(queens);
    gain(roaches);
    gain(hydras);
    */
   for (let i = 0; i<units.length; i++) {
       gain(units[i]);
   }
    update();
    checkForUpgrades();
    


},1000*gameTime);