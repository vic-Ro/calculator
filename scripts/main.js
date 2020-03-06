/******* CLASS CALCULATOR *******/
class Calculator {
    constructor (previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
/******* METHODS *******/
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.equals = false;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.toString().includes('.')) return;
        if (this.equals === true && this.currentOperand!=='') {
             this.clear();
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.equals = false;
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    changeSign () {
        this.currentOperand*=-1;
    }
    getDisplayNumber(number) {
        const integerDigits = parseFloat(number.toString().split('.')[0]);
        const decimalDigits = number.toString().split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits:0});
        }
        if (decimalDigits!= null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return `${integerDisplay}`;
        }

    }
    updateDisplay() {
        this.currentOperandTextElement.textContent =  this.getDisplayNumber(this.currentOperand);
        if(this.operation!= null) {
            return this.previousOperandTextElement.textContent = `${ this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.textContent =  this.getDisplayNumber(this.previousOperand);
        }
    }
}
/******* VARIABLES *******/
const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const changSignButton = document.querySelector('[data-sign]');
const previousOperandTextElement = document.querySelector('[data-prev-operand]');
const currentOperandTextElement = document.querySelector('[data-curr-operand]');

/******* CALCULATOR OBJECT *******/

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

/******* EVENT LISTENERS *******/

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});
opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    });
});
equalButton.addEventListener('click', (button) => {
        calculator.compute();
        calculator.updateDisplay();
        calculator.equals = true;
});
clearButton.addEventListener('click', (button) => {
        calculator.clear();
        calculator.updateDisplay();
});
deleteButton.addEventListener('click', (button) => {
        calculator.delete();
        calculator.updateDisplay();
});
changSignButton.addEventListener('click', (button) => {
        calculator.changeSign();
        calculator.updateDisplay();
});