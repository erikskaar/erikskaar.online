let gameTime = 0.1;
let queens = {
    amount: 0,
    target: document.querySelector("#queens"),
    gain: 0,
    cost: 2000,
    multiplier: 1,
    unlocked: true
};


let minerals = {
    amount: 200,
    target: document.querySelector("#minerals"),
    multiplier: 1,
    gain: gameTime
};

let drones = {
    amount: 1,
    target: document.querySelector("#drones"),
    gain: 0,
    cost: 100,
    multiplier: 1,
    unlocked: true
};
let roaches = {
    amount: 0,
    target: document.querySelector("#roaches"),
    gain: 0,
    cost: 50000,
    multiplier: 1,
    unlocked: false
};
let hydras = {
    amount: 0,
    target: document.querySelector("#hydras"),
    gain: 0,
    cost: 120000,
    multiplier: 1,
    unlocked: false
};

if (queens.amount>0) {
    drones.multiplier = 1+queens.amount;
}

/*
queens.currency = drones
drones.currency = minerals
roaches.currency = queens
hydras.currency = roaches
*/


//hydras.require = lair













function manuallyMine() {
    minerals.amount +=1;
}




function update() {
    minerals.gain = gameTime*drones.amount;
    drones.gain = queens.amount/10;
    queens.gain = roaches.amount/50;
    roaches.gain = hydras.amount/100;
}


function addUnit(unit) {
    if (minerals.amount >= unit.cost && unit.unlocked) {
        unit.amount +=1*unit.multiplier;
        minerals.amount -= unit.cost;
    } else {
        console.log("You can't afford that");
    }
    
}



function gain(object) {
    object.amount += object.gain;
    object.target.innerHTML = Math.floor(object.amount);


}













window.setInterval(function(){
    gain(minerals);
    gain(drones);
    gain(queens);
    gain(roaches);
    gain(hydras);
    update();

},1000*gameTime);