import { IProperty } from "../../types.js";
import { addUnits, setInitialUnits } from "../../utils/helpers.js";

class NumberControl implements IProperty {
    element: HTMLDivElement = document.createElement("div");
    input: HTMLInputElement = document.createElement("input");
    style = {};
    static id = 0;

    constructor(labelName: string) {
        this.input.type = "number";
        this.input.className = "number-input";
        this.input.id = `${labelName}-${NumberControl.id++}`;
        const label = document.createElement("label");
        label.htmlFor = this.input.id;
        label.textContent = labelName;
        this.element.className = "property-box-vertical";
        this.element.appendChild(label);
        this.element.appendChild(this.input);
    }

    getProperty(): {} {
        return {};
    }

    setInitialValue(value: string): void {
        this.input.value = value ? String(parseFloat(value)) : "0";
    }
}

export class WidthControl extends NumberControl {
    style = { width: "100%" };
    unitSelector = addUnits("px", "%");

    constructor() {
        super("Width");
        this.element.appendChild(this.unitSelector);
    }

    getProperty(): {} {
        this.style.width = this.input.value + this.unitSelector.value;
        return this.style;
    }

    setInitialValue(value: string): void {
        super.setInitialValue(value);
        setInitialUnits(this.unitSelector, value);
    }
}

export class HeightControl extends NumberControl {
    style = { height: "100px" };
    unitSelector = addUnits("px", "%");

    constructor() {
        super("Height");
        this.element.appendChild(this.unitSelector);
    }

    getProperty(): {} {
        this.style.height = this.input.value + this.unitSelector.value;
        return this.style;
    }

    setInitialValue(value: string): void {
        super.setInitialValue(value);
        setInitialUnits(this.unitSelector, value);
    }
}

export class MarginControl extends NumberControl {
    style = { margin: "10px" };
    unitSelector = addUnits("px", "%");

    constructor() {
        super("Margin");
        this.element.appendChild(this.unitSelector);
    }

    getProperty(): {} {
        this.style.margin = this.input.value + this.unitSelector.value;
        return this.style;
    }

    setInitialValue(value: string): void {
        super.setInitialValue(value);
        setInitialUnits(this.unitSelector, value);
    }
}

export class PaddingControl extends NumberControl {
    style = { padding: "10px" };
    unitSelector = addUnits("px", "%");

    constructor() {
        super("Padding");
        this.element.appendChild(this.unitSelector);
    }

    getProperty(): {} {
        this.style.padding = this.input.value + this.unitSelector.value;
        return this.style;
    }

    setInitialValue(value: string): void {
        super.setInitialValue(value);
        setInitialUnits(this.unitSelector, value);
    }
}

export class FontSizeControl extends NumberControl {
    style = { fontSize: "12pt" };
    unitSelector = addUnits("px", "pt", "em");

    constructor() {
        super("Font Size");
        this.element.appendChild(this.unitSelector);
    }

    getProperty(): {} {
        this.style.fontSize = this.input.value + this.unitSelector.value;
        return this.style;
    }

    setInitialValue(value: string): void {
        super.setInitialValue(value);
        setInitialUnits(this.unitSelector, value);
    }
}