window.onload = function () {
    const screen = document.querySelector('.screen') as HTMLDivElement;

    let currentInput: string = '';
    let operator: string | null = null;
    const operands: number[] = [];
    const operators: string[] = [];

    //function for updating the screen
    const updateScreen = () => {
        const expression = operands.map((op, index) => {
            const opString = op.toString();
            const operatorString = operators[index] ? ` ${operators[index]} ` : '';
            return opString + operatorString;
        }).join('') + (currentInput ? currentInput : '');

        if (screen) {
            screen.textContent = expression;
        }
    };

    //function for handling clicks on each button
    const handleButtonClick = (e: Event) => {
        const button = e.target as HTMLElement;
        const value = button.textContent?.trim();

        if (!value) return;

        if (!isNaN(parseFloat(value))) {
            currentInput += value;
            updateScreen();
        } else if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateScreen();
            }
        } 
        else if (['+', '-', 'x', '/', '^', 'root'].includes(value)) {
            if (currentInput) {
                operands.push(parseFloat(currentInput));
                operators.push(value);
                currentInput = '';
            }
            updateScreen();
        }
    };

    //function for handling the equals operation for each operand
    const handleEqualsClick = () => {
        if (currentInput) {
            operands.push(parseFloat(currentInput));
            let result: number | null = operands[0];

            for (let i = 0; i < operators.length; i++) {
                const op = operators[i];
                const nextOperand = operands[i + 1];

                switch (op) {
                    case '+':
                        result += nextOperand!;
                        break;
                    case '-':
                        result -= nextOperand!;
                        break;
                    case 'x':
                        result *= nextOperand!;
                        break;
                    case '/':
                        result /= nextOperand!;
                        break;
                    case '^':
                        result = Math.pow(result, nextOperand!);
                        break;
                    case 'root':
                        result = Math.pow(result, 1 / nextOperand!);
                        break;
                }
            }

            if (result !== null) {
                screen.textContent = result.toString();
                currentInput = '';
                operands.length = 0;
                operators.length = 0;
            }
        }
    };

    const buttons = document.querySelectorAll('.buttons');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    const equalsButton = document.getElementById('equals');
    if (equalsButton) {
        equalsButton.addEventListener('click', handleEqualsClick);
    }
};
