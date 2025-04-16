function generateMaze(width, height) {
    const maze = Array(height).fill().map(() => Array(width).fill('W'));

    function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const frontier = [];

    function addFrontier(x, y) {
        const directions = [
            { dx: -2, dy: 0 },
            { dx: 2, dy: 0 },
            { dx: 0, dy: -2 },
            { dx: 0, dy: 2 }
        ];

        for (const { dx, dy } of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze[ny][nx] === 'W') {
                frontier.push({ x: nx, y: ny, wallX: x + dx / 2, wallY: y + dy / 2 });
            }
        }
    }

    maze[0][0] = ' ';
    addFrontier(0, 0);

    while (frontier.length > 0) {
        const frontierCell = randomChoice(frontier);
        const { x, y, wallX, wallY } = frontierCell;
        frontier.splice(frontier.indexOf(frontierCell), 1);

        if (maze[y][x] === 'W') {
            maze[y][x] = ' ';
            maze[wallY][wallX] = ' ';
            addFrontier(x, y);
        }
    }

    maze[0][0] = 'S';
    maze[height - 1][width - 1] = 'E';

    const endX = width - 1;
    const endY = height - 1;
    let isEndAccessible = false;

    const neighbors = [
        { x: endX - 1, y: endY },
        { x: endX, y: endY - 1 }
    ];

    for (const { x, y } of neighbors) {
        if (x >= 0 && x < width && y >= 0 && y < height && maze[y][x] === ' ') {
            isEndAccessible = true;
            break;
        }
    }

    if (!isEndAccessible) {
        const openNeighbor = randomChoice(neighbors.filter(n => n.x >= 0 && n.x < width && n.y >= 0 && n.y < height));
        maze[openNeighbor.y][openNeighbor.x] = ' ';
    }

    return maze;
}

const labyrinth = generateMaze(30, 30);

const labyrinthContainer = document.getElementById('labyrinth');
let playerPosition = { x: 0, y: 0 };

function renderLabyrinth() {
    labyrinthContainer.innerHTML = '';
    labyrinth.forEach((row, y) => {
        row.forEach((cell, x) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            if (cell === 'W') cellDiv.classList.add('wall');
            if (cell === 'S') cellDiv.classList.add('start');
            if (cell === 'E') cellDiv.classList.add('end');
            if (playerPosition.x === x && playerPosition.y === y) {
                cellDiv.classList.add('path');
            }
            labyrinthContainer.appendChild(cellDiv);
        });
    });
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (
        newX >= 0 &&
        newX < labyrinth[0].length &&
        newY >= 0 &&
        newY < labyrinth.length &&
        labyrinth[newY][newX] !== 'W'
    ) {
        playerPosition = { x: newX, y: newY };
        renderLabyrinth();

        if (labyrinth[newY][newX] === 'E') {
            document.getElementById('password-display').textContent = 'Twoje hasło: LABYRINTHOS';
        }
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

renderLabyrinth();
