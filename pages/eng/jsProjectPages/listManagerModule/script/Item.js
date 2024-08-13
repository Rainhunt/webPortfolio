export class Item {
    #key
    #content;
    #isCompleted;

    constructor(key, content, isCompleted = false) {
        this.#key = key;
        this.#content = content;
        this.#isCompleted = isCompleted;
    }

    toJSON() {
        return { key: this.#key, content: this.#content, isCompleted: this.#isCompleted };
    }

    static parse(item) {
        return new Item(item.key, item.content, item.isCompleted);
    }

    get key() {
        return this.#key;
    }

    get content() {
        return this.#content;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    save() {
        //key structure is "[local storage key, list key, item key]"
        const lists = JSON.parse(localStorage.getItem(this.key[0])) || [];
        const listIndex = lists.findIndex((list) => list.key[1] === this.key[1]); //find index of the list from lists
        if (listIndex === -1) { //if list doesn't exist
            throw new ReferenceError("List not found");
        } else { //index was found
            const thisIndex = lists[listIndex].items.findIndex((item) => item.key[2] === this.key[2]); //find index of the list from lists
            if (thisIndex === -1) { //if item doesn't exist
                lists[listIndex].push(this);
                localStorage.setItem(this.#key[0], JSON.stringify(lists));
            } else { //index was found
                lists[listIndex].items[thisIndex] = this;
                localStorage.setItem(this.#key[0], JSON.stringify(lists));
            }
        }
        return this;
    }

    setCompletedStatus(bool) {
        this.#isCompleted = bool ? true : false;
        return this;
    }

    static toElement(item) {
        //container
        const htmlElement = document.createElement("div");
        htmlElement.classList.add("item-wrapper");

        //content
        const content = document.createElement("li");
        content.textContent = item.content;
        content.style.textDecoration = item.isCompleted ? "line-through" : "none";
        htmlElement.appendChild(content);
        //checkbox
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = item.isCompleted ? true : false;
        htmlElement.appendChild(checkBox);

        //add event handlers
        checkBox.addEventListener("change", () => {
            item.setCompletedStatus(checkBox.checked).save();
            content.style.textDecoration = item.isCompleted ? "line-through" : "none";
        });
        return htmlElement;
    }
}