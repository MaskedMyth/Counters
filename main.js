import { Counter } from './Counter.js';

document.getElementById("add-btn").addEventListener("click", () => {
    const container = document.getElementById("counters");
    new Counter(container);
});