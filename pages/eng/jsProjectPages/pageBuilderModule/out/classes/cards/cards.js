const divElement = document.createElement("div");
const textElement = document.createElement("div");
const imgElement = document.createElement("div");
export const cards = [
    {
        name: "div",
        element: divElement,
        style: { width: "100%", height: "100px", backgroundColor: "#bbbbbb", padding: "10px" },
        icon: "\u{1F5CC}"
    },
    {
        name: "text",
        element: textElement,
        style: { fontSize: "12pt" },
        icon: "\u{1F5CF}"
    },
    {
        name: "img",
        element: imgElement,
        style: { width: "100px", height: "100px", objectCit: "contain" },
        icon: "\u{1F5BB}"
    }
];
for (const card of cards) {
    card.element.className = "card";
}
cards[0].element.classList.add("selected-card");
