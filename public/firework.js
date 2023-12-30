class Firework {
    constructor(target) {
        this.target = target;
        this.startingX = 100 + (Math.random() * (window.innerWidth - 100));
        this.vel = this.velVector();
        this.pos = {
            x: this.startingX,
            y: window.innerHeight
        };
        let colours = ["#10ED6B", "#AA0000", "#FF5555", "#FFFF00", "#FFFF55", "#AA00AA", "#FF00FF", "#AA00FF", "#FFFFFF", "#000000"];
        this.colour = colours[Math.floor(Math.random() * colours.length)];
        this.explosionParticles = [];
        this.exploded = false;
    }

    velVector() {
        let vel = 10;
        let xDir = this.target.x - this.startingX;
        let yDir = this.target.y - window.innerHeight;

        let scale = Math.sqrt(xDir ** 2 + yDir ** 2);
        let xVel = (xDir / scale) * vel;
        let yVel = (yDir / scale) * vel;

        return {
            x: xVel,
            y: yVel
        };
    }

    step() {
        if (this.pos.y > this.target.y) {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            strokeWeight(6);
            stroke(this.colour);
            point(this.pos.x, this.pos.y);
        } else {
            if (this.explosionParticles.length === 0 && !this.exploded) this.explode();

            let idx = 0;
            for (let particle of this.explosionParticles) {
                strokeWeight(2);
                stroke(this.colour);
                point(particle.x, particle.y);
                particle.x += particle.velX;
                particle.y += particle.velY;
                particle.velY += 0.05;

                if (particle.y > window.innerHeight || particle.x < 0 || particle.x > window.innerWidth) {
                    this.explosionParticles.splice(idx, 1);
                }
                idx++;
            }
        }
    }

    explode() {
        for (let i = 0; i < 200; i++) {
            this.explosionParticles.push({
                x: this.pos.x,
                y: this.pos.y,
                velX: random(-5, 5),
                velY: random(-5, 5),
            });
        }
        this.exploded = true;
    }
}