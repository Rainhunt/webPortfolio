export class HumidityWidget {
    #htmlElement = document.createElement("div");
    #canvasElement = document.createElement("canvas");

    constructor() {
        this.#htmlElement.className = "humidity-widget";
        this.#htmlElement.appendChild(this.#canvasElement);
        this.#canvasElement.width = 300;
        this.#canvasElement.height = 300;
    }

    update(data) {
        this.drawHumidity(data[0].main.humidity);
    }

    drawHumidity(percent) {
        const ctx = this.#canvasElement.getContext("2d");
        const width = this.#canvasElement.width;
        const height = this.#canvasElement.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = (width / 2) - 30;

        //Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw the outer border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 20, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#8C84C5";
        ctx.stroke();
        ctx.closePath();

        // Draw the percentile border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, Math.PI * percent / 50 - Math.PI / 2);
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#05DFD7";
        ctx.stroke();
        ctx.closePath();

        //Draw the text in the center
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 64px Arial";
        ctx.fillText(percent, centerX, centerY);
    }

    get htmlElement() {
        return this.#htmlElement;
    }
}