document.getElementById('check-answers-btn').addEventListener('click', () => {
    const questions = document.querySelectorAll('.question');
    let allCorrect = true;

    questions.forEach((question) => {
        const correctAnswer = question.getAttribute('data-correct');
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');

        question.querySelectorAll('li').forEach((li) => {
            li.classList.remove('correct', 'incorrect');
        });

        if (!selectedAnswer) {
            allCorrect = false;
        } else if (selectedAnswer.value !== correctAnswer) {
            allCorrect = false;
            selectedAnswer.closest('li').classList.add('incorrect');
        } else {
            selectedAnswer.closest('li').classList.add('correct');
        }
    });

    const quizMessage = document.getElementById('quiz-message');
    if (allCorrect) {
        quizMessage.style.color = 'green';
        quizMessage.textContent = 'Wszystkie odpowiedzi poprawne!';
        document.getElementById('password-display').textContent = 'Twoje hasło: QUIZMASTER';
    } else {
        quizMessage.style.color = 'red';
        quizMessage.textContent = 'Nie wszystkie odpowiedzi są poprawne. Spróbuj ponownie.';
        document.getElementById('password-display').textContent = '';
    }
});