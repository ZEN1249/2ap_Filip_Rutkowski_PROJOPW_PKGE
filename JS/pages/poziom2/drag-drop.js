const dragItems = document.querySelectorAll('.drag-item');
const dropZones = document.querySelectorAll('.drop-zone');
const messageElement = document.getElementById('drag-drop-message');
const passwordDisplay = document.getElementById('password-display');

const expectedValues = {
    zone1: 'HTML',
    zone2: 'CSS',
    zone3: 'JS',
    zone4: 'SQL',
    zone5: 'API',
    zone6: 'OOP',
    zone7: 'IDE',
    zone8: 'HTTP'
};


document.addEventListener('DOMContentLoaded', () => {
    messageElement.textContent = '';
    passwordDisplay.textContent = '';
});

dragItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
    });
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedItemId = e.dataTransfer.getData('text');
        const draggedItem = document.getElementById(draggedItemId);

        if (zone.id === `zone${draggedItemId.slice(-1)}`) {
            zone.textContent = draggedItem.textContent;
            draggedItem.remove();
            messageElement.style.color = 'green';
            messageElement.textContent = 'Element dopasowany poprawnie!';
            checkCompletion();
        } else {
            messageElement.style.color = 'red';
            messageElement.textContent = 'Element dopasowany niepoprawnie. Spróbuj ponownie.';
        }
    });
});

function checkCompletion() {
    let allCorrect = true;

    dropZones.forEach(zone => {
        const expectedText = expectedValues[zone.id];
        const currentText = zone.textContent.trim();

        if (currentText !== expectedText) {
            allCorrect = false;
        }
    });

    if (allCorrect && document.querySelectorAll('.drag-item').length === 0) {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Wszystkie elementy dopasowane poprawnie!';
        passwordDisplay.textContent = 'Twoje hasło: PROGRAMOWANIE';
    } else if (!allCorrect) {
        passwordDisplay.textContent = '';
    }
}