import { List } from "./List.js";

export class ListsManager {
    constructor(key, containerId, newListTextInputId, createNewListButtonId) { //key to the local storage
        const htmlContainer = document.querySelector(containerId);
        //parse local storage into html elements and append them to container
        const lists = JSON.parse(localStorage.getItem(key)) || [];
        for (const list of lists) {
            htmlContainer.appendChild(List.toElement(List.parse(list)));
        }

        //add event handlers
        document.querySelector(createNewListButtonId).addEventListener("click", () => {
            const newListTextInput = document.querySelector(newListTextInputId);
            if (newListTextInput.value) {
                const list = new List([key, Date.now()], newListTextInput.value);
                list.save();
                htmlContainer.appendChild(List.toElement(list));
                newListTextInput.value = "";
            }
        });
    }
}

