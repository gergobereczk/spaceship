let GameStates = ["INIT", "STARTED", "GAMEOVER"];

let GameState = "INIT";

let activeAsteroids = [];
let passiveAsteroids = [];

let passiveLaser = [];
let temporaryLaser = [];
let activeLaser = [];

let life = 5;
let savedAsteroiddemage = 0;
let asteroiddemage = 0;
let lasertimer = 10;

let spacePressed = false;

let gameOverTime = 8000;
pauseTime = 0;

let gameOver = document.getElementById("gameOver");
let spaceship = document.getElementById("spaceship");

let display = document.getElementById("display");
let moving = { left: false, right: false };
let left = 0;

function initGame() {
    initControlling();

    spawnAsteroid(5);
    spawnLaser(25);
    spaceship.style.left = (display.clientWidth / 2) - (spaceship.clientWidth / 2) + "px";

}

function startGame() {
    initGame();
    GameState = "STARTED";
    gameLoop();

}


function gameLoop() {


    requestAnimationFrame(gameLoop);

    step();



    checkGameOver();

    if (GameState === "STARTED") {
        showStatus();
        checkCollision();
    }
}


function laserTimerStep() {
    lasertimer += 1;
}


function showStatus() {
    document.getElementById("life").innerText = "Life: " + life;
    document.getElementById("asteroiddemage").innerText = "Asteroid left: " + asteroiddemage;
    document.getElementById("laserStatus").innerText = "Lasers: " + passiveLaser.length;
}

function checkGameOver() {
    if (life <= 0) {
        if (GameState !== "GAMEOVER"){savedAsteroiddemage = asteroiddemage;}
        
        GameState = "GAMEOVER";
        gameOver.style.display = "block";
        gameOverTime -= 30;

        if (gameOverTime <= 0) {

        document.getElementById("nicknameModal").style.display = "flex";
        gameOver.style.display = "none";
    }

    }
}





function step() {


    if (pauseTime <= 0) {
        shipControlling();
        addAsteroidToActive();

        asteroidStep();
        laserTimerStep();
        laserStep();
    }
    else {
        pauseTime -= 40;
    }
}

function laserTimerStep() {



    lasertimer += 1;
    for (let i = 0; i < temporaryLaser.length; i++) {
        if (temporaryLaser[i].timer > 0) {
            temporaryLaser[i].timer -= 30;
        }
        else {
            passiveLaser.push(temporaryLaser[i]);
            temporaryLaser.splice(i, 1);
        }
    }
}

function playAgain(){
    location.reload();
}

async function addRecords() {
    try {
        // 1. Olvassuk ki a két értéket a modalból
        const nickname = document.getElementById('nicknameInput').value.trim();
        const score = savedAsteroiddemage;

        if (!nickname || isNaN(score)) {
            alert('Adj meg egy nevet és egy pontszámot!');
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







function laserStep() {


    if (spacePressed && lasertimer >= 10) {
        addLaserToActive();
        lasertimer = 0;
    }


    for (let i = 0; i < activeLaser.length; i++) {

        if (parseInt(activeLaser[i].el.style.bottom) < (display.clientHeight)) {

            activeLaser[i].el.style.bottom = (parseInt(activeLaser[i].el.style.bottom) + 10) + "px";


        }

        else { disactivateLaserFromActives(i); }
    }
}


function disactivateLaserFromActives(laserNumber) {
    activeLaser[laserNumber].el.style.display = "none";
    activeLaser[laserNumber].timer = 50000;

    temporaryLaser.push(activeLaser[laserNumber])
    activeLaser.splice(laserNumber, 1);
}

function checkCollision() {

    spaceshipInObject = {
        el: spaceship
    }

    function check(firstObject, secondObject) {
        if (firstObject.el.getBoundingClientRect().top < secondObject.el.getBoundingClientRect().bottom &&
            firstObject.el.getBoundingClientRect().bottom > secondObject.el.getBoundingClientRect().top &&
            firstObject.el.getBoundingClientRect().left < secondObject.el.getBoundingClientRect().right &&
            firstObject.el.getBoundingClientRect().right > secondObject.el.getBoundingClientRect().left) {

            return true;

        }
        else

            return false;
    }

    for (let i = 0; i < activeAsteroids.length; i++) {

        if (check(spaceshipInObject, activeAsteroids[i])) {
            disactivateAsteroidFromActives(i);
            life -= 1;
            pauseTime = 1000;
        }

        for (let j = 0; j < activeLaser.length; j++) {
            console.log(activeLaser.length);
            if (check(activeLaser[j], activeAsteroids[i])) {
                disactivateAsteroidFromActives(i);
                disactivateLaserFromActives(j);
            }

        }
    }
}

for (let i = 0; i < activeAsteroids.length; i++) {
    let asteroidRect = activeAsteroids[i].el.getBoundingClientRect();
}


function shipControlling() {
    if (moving.left) {
        if (parseInt(spaceship.style.left) > 0) {
            spaceship.style.left = (parseInt(spaceship.style.left) - 5) + "px";
        }
    }
    if (moving.right) {

        if (parseInt(spaceship.style.left) + parseInt(spaceship.clientWidth) < (display.clientWidth)) {
            spaceship.style.left = ((parseInt(spaceship.style.left) + 5) + "px");
        }
    }
}

function disactivateAsteroidFromActives(asteroidNumber) {
    activeAsteroids[asteroidNumber].el.style.display = "none";
    activeAsteroids[asteroidNumber].timer = Math.random() * 2500;
    passiveAsteroids.push(activeAsteroids[asteroidNumber])
    activeAsteroids.splice(asteroidNumber, 1);
    asteroiddemage += 1;

}


function asteroidStep() {
    for (let i = 0; i < activeAsteroids.length; i++) {


        if (parseInt(activeAsteroids[i].el.style.top) > (display.clientHeight + display.offsetTop)) {

            disactivateAsteroidFromActives(i);
        }
        else {
            activeAsteroids[i].el.style.top = (parseInt(activeAsteroids[i].el.style.top || 0) + 5) + "px";
        }
    }
}

function addLaserToActive() {
    if (passiveLaser.length > 0) {


        passiveLaser[0].el.style.display = "block";
        passiveLaser[0].el.style.left = ((parseInt(spaceship.style.left) + spaceship.clientWidth / 2) - (passiveLaser[0].el.clientWidth / 2)) + "px";

        passiveLaser[0].el.style.bottom = (50) + "px";

        activeLaser.push(passiveLaser[0]);
        passiveLaser.splice(0, 1);
    }
}


function addAsteroidToActive() {
    if (passiveAsteroids.length > 0) {
        for (let i = 0; i < passiveAsteroids.length; i++) {
            if (passiveAsteroids[i].timer > 0) {
                passiveAsteroids[i].timer -= 30;
            }
            else {
                passiveAsteroids[i].el.style.left = Math.random() * (display.clientWidth) + "px";

                activeAsteroids.push(passiveAsteroids[i]);
                passiveAsteroids[i].el.style.display = "block";
                passiveAsteroids[i].el.style.top = "-" + (asteroid.offsetHeight + "px");
                passiveAsteroids.splice(i, 1);
            }
        }
    }
}

function spawnLaser(laserNumber) {

    for (let i = 0; i < laserNumber; i++) {

        const laserFromDiv = document.getElementById("laser").cloneNode(true);

        laserFromDiv.removeAttribute("id");    // ID-t levesszük, mert több is lesz
        laserFromDiv.classList.add("laser"); // osztályt adunk neki
        //laserFromDiv.style.top = display.clientTop + "px"; // kezdeti pozíció
        laserFromDiv.style.position = "absolute";

        const laser = {
            el: laserFromDiv,
            timer: 0

        };

        display.appendChild(laser.el);


        passiveLaser.push(laser);


    }
}



function spawnAsteroid(asteroidNumber) {

    for (let i = 0; i < asteroidNumber; i++) {

        const asteroidFromDiv = document.getElementById("asteroid").cloneNode(true);

        asteroidFromDiv.removeAttribute("id");    // ID-t levesszük, mert több is lesz
        asteroidFromDiv.classList.add("asteroid"); // osztályt adunk neki
        asteroidFromDiv.style.top = display.clientTop + "px"; // kezdeti pozíció
        asteroidFromDiv.style.position = "absolute";

        const asteroid = {
            el: asteroidFromDiv,
            timer: 0

        };

        // játéktérhez hozzáadjuk
        document.getElementById("display").appendChild(asteroid.el);


        passiveAsteroids.push(asteroid);
    }
}

function initControlling() {



    document.addEventListener("keydown", (event) => {
        switch (event.code) {
            case "Space":
                if (!spacePressed) {
                    event.preventDefault();
                    spacePressed = true;


                }
                break;
            case "ArrowLeft":
                moving.left = true;
                break;
            case "ArrowRight":
                moving.right = true;
                break;
        }
    });

    document.addEventListener("keyup", (event) => {
        switch (event.code) {
            case "Space":
                spacePressed = false;
                break;
            case "ArrowLeft":
                moving.left = false;
                break;
            case "ArrowRight":
                moving.right = false;
                break;
        }
    })

}


startGame();

