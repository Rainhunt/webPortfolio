import { BgcControl } from "../properties/ColorControls.js";
import { HeightControl, MarginControl, PaddingControl, WidthControl } from "../properties/NumberControls.js";
export class DivElement {
    element = document.createElement("div");
    constructor(element = document.createElement("div")) {
        this.element = element;
    }
    getPropertyControls() {
        return [new WidthControl(), new HeightControl(), new MarginControl(), new PaddingControl(), new BgcControl()];
    }
    setProperties(properties) {
        Object.assign(this.element.style, properties);
    }
}
