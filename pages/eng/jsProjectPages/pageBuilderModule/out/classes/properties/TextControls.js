class TextControl {
    element = document.createElement("div");
    input = document.createElement("input");
    style = {};
    static id = 0;
    constructor(labelName) {
        this.input.type = "text";
        this.input.className = "text-input";
        this.input.id = `${labelName}-${TextControl.id++}`;
        const label = document.createElement("label");
        label.htmlFor = this.input.id;
        label.textContent = labelName;
        this.element.className = "property-box-vertical";
        this.element.appendChild(label);
        this.element.appendChild(this.input);
    }
    getProperty() {
        return {};
    }
    setInitialValue(value) {
        this.input.value = value;
    }
}
export class InnerTextControl extends TextControl {
    style = { innerText: "Text Here" };
    constructor() {
        super("Text");
    }
    getProperty() {
        this.style.innerText = this.input.value;
        return this.style;
    }
}
export class UrlControl extends TextControl {
    style = { src: "https://placehold.co/100x100" };
    constructor() {
        super("URL");
        this.input.type = "url";
    }
    getProperty() {
        this.style.src = this.input.value;
        return this.style;
    }
}
