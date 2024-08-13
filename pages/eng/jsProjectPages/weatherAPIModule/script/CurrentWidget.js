export class CurrentWidget {
    #htmlElement = document.createElement("div");
    #icon = document.createElement("img");
    #timeElement = document.createElement("div");
    #dateElement = document.createElement("div");

    constructor() {
        this.#htmlElement.className = "current-widget";
        const textWrapper = document.createElement("div");
        textWrapper.className = "text-wrapper";
        const timeWrappper = document.createElement("div");
        timeWrappper.className = "time-wrapper";
        this.#timeElement.className = "time";
        this.#dateElement.className = "date";
        textWrapper.appendChild(timeWrappper);
        timeWrappper.appendChild(this.#timeElement);
        textWrapper.appendChild(this.#dateElement);
        this.#htmlElement.appendChild(textWrapper);
        this.#htmlElement.appendChild(this.#icon);
    }

    async update(data) {
        const date = new Date();
        const iconResponse = await fetch(`https://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png`);
        this.#icon.src = iconResponse.url;
        this.#icon.alt = data[0].weather[0].description;
        let timezone = data[0].timezone;
        const positive = timezone >= 0 ? true : false;
        timezone = Math.abs(timezone);
        let timezoneHours = timezone / 3600; //seconds in an hour
        if (timezoneHours < 10) timezoneHours = "0" + timezoneHours;
        let timezoneMinutes = timezone % 3600 / 60; //seconds in a minute of the leftover time
        if (timezoneMinutes < 10) timezoneMinutes = "0" + timezoneMinutes;
        const timezoneAsHHMM = (positive ? "+" : "-") + String(timezoneHours) + String(timezoneMinutes);
        const options = { timeZone: timezoneAsHHMM };
        this.#timeElement.textContent = date.toLocaleTimeString([], { timeZone: timezoneAsHHMM, hour: "2-digit", minute: "2-digit", hour12: false });
        this.#dateElement.textContent = date.toLocaleDateString([], { timeZone: timezoneAsHHMM, weekday: "long", year: "2-digit", month: "2-digit", day: "2-digit" });
    }

    get htmlElement() {
        return this.#htmlElement;
    }
}