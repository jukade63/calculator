let previousNum = "";
let currentNum = "";
let operator = undefined;

const numberBtns = document.querySelectorAll(".number");
const previousNumDisplay = document.querySelector(".previous");
const currentNumDisplay = document.querySelector(".current");
const operatorBtns = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");

numberBtns.forEach((num) =>
  num.addEventListener("click", (e) => inputNumber(e.target.textContent))
);

equal.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

function updateDisplay() {
  currentNumDisplay.textContent = currentNum;
  if (operator !== undefined) {
    previousNumDisplay.textContent = `${previousNum} ${operator}`;
  } else {
    previousNumDisplay.textContent = "";
    currentNum = "";
  }
}

function calculate() {
  let result;
  const firstOperand = parseFloat(previousNum);
  const secondOperand = parseFloat(currentNum);
  if (isNaN(firstOperand || isNaN(secondOperand))) return;

  if (operator === "+") {
    result = firstOperand + secondOperand;
  } else if (operator === "-") {
    result = firstOperand - secondOperand;
  } else if (operator === "*") {
    result = firstOperand * secondOperand;
  } else if (operator === "/") {
    result = firstOperand / secondOperand;
  } else return;

  currentNum = result;
  operator = undefined;
  previousNum = "";
}

function inputNumber(number) {
  currentNum += number;
  currentNumDisplay.textContent = currentNum;
  if (operator !== undefined) {
    previousNumDisplay.textContent = `${previousNum} ${operator}`;
  } else {
    previousNumDisplay.textContent = "";
  }
}
operatorBtns.forEach((op) =>
  op.addEventListener("click", (e) => onOperatorClicked(e.target.textContent))
);

function onOperatorClicked(op) {
  if (currentNum === "") return;
  if (previousNum !== "") {
    calculate();
  }
  operator = op;
  previousNum = currentNum;
  currentNum = "";
}

clear.addEventListener("click", clearDisplay);

function clearDisplay() {
  currentNum = "";
  previousNum = "";
  operator = undefined;
  updateDisplay();
}
