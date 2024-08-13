export function degsToRad(deg) {
    return deg * (Math.PI / 180);
}

export function drawWedge(centerX, centerY, startAngle, endAngle, radius) {
    const wedge = new Path2D();
    wedge.moveTo(centerX, centerY);
    wedge.arc(centerX, centerY, radius, degsToRad(startAngle), degsToRad(endAngle));
    return wedge;
}

export class SleepManager {
    static timeout = null;

    static sleep(ms) {
        return new Promise(resolve => {
            if (SleepManager.timeout) {
                clearTimeout(SleepManager.timeout);
            }

            SleepManager.timeout = setTimeout(() => {
                SleepManager.timeout = null;
                resolve();
            }, ms);
        });
    }
}

export function getRandomColor() {
    const colors = ["blue", "yellow", "green", "red"];
    return colors[Math.floor(Math.random() * 4)]; //random number between 0 and 3 inclusive
}