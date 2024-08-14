//get element locations
const problem = document.querySelector("#problems");
let currentProblem = "";
const input = document.querySelector("#input");
const output = document.querySelector("#feedback-container");
const answer = document.querySelector("#answer");
const openFilters = document.querySelector("#open-filters");
let open = false;
const filterWrapper = document.querySelector("#filter-wrapper");
const skip = document.querySelector("#skip");

//create problem config
const config = { difficulty: 2, min: 1, max: 10, operators: ["+", "-", "*", "/"] }

//create filter elements
const filters = document.createElement("div");
filters.className = "filter-wrapper";
const operators = document.createElement("div");
const addition = createFilter("Addition", "+");
const subtraction = createFilter("Subtraction", "-");
const multiplication = createFilter("Multiplicaion", "*");
const division = createFilter("Division", "/");
operators.appendChild(addition);
operators.appendChild(subtraction);
operators.appendChild(multiplication);
operators.appendChild(division);
filters.appendChild(operators);
openFilters.addEventListener("click", () => {
    open = !open;
    if (open) {
        filterWrapper.appendChild(filters);
    } else {
        filterWrapper.removeChild(filters);
    }
});
//create range elements
const ranges = document.createElement("div");
const operations = document.createElement("div");
operations.className = "range-wrapper";
const operationsLabel = document.createElement("label");
operationsLabel.htmlFor = "operations-input";
operationsLabel.innerText = "Difficulty: ";
const operationsInput = document.createElement("input");
operationsInput.type = "number";
operationsInput.id = "operations-input";
operationsInput.value = config.difficulty;
operations.appendChild(operationsLabel);
operations.appendChild(operationsInput);
const min = document.createElement("div");
min.className = "range-wrapper";
const minLabel = document.createElement("label");
minLabel.htmlFor = "min-input";
minLabel.innerText = "Min: ";
const minInput = document.createElement("input");
minInput.type = "number";
minInput.id = "min-input";
minInput.value = config.min;
min.appendChild(minLabel);
min.appendChild(minInput);
const max = document.createElement("div");
max.className = "range-wrapper";
const maxLabel = document.createElement("label");
maxLabel.htmlFor = "max-input";
maxLabel.innerText = "Max: ";
const maxInput = document.createElement("input");
maxInput.type = "number";
maxInput.id = "max-input";
maxInput.value = config.max;
max.appendChild(maxLabel);
max.appendChild(maxInput);
ranges.appendChild(operations);
ranges.appendChild(min);
ranges.appendChild(max);
filters.appendChild(ranges);

//addEventListeners
answer.addEventListener("click", () => {
    revealAnswer(false);
    currentProblem = createProblem();
    problem.innerText = currentProblem;
});
skip.addEventListener("click", () => {
    currentProblem = createProblem();
    problem.innerText = currentProblem;
});
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (evalProblem(input.value, currentProblem)) {
            revealAnswer(true);
            currentProblem = createProblem();
            problem.innerText = currentProblem;
        } else {
            output.innerText = "Incorrect! Try again!";
        }
        input.value = "";
    }
});
operationsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        operationsInput.value <= 5 ? config.difficulty = Number(operationsInput.value) : operationsInput.value = config.difficulty;
    }
});
operationsInput.addEventListener("blur", () => {
    operationsInput.value > 0 && operationsInput.value <= 5 ? config.difficulty = Number(operationsInput.value) : operationsInput.value = config.difficulty;
});
minInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        minInput.value < config.max ? config.min = Number(minInput.value) : minInput.value = config.min;
    }
});
minInput.addEventListener("blur", () => {
    minInput.value < config.max ? config.min = Number(minInput.value) : minInput.value = config.min;
});
maxInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        config.min < maxInput.value && maxInput.value < 1000000 ? config.max = Number(maxInput.value) : maxInput.value = config.max;
    }
});
maxInput.addEventListener("blur", () => {
    config.min < maxInput.value && maxInput.value < 1000000 ? config.max = Number(maxInput.value) : maxInput.value = config.max;
});

//add first problem
currentProblem = createProblem();
problem.innerText = currentProblem;

//functions
function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNonZeroRand() {
    let newNum = getRandNum();
    while (!newNum) {
        newNum = getRandNum(config.min, config.max);
    }
    return newNum;
}

function getRandOperators() {
    return config.operators[getRandNum(0, config.operators.length - 1)];
}

function createProblem() {
    let problem = getRandNum(config.min, config.max);
    for (let arg = 0; arg < config.difficulty; arg++) {
        let nextOperator = getRandOperators();
        let newNum = getRandNum(config.min, config.max);
        switch (nextOperator) {
            case "+":
            case "-":
                newNum = getNonZeroRand();
                break;
            case "/":
                let tries = 0;
                newNum = getNonZeroRand(config.min, config.max);
                while (newNum < 0 || eval(filterString(getLastDivisibleString(String(problem)))) % newNum !== 0) { //ensure divsion ends up with a whole number
                    newNum = getNonZeroRand(config.min, config.max);
                    tries++;
                    if (tries > 100) { //after 100 tries switch to a different operator
                        if (config.operators.length === 1) { //if just division
                            newNum = 1;
                        } else {
                            while (nextOperator === "/") {
                                nextOperator = getRandOperators();
                            }
                            newNum = getNonZeroRand();
                            break;
                        }
                    }
                }
                break;
        }
        if (nextOperator === "-" && newNum < 0) nextOperator = "";
        problem += nextOperator;
        problem += newNum;
    }
    return problem;
}

function evalProblem(input, target) {
    return input == eval(filterString(target));
}

function revealAnswer(withInput) {
    output.innerText = `${withInput ? "That's Correct! The answer is " : "The answer was "} ${eval(filterString(currentProblem))}`;
}

function createFilter(labelName, operator) {
    const element = document.createElement("div");
    element.className = "filter-wrapper";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.id = labelName;
    const label = document.createElement("label");
    label.htmlFor = labelName;
    label.innerText = labelName;
    element.appendChild(input);
    element.appendChild(label);

    input.addEventListener("change", () => {
        if (input.checked) {
            if (!config.operators.includes(operator)) {
                config.operators.push(operator);
            }
        } else {
            const index = config.operators.indexOf(operator);
            if (index !== -1) {
                config.operators.splice(index, 1);
            }
        }
    });
    return element;
}

function getLastDivisibleString(problem) {
    const pattern = /[+-]/;
    const sections = problem.split(pattern);
    return sections[sections.length - 1];
}

//for eval safety
function filterString(inputString) {
    const pattern = /[0-9+\-*/]/g;
    const matches = inputString.match(pattern);
    if (!matches) {
        return "";
    } else {
        return matches.join("");
    }
}