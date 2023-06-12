const input = require('sync-input');
let machine = {
    ingredients: {
        water: {
            amount: 400,
            unit: "ml"
        },
        milk: {
            amount: 540,
            unit: "ml"
        },
        beans: {
            amount: 120,
            unit: "g"
        },
    },
    cups: 9,
    money: 550
};

const recipes = {
    1: {
        water: 250,
        milk: 0,
        beans: 16,
        price: 4
    },
    2: {
        water: 350,
        milk: 75,
        beans: 20,
        price: 7
    },
    3: {
        water: 200,
        milk: 100,
        beans: 12,
        price: 6
    }
}

const stats = () => {
    console.log("The coffee machine has:");
    Object.keys(machine.ingredients).forEach((ingredient) => console.log(`${machine.ingredients[ingredient].amount} ${machine.ingredients[ingredient].unit} of ${ingredient}`))
    console.log(machine.cups + " disposable cups");
    console.log(`$${machine.money} of money`);
    start();
}

const makeable = (coffeeType) => {
    let arr = [];
    Object.keys(machine.ingredients).forEach((key) => arr.push(Math.floor(machine.ingredients[key].amount / recipes[coffeeType][key])));
    if (Math.min(...arr) > 0 && machine.cups > 0)
        return true;

    if(machine.cups > 0) {
        switch(arr.indexOf(Math.min(...arr))) {
            case 0:
                return "water";
            case 1:
                return "milk";
            case 2:
                return "coffee beans";
        }
    }
    return "disposable cups";
}

const buy = (coffeeType) => {
    if(makeable(coffeeType) === true) {
        Object.keys(machine.ingredients).forEach((key) => machine.ingredients[key].amount -= recipes[coffeeType][key]);
        machine.cups--;
        machine.money += recipes[coffeeType].price;
        console.log("I have enough resources, making you a coffee!\n");
    } else {
        console.log("Sorry, not enough " + makeable(coffeeType) + "!");
    }
    start();
}

const fillMachine = () => {
    const water = Number(input("Write how many ml of water you want to add:"));
    const milk = Number(input("Write how many ml of milk you want to add:"));
    const beans = Number(input("Write how many grams of coffee beans you want to add:"));
    const cups = Number(input("Write how many disposable cups you want to add:"));
    const toFill = {
        water,
        milk,
        beans,
        cups
    }
    Object.keys(machine.ingredients).forEach((key) => machine.ingredients[key].amount += toFill[key]);
    machine.cups += toFill.cups;
    console.log();
    start();
}

const collectMoney = () => {
    console.log("I gave you $" + machine.money);
    machine.money = 0;
    console.log();
    start();
}

const emptyMachine = () => {
    console.log("Machine has been emptied.")
    Object.keys(machine.ingredients).forEach((key) => machine.ingredients[key].amount = 0);
    machine.cups = 0;
    machine.money = 0;
    start();
}

const start = () => {
    const action = input("Write action (buy, fill, take, remaining, empty, exit): ");

    switch(action) {
        case "buy":
            const coffeeType = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:")
            if(coffeeType !== "back")
                return buy(coffeeType);
            return start();
        case "fill":
            return fillMachine();
        case "take":
            return collectMoney();
        case "remaining":
            return stats();
        case "empty":
            return emptyMachine();
        case "exit":
            return;
    }
}

start();
