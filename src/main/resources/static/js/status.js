export default class status {

    constructor(spaceship, asteroids, lasers) {

        this.spaceship = spaceship;
        this.asteroids = asteroids;
        this.lasers = lasers;

        this.life = document.getElementById("life");


        this.asteroiddemage = document.getElementById("asteroiddemage");

        this.laserStatus = document.getElementById("laserStatus");
    }

    


showStatus() {
    //alert(this.asteroids.destroyedAsteroids);
    this.life.innerText = "Life: " + this.spaceship.life;
    this.asteroiddemage.innerText = "Asteroid left: " + this.asteroids.destroyedAsteroids;
    this.laserStatus.innerText = "Lasers: " + this.lasers.passiveLaser.length;
}

getAsteroidStatus() {
    return this.asteroids.destroyedAsteroids;
}
}