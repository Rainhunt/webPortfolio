import { drawWedge, SleepManager } from "./helpers.js";

export class Board {
    element;
    ctx;
    isPlaying = false;
    isFree = true;
    speed;
    gap = 20;
    centerX;
    centerY;
    backgroundColor = "white";
    blueButton;
    yellowButton;
    greenButton;
    redButton;
    circleGap;
    lineGaps;
    centerCircle;
    centerText = "Let's"
    centerText2 = "Start!";

    constructor(board, speed = 1000) {
        this.element = board;
        this.ctx = board.getContext("2d");
        this.speed = speed
        const width = board.width;
        const height = board.height;
        this.centerX = width / 2;
        this.centerY = height / 2;
        const radius = width / 2;
        //buttons
        this.blueButton = drawWedge(this.centerX, this.centerY, 0, 90, radius);
        this.yellowButton = drawWedge(this.centerX, this.centerY, 90, 180, radius);
        this.greenButton = drawWedge(this.centerX, this.centerY, 180, 270, radius);
        this.redButton = drawWedge(this.centerX, this.centerY, 270, 0, radius);

        //gaps
        this.circleGap = drawWedge(this.centerX, this.centerY, 0, 360, radius / 2);
        this.lineGaps = new Path2D();
        this.lineGaps.rect(0, this.centerY - this.gap / 2, width, this.gap);
        this.lineGaps.rect(this.centerX - this.gap / 2, 0, this.gap, height);

        //center
        this.centerCircle = drawWedge(this.centerX, this.centerY, 0, 360, (radius / 2) - this.gap);
        this.render();
        this.drawText();
    }

    drawButtons(color) {
        const colors = { blue: "darkblue", yellow: "#8B8000", green: "darkgreen", red: "darkred", ...color }
        this.ctx.fillStyle = colors.blue;
        this.ctx.fill(this.blueButton);
        this.ctx.fillStyle = colors.yellow;
        this.ctx.fill(this.yellowButton);
        this.ctx.fillStyle = colors.green;
        this.ctx.fill(this.greenButton);
        this.ctx.fillStyle = colors.red;
        this.ctx.fill(this.redButton);
    }

    drawGaps() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fill(this.circleGap);
        this.ctx.fill(this.lineGaps);
    }

    drawCenter() {
        this.ctx.fillStyle = "black";
        this.ctx.fill(this.centerCircle);
    }

    drawText() {
        this.ctx.font = "bold 40px Tahoma";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillText(this.centerText, this.centerX, this.centerY - 20);
        this.ctx.fillText(this.centerText2, this.centerX, this.centerY + 20);
    }

    render() {
        this.drawButtons();
        this.drawGaps();
        this.drawCenter();
    }

    async playColor(color) {
        const highlightColors = { blue: "blue", yellow: "yellow", green: "#AAFF00", red: "red" }
        this.drawButtons({ [color]: highlightColors[color] });
        this.drawGaps();
        this.drawCenter();
        await SleepManager.sleep(this.speed);
        this.render();
    }

    async playColorPattern(pattern) {
        this.isFree = false;
        for await (const color of pattern) {
            await this.playColor(color);
            await SleepManager.sleep(150);
        }
        this.isFree = true;
    }

    getClicked(pointX, pointY) {
        if (this.ctx.isPointInPath(this.centerCircle, pointX, pointY)) {
            return "center";
        } else if (this.ctx.isPointInPath(this.circleGap, pointX, pointY) || this.ctx.isPointInPath(this.lineGaps, pointX, pointY)) {
            return "gap";
        } else if (this.ctx.isPointInPath(this.blueButton, pointX, pointY)) {
            return "blue";
        } else if (this.ctx.isPointInPath(this.yellowButton, pointX, pointY)) {
            return "yellow";
        } else if (this.ctx.isPointInPath(this.greenButton, pointX, pointY)) {
            return "green";
        } else if (this.ctx.isPointInPath(this.redButton, pointX, pointY)) {
            return "red";
        }
    }
}