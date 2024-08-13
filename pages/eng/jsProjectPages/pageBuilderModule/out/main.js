import { cards } from "./classes/cards/cards.js";
import { ControlPanel } from "./classes/ControlPanel.js";
const controlPanel = new ControlPanel(document.querySelector("#page"), document.querySelector("#control-panel"), cards);
