// gameLoop.js
import lasers from "./lasers.js";
import asteroids from "./asteroids.js";
import spaceship from "./spaceship.js";
import controlling from "./controlling.js";
import status from "./status.js";

export default class GameLoop {
    constructor() {
        this.GameStates = ["INIT", "STARTED", "GAMEOVER"];
        this.gameState = { state: "INIT" };

        this.display = document.getElementById("display");
        this.gameOver = document.getElementById("gameOver");

        this.spaceship = new spaceship(this.display);
        this.controlling = new controlling(this.spaceship);

        this.asteroids = new asteroids(this.display, this.gameState);
        this.lasers = new lasers(this.display, this.spaceship);

        this.status = new status(this.spaceship, this.asteroids, this.lasers);

        this.gameOverEffectTime = 8000;
        this.pauseTime = 0;
    }



    start() {
        this.init();
        this.gameState.state = "STARTED";

        this.loop();
    }

    loop() {
        requestAnimationFrame(() => this.loop()); // loop folyamatos meghívása


        if (this.pauseTime <= 0) {


            this.step();



            if (this.gameState.state === "STARTED") {

                this.status.showStatus();

                this.checkCollision();

            }
            this.checkGameOver();
        }

        else {
            this.pauseTime -= 40;
        }

    }

    init() {


        this.controlling.initControlling();
        this.asteroids.madeAsteroids(5);
        this.lasers.madeLasers(25);
    }

    step() {

        this.spaceship.step();
        this.asteroids.asteroidsStep();
        this.lasers.laserStep();

    }

    checkCollision() {

        const tester = (firstObject, secondObject) => {
            const f = firstObject.el.getBoundingClientRect();
            const s = secondObject.el.getBoundingClientRect();
            return f.top < s.bottom &&
                f.bottom > s.top &&
                f.left < s.right &&
                f.right > s.left;
        };

        // spaceship vs asteroids
        for (let i = 0; i < this.asteroids.activeAsteroids.length; i++) {
            const asteroid = this.asteroids.activeAsteroids[i];
            if (tester(this.spaceship, asteroid)) {

                asteroid.status = false;

                this.spaceship.life -= 1;
                this.pauseTime = 1000;

            }

            // lasers vs asteroids
            for (let j = 0; j < this.lasers.activeLaser.length; j++) {
                const laser = this.lasers.activeLaser[j];
                if (tester(laser, asteroid)) {
                    asteroid.status = false;
                    laser.status = false;
                }
            }
        }
    }

    checkGameOver() {
        if (this.spaceship.life <= 0) {
            if (this.gameState !== "GAMEOVER") {
                this.status.showStatus();
                this.gameState = "GAMEOVER";
                this.gameOver.style.display = "block";
            }


            this.gameOverEffectTime -= 30;

            if (this.gameOverEffectTime <= 0) {
                this.controlling.remove();
                document.getElementById("nicknameModal").style.display = "flex";
                this.gameOver.style.display = "none";
            }
        }
    }
}
