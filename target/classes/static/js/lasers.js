export default class lasers {

    constructor(display, spaceship) {

        this.spaceship = spaceship;
        this.display = display;
        this.passiveLaser = [];
        this.temporaryLaser = [];
        this.activeLaser = [];
        this.laserShootTimer = 10;
        this.laserOfftimer = 0;
    }



    madeLasers(laserNumber) {
        for (let i = 0; i < laserNumber; i++) {
            const laserFromDiv = document.getElementById("laser").cloneNode(true);

            laserFromDiv.removeAttribute("id");    // ID-t levesszük, mert több is lesz
            laserFromDiv.classList.add("laser");   // osztályt adunk neki
            laserFromDiv.style.position = "absolute";

            const laser = {
                el: laserFromDiv,
                
                timer: 50000,
                status: true,
                offTimer: 0
            };

            display.appendChild(laser.el);
            this.passiveLaser.push(laser);
        }
    }

    laserLoadTimeStep() {
        
        this.laserShootTimer += 1;

        for (let i = 0; i < this.temporaryLaser.length; i++) {
            if (this.temporaryLaser[i].offTimer > 0) {
               
                this.temporaryLaser[i].offTimer -= 30;
            } else {
                this.passiveLaser.push(this.temporaryLaser[i]);
                this.temporaryLaser.splice(i, 1);
                i--; // fontos, mert splice után eltolódik a tömb
            }
        }
    }

    laserStep() {
        this.laserLoadTimeStep();
        this.shootLaser();

        for (let i = 0; i < this.activeLaser.length; i++) {
            let laser = this.activeLaser[i];
            let laserPosition = parseInt(laser.el.style.bottom);

            if (laser.status === false) {
                this.disactivateLaser(i);
                continue;
            }

            if (laserPosition < display.clientHeight) {
                laser.el.style.bottom = (laserPosition + 10) + "px";
            } else {
                this.disactivateLaser(i);
            }
        }
    }

    shootLaser() {
      
     
        if (this.spaceship.shotActive && this.laserShootTimer >= 10) {
            this.laserShootTimer = 0;
           

            if (this.passiveLaser.length > 0) {
                let oldestlaser = this.passiveLaser[0];
                let laserPossition =
                    (parseInt(spaceship.style.left) + spaceship.clientWidth / 2) -
                    (oldestlaser.el.clientWidth / 2);

                this.passiveLaser.splice(0, 1);
                oldestlaser.el.style.display = "block";
                oldestlaser.el.style.left = laserPossition + "px";
                oldestlaser.el.style.bottom = "50px";
                oldestlaser.status = true;

                this.activeLaser.push(oldestlaser);
            }
        }
    }

    disactivateLaser(laserNumber) {
        let laser = this.activeLaser[laserNumber];
        laser.el.style.display = "none";
        laser.offTimer = 50000;

        this.temporaryLaser.push(laser);
        this.activeLaser.splice(laserNumber, 1);
    }
};
