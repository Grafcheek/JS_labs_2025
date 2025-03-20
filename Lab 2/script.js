window.onload = function () {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    
    outputElement = document.getElementById("result");
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '') return;
        selectedOperation = 'x';
    };
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '') return;
        selectedOperation = '+';
    };
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '') return;
        selectedOperation = '-';
    };
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '') return;
        selectedOperation = '/';
    };

    document.getElementById("btn_op_clear").onclick = function () {
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        accumulatedSum = 0;
        accumulatedSubtraction = 0;
        outputElement.innerHTML = 0;
    };

    document.getElementById("btn_op_equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation) return;

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
        }

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    };

    
    document.getElementById("btn_op_sign").onclick = function () {
        if (a !== '' && !selectedOperation) {
            a = (-a).toString();
            outputElement.innerHTML = a;
        } else if (b !== '') {
            b = (-b).toString();
            outputElement.innerHTML = b;
        }
    };

    
    document.getElementById("btn_op_percent").onclick = function () {
        if (a !== '' && !selectedOperation) {
            a =  (a/ 100).toString();
            outputElement.innerHTML = a;
        }
    };

    
    document.getElementById("btn_op_backspace").onclick = function () {
        if (!selectedOperation && a !== '') {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || 0;
        } else if (b !== '') {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || 0;
        }
    };

    
    document.getElementById("themeToggle").onclick = function () {
        document.body.classList.toggle("blue-theme");
    };

    
    document.getElementById("btn_op_sqrt").onclick = function () {
        if (a !== '' && !selectedOperation) {
            a = Math.sqrt(+a).toString();
            outputElement.innerHTML = a;
        }
    };

    document.getElementById("fallTime_on_moon").onclick = function () {
        if (a !== '' && !selectedOperation) {
            a = Math.sqrt(+a*2/1.625).toString();
            outputElement.innerHTML = a;
        }
    };

    
    document.getElementById("btn_op_square").onclick = function () {
        if (a !== '' && !selectedOperation) {
            a = Math.pow(+a, 2).toString();
            outputElement.innerHTML = a;
        }
    };

    
    document.getElementById("btn_op_factorial").onclick = function () {
        function factorial(n) {
            return n <= 1 ? 1 : n * factorial(n - 1);
        }
        if (a !== '' && !selectedOperation) {
            a = factorial(+a).toString();
            outputElement.innerHTML = a;
        }
    };

    
    document.getElementById("btn_op_triple_zero").onclick = function () {
        onDigitButtonClicked('000');
    };

    document.getElementById("btn_op_change_result_color").onclick = function () {
        outputElement.classList.toggle("color-change");
    };
    
};