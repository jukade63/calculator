let previousNum = "";
let currentNum = "";
let operator = undefined;

const numberBtns = document.querySelectorAll(".number");
const previousNumDisplay = document.querySelector(".previous");
const currentNumDisplay = document.querySelector(".current");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

//functions
function updateDisplay() {
  currentNumDisplay.textContent = currentNum;
  if (operator !== undefined) {
    previousNumDisplay.textContent = `${previousNum} ${operator}`;
  } else {
    previousNumDisplay.textContent = "";
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
    if (secondOperand === 0) {
      result = "Error, devided by 0";
    } else {
      result = firstOperand / secondOperand;
    }
  } else return;

  if (!isNaN(result)) {
    currentNum = Math.round(result * 10000) / 10000;
  } else {
    //display error text
    currentNum = result;
  }
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

function onOperatorClicked(op) {
  if (currentNum === "") return;
  if (previousNum !== "") {
    calculate();
  }
  operator = op;
  previousNum = currentNum;
  currentNum = "";
}
function clearScreen() {
  currentNum = "";
  previousNum = "";
  operator = undefined;
}

function deleteLastNum() {
  currentNum = currentNum.toString().slice(0, -1);
}

function handleKeyPress(e) {
  e.preventDefault();
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
    inputNumber(e.key);
  }
  if (e.key === "Enter" || e.key === "=") {
    calculate();
    updateDisplay()
  }
  if (e.key === "+" || e.key === "-" || e.key ==='*' || e.key === "/") {
    onOperatorClicked(e.key);
  }
  if (e.key === "Backspace") {
    deleteLastNum();
    updateDisplay()
  }
  if(e.key === "Escape"){
    clearScreen()
    updateDisplay()
  }
}

//Event listeners
numberBtns.forEach((num) =>
  num.addEventListener("click", (e) => inputNumber(e.target.textContent))
);

operatorBtns.forEach((op) =>
  op.addEventListener("click", (e) => onOperatorClicked(e.target.textContent))
);
equalBtn.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

clearBtn.addEventListener("click", () => {
  clearScreen();
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  deleteLastNum();
  updateDisplay();
});

window.addEventListener("keydown", handleKeyPress);
