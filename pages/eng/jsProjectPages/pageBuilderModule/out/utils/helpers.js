import { DivElement } from "../classes/elements/DivElement.js";
import { ImgElement } from "../classes/elements/ImgElement.js";
import { TextElement } from "../classes/elements/TextElement.js";
export function createIElement(elementTag) {
    switch (elementTag) {
        case "text":
            return new TextElement();
        case "img":
            return new ImgElement();
        default:
            return new DivElement();
    }
}
export function addUnits(...units) {
    const element = document.createElement("select");
    for (const unit of units) {
        const option = document.createElement("option");
        option.value = unit;
        option.innerText = unit;
        element.appendChild(option);
    }
    return (element);
}
export function camelToKebab(camelStr) {
    //replace a lower case before an upper case to the same with a dash between them, then convert the string to lowercase
    return camelStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
export function setInitialUnits(unitSelector, value) {
    const unit = value.replace(/^\d+/, '');
    unitSelector.value = unit || "px";
}
