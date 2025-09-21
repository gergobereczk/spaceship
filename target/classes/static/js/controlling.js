export default class Controlling {
    constructor(spaceship) {
        this.spaceship = spaceship;

        // bindeljük a metódusokat, hogy this a példányra mutasson
        this.keydownListener = this.keydownListener.bind(this);
        this.keyupListener = this.keyupListener.bind(this);
    }

    initControlling() {
        document.addEventListener("keydown", this.keydownListener);
        document.addEventListener("keyup", this.keyupListener);
    }

    remove() {
        document.removeEventListener("keydown", this.keydownListener);
        document.removeEventListener("keyup", this.keyupListener);
    }

    keydownListener(event) {
        switch (event.code) {
            case "Space":
                if (!this.spaceship.shotActive) {
                    event.preventDefault();
                    this.spaceship.shotActive = true;
                }
                break;
            case "ArrowLeft":
                this.spaceship.moving.left = true;
                break;
            case "ArrowRight":
                this.spaceship.moving.right = true;
                break;
        }
    }

    keyupListener(event) {
        switch (event.code) {
            case "Space":
                this.spaceship.shotActive = false;
                break;
            case "ArrowLeft":
                this.spaceship.moving.left = false;
                break;
            case "ArrowRight":
                this.spaceship.moving.right = false;
                break;
        }
    }
}
