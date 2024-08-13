import { IElement, IProperty } from "../../types.js";
import { BgcControl } from "../properties/ColorControls.js";
import { HeightControl, MarginControl, PaddingControl, WidthControl } from "../properties/NumberControls.js";

export class DivElement implements IElement {
    element: HTMLDivElement = document.createElement("div");

    constructor(element = document.createElement("div")) {
        this.element = element;
    }

    getPropertyControls(): IProperty[] {
        return [new WidthControl(), new HeightControl(), new MarginControl(), new PaddingControl(), new BgcControl()];
    }

    setProperties(properties: {}): void {
        Object.assign(this.element.style, properties);
    }
}