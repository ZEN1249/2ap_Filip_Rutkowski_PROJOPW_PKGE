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
                    if (unlock) {
                        // Zapisz odblokowanie poziomu w localStorage
                        localStorage.setItem(unlock, 'unlocked');
                    }
                    passwordMessage.style.color = "green";
                    passwordMessage.textContent = `Hasło poprawne! ${unlock ? `Poziom ${unlock.replace('poziom', '')} został odblokowany.` : ''}`;
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
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
});