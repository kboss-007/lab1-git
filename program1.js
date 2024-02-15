const args = process.argv.slice(2);

function parseAmount(amountStr) {
    let errorMessage = [];

    if (!amountStr.startsWith("$")) {
        errorMessage.push("ERROR: The string must begin with a $");
        return [null, errorMessage.join("\n")];
    }

    if (amountStr.length < 4 || amountStr[1] === '.') {
        errorMessage.push("ERROR: The string must include a dollar amount");
        return [null, errorMessage.join("\n")];
    }

    let amountWithoutDollarSign = amountStr.substring(1);
    let [dollars, cents] = amountWithoutDollarSign.split(".");
    let dollarsInt = parseInt(dollars, 10);
    let centsInt = parseInt(cents, 10);

    if (isNaN(dollarsInt) || dollars === "") {
        errorMessage.push("ERROR: The string must include a dollar amount");
        return [null, errorMessage.join("\n")];
    }
    if (dollarsInt < 0 || dollarsInt > 100 || centsInt < 0 || centsInt > 99) {
        errorMessage.push("ERROR: Dollar amount must be between 0 and 100, and cents between 0 and 99");
        return [null, errorMessage.join("\n")];
    }

    return [{ dollars: dollarsInt, cents: centsInt }, null];
}

function calculateDenominations(dollars, cents) {
    let denominations = [];

    if (dollars > 0) {
        denominations.push(`${dollars} dollar${dollars > 1 ? 's' : ''}`);
    }

    let coins = [
        { name: "quarter", value: 25 },
        { name: "dime", value: 10 },
        { name: "nickel", value: 5 },
        { name: "penny", value: 1 }
    ];

    for (let i = 0; i < coins.length; i++) {
        let coin = coins[i];
        let count = Math.floor(cents / coin.value);
        cents %= coin.value;

        if (count > 0) {
            let name = coin.name === "penny" && count > 1 ? "pennies" : coin.name + (count > 1 && coin.name !== "penny" ? 's' : '');
            denominations.push(`${count} ${name}`);
        }
    }

    return denominations;
}

function main() {
    if (args.length !== 1) {
        console.log("ERROR: Incorrect number of arguments provided.");
        console.log("Usage: node program1.js '$X.YZ'");
        return;
    }

    let [amount, error] = parseAmount(args[0]);

    if (error) {
        console.log(error);
        return;
    }

    let denominations = calculateDenominations(amount.dollars, amount.cents);

    if (denominations.length > 0) {
        for (let i = 0; i < denominations.length; i++) {
            console.log(denominations[i]);
        }
    } else {
        console.log("No money specified.");
    }
}

main();
