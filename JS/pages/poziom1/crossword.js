const crosswordData = [
    ['M', 'Y', 'S', 'Z', 'K', 'A'],
    ['R', 'A', 'M'],
    ['M', 'O', 'N', 'I', 'T', 'O', 'R'],
    ['D', 'Y', 'S', 'K'],
    ['K', 'L', 'A', 'W', 'I', 'A', 'T', 'U', 'R', 'A'],
    ['P', 'R', 'O', 'C', 'E', 'S', 'O', 'R'],
];

const targetColumn = 5;
const cellWidth = 40;
const gap = 2;
const cellTotalWidth = cellWidth + gap;

const crosswordContainer = document.getElementById('crossword');
const passwordInput = document.getElementById('password-input');
const passwordMessage = document.getElementById('password-message');



function createCell(letter) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    let input = null;
    if (letter !== '') {
        input = document.createElement('input');
        input.setAttribute('maxlength', '1');
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                const nextInput = e.target.parentElement.nextElementSibling?.querySelector('input');
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
        cellElement.appendChild(input);
    } else {
        cellElement.classList.add('blocked');
    }
    return { cellElement, input };
}

function createCell(letter) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    let input = null;

    if (letter !== '') {
        input = document.createElement('input');
        input.setAttribute('maxlength', '1');

        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                const nextInput = e.target.parentElement.nextElementSibling?.querySelector('input');
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '') {
                const prevInput = e.target.parentElement.previousElementSibling?.querySelector('input');
                if (prevInput) {
                    prevInput.focus();
                }
            }
        });

        cellElement.appendChild(input);
    } else {
        cellElement.classList.add('blocked');
    }

    return { cellElement, input };
}

function createCrossword() {
    crosswordData.forEach((rowData, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        const rowCells = [];

        rowData.forEach((letter, colIndex) => {
            const { cellElement, input } = createCell(letter);
            rowDiv.appendChild(cellElement);
            rowCells.push({ cellElement, input });
        });

        let start = 0;
        let highlightedIndex = null;
        while (start < rowCells.length) {
            if (!rowCells[start].input) {
                start++;
                continue;
            }
            let end = start;
            while (end + 1 < rowCells.length && rowCells[end + 1].input) {
                end++;
            }
            const length = end - start + 1;
            const midIndex = start + Math.floor(length / 2);
            if (rowCells[midIndex].input) {
                rowCells[midIndex].input.classList.add('highlight');
                rowCells[midIndex].input.addEventListener('input', updatePassword);
                highlightedIndex = midIndex;
            }
            start = end + 1;
        }

        if (highlightedIndex !== null) {
            const offset = targetColumn - highlightedIndex;
            rowDiv.style.marginLeft = (offset * cellTotalWidth) + "px";
        }

        crosswordContainer.appendChild(rowDiv);
    });
}

function updatePassword() {
    const inputs = document.querySelectorAll('.highlight');
    let guessedPassword = '';
    inputs.forEach(input => {
        guessedPassword += input.value.toUpperCase();
    });
    passwordInput.value = guessedPassword;
}

function checkPassword() {
    const guessedPassword = passwordInput.value.toUpperCase();

    if (guessedPassword === 'ASODE') {
        passwordMessage.style.color = 'green';
        passwordMessage.textContent = 'Hasło poprawne!';
    } else {
        passwordMessage.style.color = 'red';
        passwordMessage.textContent = 'Niepoprawne hasło. Spróbuj ponownie.';
    }
}

document.getElementById('check-password-btn').addEventListener('click', checkPassword);

createCrossword();