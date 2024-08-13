import { card, IElement, IProperty } from "../types.js";
import { camelToKebab, createIElement } from "../utils/helpers.js";
import { DivElement } from "./elements/DivElement.js";

export class ControlPanel {
    #element: HTMLDivElement;
    #cardPanel: HTMLDivElement = document.createElement("div");
    #selectedCard: card;
    #selectedElement: IElement;
    #pageID: string;
    #editButton: HTMLButtonElement = document.createElement("button");

    constructor(page: HTMLDivElement, controlPanel: HTMLDivElement, cards: card[]) {
        this.#element = controlPanel;
        //IElements are the elements of the page you're building. pageElement is the root element.
        const pageElement = new DivElement(page);
        pageElement.element.addEventListener("click", () => {
            this.selectedElement = pageElement;
            this.#element.replaceChild(this.#cardPanel, this.#element.lastChild as Node);
        });
        this.#selectedElement = pageElement;
        this.#pageID = page.id;

        //create the card panel
        this.#cardPanel.className = "card-panel";
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "card-wrapper";
        for (const card of cards) {
            cardWrapper.appendChild(card.element);
            card.element.innerText = card.icon;
            card.element.addEventListener("click", () => {
                this.selectedCard = card;
            });
        }
        this.#cardPanel.appendChild(cardWrapper);

        //create the buttons
        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "button-wrapper";
        const addButton = document.createElement("button"); //add button
        addButton.className = "add-button";
        addButton.textContent = "Add";
        buttonWrapper.appendChild(addButton);
        addButton.addEventListener("click", () => {
            const element = this.createElement();
            this.#selectedElement.element.insertAdjacentElement("afterend", element.element);
        });
        const insertButton = document.createElement("button"); //insert button
        insertButton.className = "insert-button";
        insertButton.textContent = "Insert";
        buttonWrapper.appendChild(insertButton);
        insertButton.addEventListener("click", () => {
            const element = this.createElement();
            this.#selectedElement.element.appendChild(element.element);
        });
        this.#editButton.className = "edit-button"; //edit button
        this.#editButton.textContent = "\u2699";
        buttonWrapper.appendChild(this.#editButton);
        this.#cardPanel.appendChild(buttonWrapper);
        this.#element.appendChild(this.#cardPanel);
        this.#selectedCard = cards[0];
        this.selectedCard = cards[0]; //add highlighting
    }

    set selectedCard(card: card) {
        this.#selectedCard.element.classList.remove("selected-card");
        this.#selectedCard = card;
        this.#selectedCard.element.classList.add("selected-card");
    }

    set selectedElement(element: IElement) {
        this.#selectedElement.element.classList.remove("selected-element");
        this.#selectedElement = element;
        this.#selectedElement.element.classList.add("selected-element");
        //don't allow the root to have its properties edited
        if (element.element.id === this.#pageID) {
            this.#element.classList.add("hide-editor");
        } else {
            this.#element.classList.remove("hide-editor");
        }
    }

    createElement(): IElement {
        const element = createIElement(this.#selectedCard.name);
        element.setProperties(this.#selectedCard.style);
        element.element.addEventListener("click", (e) => {
            this.selectedElement = element;
            const elementPanel = this.createEditorPanel(element.getPropertyControls());
            if (this.#cardPanel !== this.#element.lastChild) {
                this.#element.replaceChild(elementPanel, this.#element.lastChild as Node);
            }
            //remove event listeners on edit button
            const newEditButton = this.#editButton.cloneNode() as HTMLButtonElement;
            this.#editButton.replaceWith(newEditButton);
            this.#editButton = newEditButton;
            this.#editButton.textContent = "\u2699";
            //add new control panel to edit button
            this.#editButton.addEventListener("click", () => {
                this.#element.replaceChild(elementPanel, this.#element.lastChild as Node);
            })
            e.stopPropagation();
        });
        return element;
    }

    createEditorPanel(properties: IProperty[]): HTMLDivElement {
        const elementPanel = document.createElement("div");
        elementPanel.className = "element-panel";
        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "button-wrapper";
        const backButton = document.createElement("div"); //back button
        backButton.className = "back-button";
        backButton.textContent = "\u2190";
        buttonWrapper.appendChild(backButton);
        const deleteButton = document.createElement("div"); //delete button
        deleteButton.className = "delete-button";
        deleteButton.textContent = "\u{1F5D1}";
        buttonWrapper.appendChild(deleteButton);
        elementPanel.appendChild(buttonWrapper);
        const propertyWrapper = document.createElement("div");
        propertyWrapper.className = "property-wrapper";
        for (const property of properties) {
            propertyWrapper.appendChild(property.element);
            const propertyName = camelToKebab(Object.keys(property.style)[0]);
            property.setInitialValue(this.#selectedElement.element.style.getPropertyValue(propertyName));
            property.input.addEventListener("blur", () => {
                this.#selectedElement.setProperties(property.getProperty());
            });
            property.input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") this.#selectedElement.setProperties(property.getProperty());
            });
        }
        elementPanel.appendChild(propertyWrapper);

        backButton.addEventListener("click", () => {
            this.#element.replaceChild(this.#cardPanel, elementPanel);
        });

        deleteButton.addEventListener("click", () => {
            this.#selectedElement.element.remove();
        });
        return elementPanel;
    }
}