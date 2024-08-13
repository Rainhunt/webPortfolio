class ColorsControl {
    element = document.createElement("div");
    input = document.createElement("input");
    style = {};
    static id = 0;
    constructor(labelName) {
        this.input.type = "color";
        this.input.className = "color-input";
        this.input.id = `${labelName}-${ColorsControl.id++}`;
        const label = document.createElement("label");
        label.htmlFor = this.input.id;
        label.textContent = labelName;
        this.element.className = "property-box-horizontal";
        this.element.appendChild(label);
        this.element.appendChild(this.input);
    }
    getProperty() {
        return {};
    }
    setInitialValue(value) {
        //convert rgb string to hexcode
        const match = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            // convert values to 2 digit hex
            const toHex = (value) => value.toString(16).padStart(2, "0");
            this.input.value = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }
    }
}
export class BgcControl extends ColorsControl {
    style = { backgroundColor: "grey" };
    constructor() {
        super("Background Color");
    }
    getProperty() {
        this.style.backgroundColor = this.input.value;
        return this.style;
    }
}
export class ColorControl extends ColorsControl {
    style = { color: "black" };
    constructor() {
        super("Color");
    }
    getProperty() {
        this.style.color = this.input.value;
        return this.style;
    }
}
