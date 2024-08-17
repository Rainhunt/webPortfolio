export class WidgetManager {
    #apiKey
    #cityInput;
    #city = "tel aviv" //navigator.geolocation.getCurrentPosition
    #weatherData = Array(2); //current data, forecast data
    #widgets = [];

    constructor(apiKey, cityInput) {
        this.#apiKey = apiKey;
        this.#cityInput = cityInput;
        this.#cityInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.#city = this.#cityInput.value;
                this.updateWeatherData();
            }
        });
    }

    async updateWeatherData() {
        try {
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.#city}&units=metric&appid=${this.#apiKey}`);
            if (weatherResponse.status === 200) {
                const weather = await weatherResponse.json();
                this.#weatherData[0] = weather;
            }
        } catch (error) {
            console.log("Weather Data not found");
            console.log(error);
        }
        try {
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.#city}&units=metric&appid=${this.#apiKey}`);
            if (forecastResponse.status === 200) {
                const forecast = await forecastResponse.json();
                this.#weatherData[1] = forecast.list.filter((val, index) => index % 8 === 0);
            }
        } catch (error) {
            console.log("Forecast Data not found");
            console.log(error);
        }
        this.updateWidgets();
    }

    async addWidget(widget) {
        await this.updateWeatherData();
        widget.update(this.#weatherData);
        this.#widgets.push(widget);
    }

    updateWidgets() {
        console.log("Updating widgets");
        for (const widget of this.#widgets) {
            widget.update(this.#weatherData);
        }
    }
}