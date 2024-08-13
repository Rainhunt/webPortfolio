export class WindWidget {
    #htmlElement = document.createElement("div");
    #canvasElement = document.createElement("canvas");

    constructor() {
        this.#htmlElement.className = "wind-widget";
        this.#htmlElement.appendChild(this.#canvasElement);
        this.#canvasElement.width = 300;
        this.#canvasElement.height = 300;
    }

    update(data) {
        this.drawCompass(data[0].wind.speed, data[0].wind.deg - 90); //Meteoroligcal degrees start north
    }

    drawCompass(speed, degrees) {
        const ctx = this.#canvasElement.getContext("2d");
        const width = this.#canvasElement.width;
        const height = this.#canvasElement.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = (width / 2) - 20;
        const degreesToRadians = (deg) => deg * (Math.PI / 180);

        //clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw the dashed border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
        ctx.lineWidth = 5;
        ctx.setLineDash([5, 2]);
        ctx.strokeStyle = "#508BD0";
        ctx.stroke();
        ctx.setLineDash([]);  // Reset to solid lines
        ctx.closePath();

        // Draw the solid border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#7DE2F8";
        ctx.stroke();
        ctx.closePath();

        // Define the wedge
        const halfBaseWidth = degreesToRadians(6);
        const triangleHeight = radius / 3;
        const angle = degreesToRadians(degrees);

        // Calculate vertices
        const apexX = centerX + radius * Math.cos(angle);
        const apexY = centerY + radius * Math.sin(angle);
        const leftBaseX = centerX + (radius - triangleHeight) * Math.cos(angle - halfBaseWidth);
        const leftBaseY = centerY + (radius - triangleHeight) * Math.sin(angle - halfBaseWidth);
        const rightBaseX = centerX + (radius - triangleHeight) * Math.cos(angle + halfBaseWidth);
        const rightBaseY = centerY + (radius - triangleHeight) * Math.sin(angle + halfBaseWidth);

        //draw the wedge
        ctx.beginPath();
        ctx.moveTo(leftBaseX, leftBaseY);
        ctx.lineTo(apexX, apexY);
        ctx.lineTo(rightBaseX, rightBaseY);
        ctx.closePath();
        ctx.fillStyle = "#F9C007";
        ctx.fill();

        // Draw the cardinal directions
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";

        ctx.fillText("N", centerX, centerY - radius + 20);
        ctx.fillText("E", centerX + radius - 20, centerY);
        ctx.fillText("S", centerX, height / 2 + radius - 20);
        ctx.fillText("W", centerX - radius + 20, height / 2);

        // Draw the wind speed in the center
        ctx.font = "bold 64px Arial";
        ctx.fillText(speed, centerX, centerY - 15);

        //draw the units
        ctx.font = "bold 32px Arial";
        ctx.fillStyle = "#7DE2F8";
        ctx.fillText("KPH", centerX, centerY + 25);
    }

    get htmlElement() {
        return this.#htmlElement;
    }
}
