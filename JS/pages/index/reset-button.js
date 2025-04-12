document.getElementById('reset-progress').addEventListener('click', () => {
    if (confirm('Czy na pewno chcesz zresetować postęp?')) {
        localStorage.clear();
        alert('Postęp został zresetowany!');
        location.reload();
    }
});