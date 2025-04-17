document.querySelectorAll('.hidden-password').forEach(passwordElement => {
    passwordElement.addEventListener('click', () => {
        if (passwordElement.classList.contains('revealed')) {
            passwordElement.textContent = 'Kliknij, aby zobaczyć';
            passwordElement.classList.remove('revealed');
        } else {
            const password = passwordElement.getAttribute('data-password');
            passwordElement.textContent = password;
            passwordElement.classList.add('revealed');
        }
    });
});