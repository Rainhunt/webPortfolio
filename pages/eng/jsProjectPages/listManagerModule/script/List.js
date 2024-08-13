import { Item } from "./Item.js";

export class List {
    #key;
    #name;
    #items;

    constructor(key, listName, items = []) {
        this.#key = key;
        this.#name = listName;
        this.#items = items
    }

    toJSON() {
        return { key: this.#key, name: this.#name, items: this.#items };
    }

    static parse(list) {
        const items = [];
        for (const item of list.items) {
            items.push(Item.parse(item));
        }
        return new List(list.key, list.name, items);
    }

    get key() {
        return this.#key;
    }

    get name() {
        return this.#name;
    }

    get items() {
        return this.#items;
    }

    save() {
        //key structure is "[local storage key, list key]"
        const lists = JSON.parse(localStorage.getItem(this.key[0])) || [];
        const thisIndex = lists.findIndex((list) => list.key[1] === this.key[1]); //find index of this list from lists
        if (thisIndex === -1) { //if list doesn't exist
            lists.push(this);
            localStorage.setItem(this.#key[0], JSON.stringify(lists));
        } else { //index was found
            lists[thisIndex] = this;
            localStorage.setItem(this.#key[0], JSON.stringify(lists));
        }
        return this;
    }

    delete() {
        //key structure is "[local storage key, list key]"
        const lists = JSON.parse(localStorage.getItem(this.key[0])) || [];
        const thisIndex = lists.findIndex((list) => list.key[1] === this.key[1]); //find index of this list from lists
        if (thisIndex !== -1) { //index was found
            lists.splice(thisIndex, 1);
            localStorage.setItem(this.#key[0], JSON.stringify(lists));
        }
    }

    addItem(item) {
        if (this.#items.findIndex((currentItem) => currentItem.key[2] === item.key[2]) === -1) { //item doesn't exist
            this.#items.push(item);
            this.save();
        }
        return this;
    }

    static toElement(list) {
        //container
        const htmlElement = document.createElement("section");
        htmlElement.classList.add("list-container");

        //header
        const header = document.createElement("h3");
        header.textContent = list.name;
        htmlElement.appendChild(header);
        //new item wrapper
        const newItemWrapper = document.createElement("div");
        const newItemTextInput = document.createElement("input"); //text field
        newItemTextInput.type = "text";
        newItemWrapper.appendChild(newItemTextInput);
        const createNewItemButton = document.createElement("input"); //button
        createNewItemButton.type = "button";
        createNewItemButton.value = "Add Item";
        newItemWrapper.appendChild(createNewItemButton);
        htmlElement.appendChild(newItemWrapper);
        //items wrapper
        const itemsWrapper = document.createElement("ul");
        itemsWrapper.classList.add("items-wrapper");
        for (const item of list.items) { //add items
            itemsWrapper.appendChild(Item.toElement(item));
        }
        htmlElement.appendChild(itemsWrapper);
        //delete list button
        const deleteListButton = document.createElement("input");
        deleteListButton.type = "button";
        deleteListButton.value = "Delete List";
        htmlElement.appendChild(deleteListButton);

        //event handlers
        //create event handlers
        createNewItemButton.addEventListener("click", () => {
            if (newItemTextInput.value) {
                //save to local storage
                const item = new Item([...list.key, Date.now()], newItemTextInput.value);
                list.addItem(item).save();

                //append to html element
                itemsWrapper.appendChild(Item.toElement(item));
                newItemTextInput.value = "";
            }
        });
        deleteListButton.addEventListener("click", () => {
            if (confirm("Are you sure you would like to delete this list?")) {
                list.delete();
                htmlElement.remove();
            }
        });

        return htmlElement;
    }
}