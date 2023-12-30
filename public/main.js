let fireworks = [];
let clicked = false;
let countdownSize;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    rectMode(CENTER);

    randomFireworksButton = createButton('Fire!');

    randomFireworksButton.style('padding', '10px');
    randomFireworksButton.style('font-size', '16px');
    randomFireworksButton.style('cursor', 'pointer');
    randomFireworksButton.style('color', '#FFF');
    randomFireworksButton.style('background-color', '#000');
    randomFireworksButton.style('border-color', '#ccc');

    randomFireworksButton.position(0, 0);

    randomFireworksButton.mousePressed(fireRandomFireworks);
    randomFireworksButton.mouseOver(onButtonHover);
    randomFireworksButton.mouseOut(onButtonHoverOut);
    adjustCountdownSize();
}

function getCountdownTime() {
    let now = new Date();
    let hours = 23 - now.getHours();
    let minutes = 60 - now.getMinutes();
    let seconds = 60 - now.getSeconds();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
}

function draw() {
    background(0, 0, 0, 25);

    textSize(countdownSize);

    fill(255, 255, 255, 10);
    noStroke();
    textAlign(CENTER, CENTER);
    text(getCountdownTime(), window.innerWidth / 2, window.innerHeight / 2);

    textSize(10);
    noStroke();

    for (let f of fireworks) f.step();
}

function mouseReleased() {
    clicked = true;
    let target = {
        x: mouseX,
        y: mouseY
    };
    fireworks.push(new Firework(target));
}

function fireRandomFireworks() {
    for (let i = 0; i < 10; i++) {
        let target = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        };
        fireworks.push(new Firework(target));
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    adjustCountdownSize();
}

function adjustCountdownSize() {
    countdownSize = Math.min(window.innerWidth / 6, 140);
}

function onButtonHover() {
    randomFireworksButton.style('background-color', '#333');
    randomFireworksButton.style('color', '#fff');
}

function onButtonHoverOut() {
    randomFireworksButton.style('background-color', '#000'); 
    randomFireworksButton.style('color', '#fff'); 
}
