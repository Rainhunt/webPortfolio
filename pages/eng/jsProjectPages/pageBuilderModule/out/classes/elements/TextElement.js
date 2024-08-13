import { BgcControl, ColorControl } from "../properties/ColorControls.js";
import { FontSizeControl } from "../properties/NumberControls.js";
import { InnerTextControl } from "../properties/TextControls.js";
export class TextElement {
    element = document.createElement("p");
    constructor() {
        this.element.innerText = "Text Here";
    }
    getPropertyControls() {
        return [new ColorControl, new BgcControl(), new InnerTextControl(), new FontSizeControl()];
    }
    setProperties(properties) {
        switch (Object.keys(properties)[0]) {
            case "innerText":
                Object.assign(this.element, properties);
            default:
                Object.assign(this.element.style, properties);
        }
    }
}
