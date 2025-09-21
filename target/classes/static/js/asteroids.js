export default class asteroids {
    constructor(display, gameState) {
        this.display = display;
        this.gameState = gameState;

        this.activeAsteroids = [];
        this.passiveAsteroids = [];
        this.destroyedAsteroids = 0;

    }

    madeAsteroids(asteroidNumber) {
        for (let spawnedAsteroid = 0; spawnedAsteroid < asteroidNumber; spawnedAsteroid++) {
            const asteroidFromDiv = document.getElementById("asteroid").cloneNode(true);

            asteroidFromDiv.removeAttribute("id");
            asteroidFromDiv.classList.add("asteroid");
            asteroidFromDiv.style.top = this.display.clientTop + "px";
            asteroidFromDiv.style.position = "absolute";

            const asteroid = {
                el: asteroidFromDiv,
                offTimer: 0,
                status: true
            };

            this.display.appendChild(asteroid.el);
            this.passiveAsteroids.push(asteroid);
        }
    }

    asteroidsStep() {



        this.allAsteroidActivate();

        const displayBottom = this.display.clientHeight + this.display.offsetTop;

        
        for (let i = 0; i < this.activeAsteroids.length; i++) {
            const asteroid = this.activeAsteroids[i];
            const asteroidPosition = parseInt(asteroid.el.style.top);
            
            if (asteroid.status === false) {
                
                this.disactivateAsteroid(i);
                continue;
            }

            if (asteroidPosition > displayBottom) {
                this.disactivateAsteroid(i);
            } else {
                asteroid.el.style.top = (asteroidPosition + 5) + "px";
            }
        }
    }

    allAsteroidActivate() {
        for (let i = 0; i < this.passiveAsteroids.length; i++) {
            const asteroid = this.passiveAsteroids[i];

            if (asteroid.offTimer > 0) {
                asteroid.offTimer -= 30;
            } else {
                asteroid.el.style.left = Math.random() * this.display.clientWidth + "px";
                asteroid.el.style.display = "block";
                asteroid.el.style.top = "-" + asteroid.el.offsetHeight + "px";
                asteroid.status = true;

                this.activeAsteroids.push(asteroid);
                this.passiveAsteroids.splice(i, 1);
                i--;
            }
        }
    }

    disactivateAsteroid(activeAsteroidNumber) {

        const asteroid = this.activeAsteroids[activeAsteroidNumber];
        this.activeAsteroids.splice(activeAsteroidNumber, 1);

        asteroid.el.style.display = "none";
        asteroid.offTimer = Math.random() * 2500;
        this.passiveAsteroids.push(asteroid);


        if (this.gameState.state === "STARTED") {

            this.destroyedAsteroids += 1;
        }
    }
}
