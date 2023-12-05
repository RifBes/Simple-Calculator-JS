let a = '';
let b = '';
let sign = '';
let finish = false;
let ans = [];

const display = document.querySelector('.display');
const buttons = Array.from(document.querySelectorAll('.buttons'));

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const action = ['-', '+', '*', '/', '%'];
const sign_change = '+/-';
const comma = ',';

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    display.textContent = '0';
}

// document.querySelector('.ac').onclick = clearAll;

buttons.map((button) => {
    button.addEventListener("click", (e) => {
        if (!e.target.classList.contains('button')) return;
        if (e.target.classList.contains('ac')) {
            document.querySelector('.ac').onclick = clearAll;
            return;
        }
        display.textContent = '';

        const key = e.target.textContent;

        if (numbers.includes(key)) {
            if (b === '' && sign === '') {
                a += key;
                display.textContent = a;
            } 
            // else if (a !== '' && b !== '' && finish === true) {
            //     b = key;
            //     finish = false;
            //     display.textContent = b;
            //     console.log(`here a !== '' && b !== '' && finish === true: ${finish}`)
            //     console.log(a, b, sign, finish);
            // } 
            else {
                b += key;
                display.textContent = b;
            }
            //console.log(a, b, sign, finish);
        }

        if (action.includes(key)) {
            sign = key;
            display.textContent = sign;
        }

        if (key === sign_change) {
            if (b === '') {
                a = -a;
                display.textContent = a;
            } else {
                b = -b;
                display.textContent = b;
            }
        }

        if (key === comma) {
            if (sign === '' && b === '') {
                if (a === '') {
                    a = '0.';
                } else {
                    a += '.';
                }
                display.textContent = a;
            } else {
                if (b === '') {
                    b = '0.';
                } else {
                    b += '.';
                }
                display.textContent = b;
            }
        }

        if (key === '=') {
             if (b === '') {
                 a = calculate(a, b, sign);
             } else {
                 a = calculate(a, b, sign);
                 b = '';
             }
        };
    });
});

function calculate(a, b, sign) {
    if (b === '') {
        b = a;
    }
    switch (sign) {
        case '+':
            a = +a + +b;
            break;
        case '-':
            a = a - b;
            break;
        case '*':
            a = a * b;
            break;
        case '/':
            if (b === '0') {
                display.textContent = 'Error';
                a = '';
                b = '';
                sign = '';
                finish = false;
                return;
            }
            a = a / b;
            break;
        case '%':
            a = a / 100;
            break;
    };
    finish = true;
    display.textContent = a;
    return a;
}