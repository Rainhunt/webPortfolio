export class ForecastWidget {
    #htmlElement = document.createElement("div");
    #icon = document.createElement("img");
    #days = [];
    #icons = [];
    #temps = [];

    constructor() {
        this.#htmlElement.className = "forecast-widget";
        this.#icon.className = "main-icon";
        this.#htmlElement.appendChild(this.#icon);
        const forecastWrapper = document.createElement("div");
        forecastWrapper.className = "forecast-wrapper";
        for (let i = 0; i < 5; i++) {
            const dayColumn = document.createElement("div");
            dayColumn.className = "day-column";
            const day = document.createElement("h3");
            const icon = document.createElement("img");
            const temp = document.createElement("p");
            dayColumn.appendChild(day);
            dayColumn.appendChild(icon);
            dayColumn.appendChild(temp);
            this.#days.push(day);
            this.#icons.push(icon);
            this.#temps.push(temp);
            forecastWrapper.appendChild(dayColumn);
        }
        this.#htmlElement.appendChild(forecastWrapper);
    }

    async update(data) {
        try {
            const iconResponse = await fetch(`https://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png`);
            this.#icon.src = iconResponse.url;
            this.#icon.alt = data[0].weather[0].description;
        } catch (error) {
            console.log("Failed to load icon");
            console.log(error);
        }

        this.#days.forEach((day, index) => {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const forecastDay = new Date(data[1][index].dt * 1000).getDay(); //Date() takes epoch time in milliseconds
            day.textContent = days[forecastDay];
        });

        for await (const [index, icon] of this.#icons.entries()) {
            try {
                const iconResponse = await fetch(`https://openweathermap.org/img/wn/${data[1][index].weather[0].icon}@2x.png`);
                icon.src = iconResponse.url;
                icon.alt = data[1][index].weather[0].description;
            } catch (error) {
                console.log("Failed to load icon");
                console.log(error);
            }
        }

        this.#temps.forEach((day, index) => {
            day.textContent = Math.round(data[1][index].main.temp) + "\xB0";
        });
    }

    get htmlElement() {
        return this.#htmlElement;
    }
}