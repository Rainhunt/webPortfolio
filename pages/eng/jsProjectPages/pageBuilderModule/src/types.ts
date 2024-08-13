export type card = { element: HTMLDivElement, name: string, style: {}, icon: string };

export interface IProperty {
    element: HTMLDivElement;
    style: {};
    input: HTMLInputElement;
    getProperty(): {};
    setInitialValue(value: string): void;
}

export interface IElement {
    element: HTMLElement;
    getPropertyControls(): IProperty[];
    setProperties(properties: {}): void;
}