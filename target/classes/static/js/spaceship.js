export default class Spaceship {

    constructor(display) {
        this.display = display;
        this.el = document.getElementById("spaceship");
        this.life = 5;
        this.shotActive = false;

        // Mozgás állapota
        this.moving = { left: false, right: false };

        // Kezdeti pozíció középre
        this.el.style.position = "absolute";
        this.el.style.left = (display.clientWidth / 2 - this.el.clientWidth / 2) + "px";
        
    }

    step() {
        this.shipControlling();
    }

    shipControlling() {
        // Balra
        if (this.moving.left) {
            if (parseInt(this.el.style.left) > 0) {
                this.el.style.left = (parseInt(this.el.style.left) - 5) + "px";
            }
        }

        // Jobbra
        if (this.moving.right) {
            if (parseInt(this.el.style.left) + this.el.clientWidth < this.display.clientWidth) {
                this.el.style.left = (parseInt(this.el.style.left) + 5) + "px";
            }
        }
    }
}
