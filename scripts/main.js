const numberButton = document.querySelectorAll('[data-number]');
const operatorButton = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const changeSignButton = document.querySelector('[data-sign]');
const upperLog = document.querySelector('[data-upperlog]');
const mainLog = document.querySelector('[data-mainlog]');

class Calculator {
    constructor (upperOperand, mainOperand) {
        this.currentOperandDisplay = mainOperand;
        this.previousOperandDisplay = upperOperand;
        this.clearAll()
    }
    clearAll() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
        this.equalized = false;
    }
    appendNumber(number){
        if (number === '.' && this.currentOperand.toString().includes('.')) return
        if (this.equalized === true) this.clearAll();
        this.currentOperand = this.currentOperand.toString() + number.toString()
        this.equalized = false;
    }
    deleteNumber() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    changeSign() {
        if (this.currentOperand==='.') return;
        this.currentOperand *= -1;
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.equalized = false;
    }
    compute(){
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return
        let computation
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    roundNumber(number) {
        const stringNumber = number.toString();
        const integer = parseFloat(stringNumber.split('.')[0]);
        const decimal = stringNumber.split('.')[1];
        let integerDisplay;
        isNaN(integer) ? integerDisplay = '' : integerDisplay = integer.toLocaleString('en');
        if (decimal != null) return `${integerDisplay}.${decimal.slice(0,10)}`;
        else return integerDisplay;
    }
    updateDisplay(){
        this.currentOperandDisplay.textContent = this.roundNumber(this.currentOperand);
        if (this.operation === undefined) {
            this.previousOperandDisplay.textContent = this.roundNumber(this.previousOperand);
        } else {
            this.previousOperandDisplay.textContent = `${this.roundNumber(this.previousOperand)} ${this.operation.toString()}`;
        }
    }
}
const calculator = new Calculator(upperLog, mainLog);
numberButton.forEach((button)=>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })
});
operatorButton.forEach((button)=>{
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    })
});
clearButton.addEventListener('click', () => {
        calculator.clearAll();
        calculator.updateDisplay();
});
equalsButton.addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
        calculator.equalized = true;
});
changeSignButton.addEventListener('click', () => {
        calculator.changeSign();
        calculator.updateDisplay();
});
deleteButton.addEventListener('click', () => {
        calculator.deleteNumber();
        calculator.updateDisplay();
});
window.addEventListener('keydown', (key)=> {
    switch (key.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            calculator.appendNumber(key.key);
            calculator.updateDisplay();
            break;
        case '*':
        case '/':
        case '-':
        case '+':
            calculator.chooseOperation(key.key);
            calculator.updateDisplay();
            break;
        case 'Enter':
            calculator.compute();
            calculator.updateDisplay();
            calculator.equalized = true;
            break;
        case 'Backspace':
            calculator.deleteNumber();
            calculator.updateDisplay();
            break;
        default:
            break;
    }
})