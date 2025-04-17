document.addEventListener('DOMContentLoaded', () => {
    const currentLevel = window.location.pathname.split('/').pop().replace('.html', '');

    const levelConfig = window.levelConfig;

    if (levelConfig && levelConfig[currentLevel]) {
        const { password, unlock } = levelConfig[currentLevel];

        const checkPasswordBtn = document.getElementById("check-password-btn");
        const passwordInput = document.getElementById("password-input");
        const passwordMessage = document.getElementById("password-message");

        if (checkPasswordBtn) {
            checkPasswordBtn.addEventListener('click', () => {
                const userInput = passwordInput.value;

                if (userInput === password) {
                    if (currentLevel === 'poziom5') {
                        localStorage.setItem('gameCompleted', 'true');
                        window.location.href = 'index.html';
                    } else if (unlock) {
                        localStorage.setItem(unlock, 'unlocked');
                        passwordMessage.style.color = "green";
                        passwordMessage.textContent = `Hasło poprawne! Poziom ${unlock.replace('poziom', '')} został odblokowany.`;
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 2000);
                    }
                } else {
                    passwordMessage.style.color = "red";
                    passwordMessage.textContent = "Niepoprawne hasło. Spróbuj ponownie.";
                }
            });
        }
    }

    const buttons = document.querySelectorAll('.large-button');
    buttons.forEach(button => {
        const levelId = button.id;
        if (localStorage.getItem(levelId) === 'unlocked') {
            button.style.display = 'block';
        } else if (levelId !== 'poziom1') {
            button.style.display = 'none';
        }
    });

    if (localStorage.getItem('gameCompleted') === 'true') {
        localStorage.removeItem('gameCompleted');
        showCongratulations();
    }
});

function showCongratulations() {
    const body = document.body;

    const congratsOverlay = document.createElement('div');
    congratsOverlay.classList.add('congrats-overlay');
    congratsOverlay.innerHTML = `
        <div class="congrats-message">
            🎉🎊 <h1>Gratulacje!</h1> 🎊🎉
            <p>Udało Ci się przejść wszystkie poziomy łamigłówek!</p>
            <button id="close-congrats-btn">Zamknij</button>
        </div>
    `;
    body.appendChild(congratsOverlay);

    const confettiScript = document.createElement('script');
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    confettiScript.onload = () => {
        const duration = 5 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 90,
                spread: 55,
                origin: { x: 0, y: 1 }
            });

            confetti({
                particleCount: 5,
                angle: 90,
                spread: 55,
                origin: { x: 1, y: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };
    document.body.appendChild(confettiScript);

    document.getElementById('close-congrats-btn').addEventListener('click', () => {
        document.querySelector('.congrats-overlay').remove();
    });
}
