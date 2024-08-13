import { WidgetManager } from "./WidgetManager.js";
import { CurrentWidget } from "./CurrentWidget.js";
import { ForecastWidget } from "./ForecastWidget.js";
import { WindWidget } from "./WindWidget.js";
import { HumidityWidget } from "./HumidityWidget.js";

const apiKey = "3526614de2e6e7f34e76b8c18709d7bd"
const cityInput = document.querySelector("#cityInput");
const widgetManager = new WidgetManager(apiKey, cityInput);

const currentWidget = new CurrentWidget();
const forecastWidget = new ForecastWidget();
const windWidget = new WindWidget();
const humidityWidget = new HumidityWidget();

widgetManager.addWidget(currentWidget);
widgetManager.addWidget(forecastWidget);
widgetManager.addWidget(windWidget);
widgetManager.addWidget(humidityWidget);

const cardElements = document.querySelectorAll(".card .widget-wrapper");
cardElements[0].appendChild(currentWidget.htmlElement);
cardElements[1].appendChild(forecastWidget.htmlElement);
cardElements[2].appendChild(windWidget.htmlElement);
cardElements[3].appendChild(humidityWidget.htmlElement);

setUpdate(5000);

function setUpdate(time) {
    setTimeout(() => {
        widgetManager.updateWeatherData();
        setUpdate(time);
    }, time);
}
