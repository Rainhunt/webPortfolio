import { IElement, IProperty } from "../../types.js";
import { BgcControl, ColorControl } from "../properties/ColorControls.js";
import { FontSizeControl, HeightControl, WidthControl } from "../properties/NumberControls.js";
import { InnerTextControl } from "../properties/TextControls.js";

export class TextElement implements IElement {
    element: HTMLParagraphElement = document.createElement("p");

    constructor() {
        this.element.innerText = "Text Here";
    }

    getPropertyControls(): IProperty[] {
        return [new ColorControl, new BgcControl(), new InnerTextControl(), new FontSizeControl()];
    }

    setProperties(properties: {}): void {
        switch (Object.keys(properties)[0]) {
            case "innerText":
                Object.assign(this.element, properties);
            default:
                Object.assign(this.element.style, properties);
        }
    }
}