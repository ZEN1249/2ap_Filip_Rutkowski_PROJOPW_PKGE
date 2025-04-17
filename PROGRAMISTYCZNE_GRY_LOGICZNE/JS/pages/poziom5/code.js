const codeSnippets = [
    {
        snippet: `function greet() {\n    console.log("<span class='missing-code'>???</span>");\n}\ngreet();`,
        correctAnswer: 'Hello, World!'
    },
    {
        snippet: `function add(a, b) {\n    return <span class='missing-code'>???</span>;\n}\nconsole.log(add(2, 3));`,
        correctAnswer: 'a + b'
    },
    {
        snippet: `const multiply = (x, y) => <span class='missing-code'>???</span>;\nconsole.log(multiply(4, 5));`,
        correctAnswer: 'x * y'
    },
    {
        snippet: `if (<span class='missing-code'>???</span>) {\n    console.log("Condition met!");\n}`,
        correctAnswer: 'true'
    },
    {
        snippet: `const divide = (a, b) => <span class='missing-code'>???</span>;\nconsole.log(divide(10, 2));`,
        correctAnswer: 'a / b'
    },
    {
        snippet: `for (let i = 0; i < 5; i++) {\n    console.log("<span class='missing-code'>???</span>");\n}`,
        correctAnswer: 'i'
    },
    {
        snippet: `const isEven = (num) => <span class='missing-code'>???</span>;\nconsole.log(isEven(4));`,
        correctAnswer: 'num % 2 === 0'
    },
    {
        snippet: `const square = (n) => <span class='missing-code'>???</span>;\nconsole.log(square(3));`,
        correctAnswer: 'n * n'
    },
    {
        snippet: `const greetUser = (name) => {\n    return "<span class='missing-code'>???</span>";\n};\nconsole.log(greetUser("Alice"));`,
        correctAnswer: '`Hello, ${name}!`'
    },
    {
        snippet: `const factorial = (n) => {\n    if (n === 0) return 1;\n    return <span class='missing-code'>???</span>;\n};\nconsole.log(factorial(5));`,
        correctAnswer: 'n * factorial(n - 1)'
    }
];

let currentSnippet = null;

function normalizeInput(input) {
    return input.replace(/\s+/g, '').toLowerCase();
}

function loadRandomSnippet() {
    const randomIndex = Math.floor(Math.random() * codeSnippets.length);
    currentSnippet = codeSnippets[randomIndex];
    document.getElementById('code-snippet').innerHTML = currentSnippet.snippet;
}

document.getElementById('check-code-btn').addEventListener('click', () => {
    const userInput = document.getElementById('code-input').value.trim();
    const normalizedUserInput = normalizeInput(userInput);
    const normalizedCorrectAnswer = normalizeInput(currentSnippet.correctAnswer);

    const codeMessage = document.getElementById('code-message');
    const passwordDisplay = document.getElementById('password-display');

    if (normalizedUserInput === normalizedCorrectAnswer) {
        codeMessage.style.color = 'green';
        codeMessage.textContent = 'Kod jest poprawny!';
        passwordDisplay.textContent = 'Twoje hasło: KODMASTER';
    } else {
        codeMessage.style.color = 'red';
        codeMessage.textContent = 'Kod jest niepoprawny. Spróbuj ponownie.';
        passwordDisplay.textContent = '';
    }
});

document.getElementById('check-password-btn').addEventListener('click', () => {
    const passwordInput = document.getElementById('password-input').value.trim();
    const passwordMessage = document.getElementById('password-message');

    if (passwordInput === 'KODMASTER') {
        passwordMessage.style.color = 'green';
        passwordMessage.textContent = 'Hasło poprawne! Przechodzisz dalej.';
    } else {
        passwordMessage.style.color = 'red';
        passwordMessage.textContent = 'Niepoprawne hasło. Spróbuj ponownie.';
    }
});

loadRandomSnippet();