import  game  from "./game.js";


game.startGame();


  function playAgain(){
        window.location.reload();
    }


async function addRecords() {
    try {
        // 1. Olvassuk ki a két értéket a modalból
        const nickname = document.getElementById('nicknameInput').value.trim();
        const score = game.gameLoop.status.getAsteroidStatus();

        if (!nickname || nickname.length > 15) {
            alert('Adj meg egy nevet (1-15 karakter)!');
            return;
        }

        // 2. Küldés GET paraméterekkel
        const response = await fetch(`/api/spaceships?nickName=${encodeURIComponent(nickname)}&score=${score}`);
        const records = await response.json();

        // 3. Modal frissítés
        const header = document.getElementById('modalHeader');
        const container = document.getElementById('modalInnerContent');
        container.innerHTML = ''; // törlés

        records.forEach(rec => {
            const p = document.createElement('p');
            p.textContent = `Name: ${rec.nickName}, Score: ${rec.score}`;
            container.appendChild(p);
        });

        header.innerHTML = 'Records:';
        document.getElementById('addRecordBtn').remove();
        document.getElementById('nicknameModal').style.display = 'flex';

    } catch (err) {
        console.error('Hiba történt:', err);
    }
}

window.playAgain = playAgain;
window.addRecords = addRecords;
