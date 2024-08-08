const holes = document.querySelectorAll('.hole');
let score = 0;
let activeHole = null;
let gameInterval;

function startGame() {
    gameInterval = setInterval(() => {
        if (activeHole) {
            activeHole.classList.remove('active');
        }
        
        const randomHoleIndex = Math.floor(Math.random() * holes.length);
        activeHole = holes[randomHoleIndex];
        activeHole.classList.add('active');
    }, 1000);
}

holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('active')) {
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            hole.classList.remove('active');
            activeHole = null;
        }
    });
});

startGame();
