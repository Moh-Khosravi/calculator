const prev = document.querySelector('#preValue');
const curr = document.querySelector('#currentValue');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operation');
const clearAll = document.querySelector('#clear');
const backSpace = document.querySelector('#backspace');
const equal = document.querySelector('#equal');
const lastEq = document.querySelector('#lastEquation');
const root = document.querySelector('#root');
const percent = document.querySelector('#percent');
const plusMinus = document.querySelector('#plusminus');
const btnPi = document.querySelector('#pi');
const power2 = document.querySelector('#power2');
const inputSwitch = document.querySelector('#inputSwitch');
const main = document.querySelector('main');
const span = document.querySelector('.material-icons');
const output = document.querySelector('#output');

let currValue = '';
let prevValue = '';
let operator = undefined;
let isResult = false;

function clear() {
  currValue = '';
  prevValue = '';
  operator = undefined;
  lastEq.innerHTML = '';
}

function deleteLast() {
  currValue = currValue.slice(0, -1);
}

function appendNumber(number) {
  if (currValue.includes('.') && number === '.') return;
  currValue = currValue + String(number);
}

function chooseOperation(operation) {
  if (currValue === '') {
    return;
  }
  if (prev.innerHTML !== '') {
    solve();
  }
  operator = operation;
  prevValue = currValue;
  currValue = '';
}

function solve() {
  let result = '';
  if (isNaN(Number(prevValue)) || isNaN(Number(currValue))) {
    return;
  }
  if (operator === '+') {
    result += Number(prevValue) + Number(currValue);
  } else if (operator === '-') {
    result += Number(prevValue) - Number(currValue);
  } else if (operator === 'x') {
    result += Number(prevValue) * Number(currValue);
  } else if (operator === '÷') {
    result += Number(prevValue) / Number(currValue);
  }
  lastEq.innerHTML =
    getNumber(prevValue.slice(0, 12)) + operator + getNumber(currValue);
  currValue = result;
  prevValue = '';
  operator = undefined;
  isResult = true;
}

function getNumber(param) {
  let result = '';
  const paramToArray = param.split('.');
  for (let i in paramToArray[0]) {
    if (Number(i) % 3 === 0 && Number(i) !== 0) {
      result += ',';
    }
    result += paramToArray[0][i];
  }
  if (param.endsWith('.')) {
    result += '.';
  }
  if (paramToArray[1]) {
    result = result + '.' + paramToArray[1];
  }
  return result;
}

function updateDisplay() {
  if (currValue === 'Infinity') {
    curr.innerHTML = 'Error';
    prev.innerHTML = '';
    return;
  }
  if (currValue.length <= 12) {
    curr.innerHTML = getNumber(currValue);
  } else {
    curr.innerHTML = getNumber(currValue.slice(0, 12));
  }

  if (operator) {
    prev.innerHTML = getNumber(prevValue.slice(0, 12)) + operator;
  } else {
    prev.innerHTML = '';
  }
  if (currValue === '' && operator) {
    curr.innerHTML = '0';
  }
  if (currValue === '') {
    curr.innerHTML = '0';
  }
}

numbers.forEach((number) => {
  number.addEventListener('click', () => {
    if (isResult === false) {
      appendNumber(number.innerHTML);
      updateDisplay();
    } else if (isResult === true && operator) {
      appendNumber(number.innerHTML);
      isResult = false;
      updateDisplay();
    } else {
      currValue = '';
      appendNumber(number.innerHTML);
      updateDisplay();
      isResult = false;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', () => {
    chooseOperation(operator.innerHTML);
    updateDisplay();
  });
});

clearAll.addEventListener('click', () => {
  clear();
  updateDisplay();
});

equal.addEventListener('click', () => {
  solve();
  updateDisplay();
});

backSpace.addEventListener('click', () => {
  deleteLast();
  updateDisplay();
});

root.addEventListener('click', () => {
  if (currValue.length > 0) {
    currValue = String(Math.sqrt(currValue));
    updateDisplay();
  } else {
    currValue = String(Math.sqrt(prevValue));
    updateDisplay();
  }
});

percent.addEventListener('click', () => {
  if (!prevValue && !currValue) {
    return;
  }
  if (prevValue && !currValue) {
    currValue = String(prevValue * (prevValue / 100));
    updateDisplay();
  }
  currValue = String(currValue * (prevValue / 100));
  updateDisplay();
});

plusMinus.addEventListener('click', () => {
  currValue = String(currValue * -1);
  updateDisplay();
});

btnPi.addEventListener('click', () => {
  currValue = String(Math.PI);
  updateDisplay();
});

power2.addEventListener('click', () => {
  if (currValue.length > 0) {
    currValue = String(Math.pow(currValue, 2));
    updateDisplay();
  } else {
    currValue = String(Math.pow(prevValue, 2));
    updateDisplay();
  }
});
function classAddRemove(params1, params2, params3) {
  params1.classList.add(params2);
  params1.classList.remove(params3);
}
inputSwitch.addEventListener('change', () => {
  if (!inputSwitch.checked) {
    span.innerHTML = 'light_mode';
    main.className = 'light';
    numbers.forEach((number) => {
      classAddRemove(number, 'btnLight', 'btnDark');
    });
    classAddRemove(root, 'btnLight-brown', 'btnDark-brown');
    classAddRemove(percent, 'btnLight-brown', 'btnDark-brown');
    classAddRemove(plusMinus, 'btnLight-brown', 'btnDark-brown');
    classAddRemove(btnPi, 'btnLight-brown', 'btnDark-brown');
    classAddRemove(power2, 'btnLight-brown', 'btnDark-brown');
    classAddRemove(backSpace, 'btnLight', 'btnDark');
    operators.forEach((number) => {
      classAddRemove(number, 'btnLight-operator', 'btnDark-operator');
    });
    classAddRemove(clearAll, 'btnLight-clearAll', 'btnDark-clearAll');
    classAddRemove(equal, 'btnLight-equal', 'btnDark-equal');
    classAddRemove(span, 'btnLight-icon', 'btnDark-icon');
    classAddRemove(output, 'outputLight', 'outputDark');
  } else {
    span.innerHTML = 'nightlight_round';
    main.className = 'dark';
    numbers.forEach((number) => {
      classAddRemove(number, 'btnDark', 'btnLight');
    });
    classAddRemove(root, 'btnDark-brown', 'btnLight-brown');
    classAddRemove(percent, 'btnDark-brown', 'btnLight-brown');
    classAddRemove(plusMinus, 'btnDark-brown', 'btnLight-brown');
    classAddRemove(btnPi, 'btnDark-brown', 'btnLight-brown');
    classAddRemove(power2, 'btnDark-brown', 'btnLight-brown');
    classAddRemove(backSpace, 'btnDark', 'btnLight');
    operators.forEach((number) => {
      classAddRemove(number, 'btnDark-operator', 'btnLight-operator');
    });
    classAddRemove(clearAll, 'btnDark-clearAll', 'btnLight-clearAll');
    classAddRemove(equal, 'btnDark-equal', 'btnLight-equal');
    classAddRemove(span, 'btnDark-icon', 'btnLight-icon');
    classAddRemove(output, 'outputDark', 'outputLight');
  }
});
