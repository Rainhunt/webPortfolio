import { IElement, IProperty } from "../../types.js";
import { BgcControl } from "../properties/ColorControls.js";
import { HeightControl, MarginControl, PaddingControl, WidthControl } from "../properties/NumberControls.js";
import { UrlControl } from "../properties/TextControls.js";

export class ImgElement implements IElement {
    element: HTMLImageElement = document.createElement("img");

    constructor() {
        this.element.src = "https://placehold.co/100x100";
    }

    getPropertyControls(): IProperty[] {
        return [new WidthControl(), new HeightControl(), new MarginControl(), new PaddingControl(), new UrlControl()];
    }

    setProperties(properties: {}): void {
        switch (Object.keys(properties)[0]) {
            case "src":
                Object.assign(this.element, properties);
            default:
                Object.assign(this.element.style, properties);
        }
    }
}