
let gameTime = 0.1;


////////////////RESOURCES//////////////////



let minerals = {
    amount: 50,
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


let zerglings = {
    amount: 0,
    target: document.querySelector("#zerglings"),
    costTarget: document.querySelector("#lingCost"),
    mineSpeed: 0.15,
    gain: 0,
    cost: 400,
    multiplier: 1,
    unlocked: true
};
let roaches = {
    amount: 0,
    target: document.querySelector("#roaches"),
    costTarget: document.querySelector("#roachCost"),
    gain: 0,
    cost: 50000,
    multiplier: 1,
    unlocked: false
};
let hydras = {
    amount: 0,
    target: document.querySelector("#hydras"),
    costTarget: document.querySelector("#hydraCost"),
    gain: 0,
    cost: 120000,
    multiplier: 1,
    unlocked: false
};

units = [drones,queens,zerglings,roaches,hydras];



//////////UPGRADES/////////////////////
let mBoost = {
    enabled: false,
    cost: 1000
}







//////////BUILDINGS////////////////////









/////////COST INCREASE/////////////
//more is less
drones.costIncrease = 300;
zerglings.costIncrease = 250;
queens.costIncrease = 100;
roaches.costIncrease = 50;
hydras.costIncrease = 25;









function manuallyMine() {
    minerals.amount +=1;
}

//drones.costTarget.parentElement.style.color = "red";


function update() {
    //gain
    minerals.gain = gameTime*drones.amount*drones.mineSpeed + zerglings.amount*zerglings.mineSpeed;
    drones.gain = queens.amount/50;
    for (let i=0;i<units.length;i++) {
        if (units[i].cost>minerals.amount || !units[i].unlocked) {
            units[i].costTarget.parentElement.style.color = "red";
        } else {
            units[i].costTarget.parentElement.style.color = "rgb(32, 95, 178)";
        }
    
    }

}


function addUnit(unit) {
    if (minerals.amount >= unit.cost && unit.unlocked) {
        unit.amount +=1*unit.multiplier;
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
    if (mBoost.enabled) {
        zerglings.multiplier = 2;
        document.querySelector("#mBoost").style.backgroundColor = "green";
        document.querySelector("#mBoost").style.color = "white";
    }
}










window.setInterval(function(){
    gain(minerals);
    gain(drones);
    gain(queens);
    gain(roaches);
    gain(hydras);
    update();
    checkForUpgrades();
    


},1000*gameTime);