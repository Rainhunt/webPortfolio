import { HeightControl, MarginControl, PaddingControl, WidthControl } from "../properties/NumberControls.js";
import { UrlControl } from "../properties/TextControls.js";
export class ImgElement {
    element = document.createElement("img");
    constructor() {
        this.element.src = "https://placehold.co/100x100";
    }
    getPropertyControls() {
        return [new WidthControl(), new HeightControl(), new MarginControl(), new PaddingControl(), new UrlControl()];
    }
    setProperties(properties) {
        switch (Object.keys(properties)[0]) {
            case "src":
                Object.assign(this.element, properties);
            default:
                Object.assign(this.element.style, properties);
        }
    }
}
