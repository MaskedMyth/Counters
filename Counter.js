export class Counter {
    constructor(container) {
        this.number = 0;
        this.seconds = 0;
        this.interval = null;
        this.running = false;

        this.container = container;

        this.build();
    }

    build() {
        this.mainDiv = document.createElement("div");
        this.mainDiv.className = "counterContainer";

        //Counter title
        this.label = document.createElement("span");
        this.label.textContent = "Counter";
        this.label.addEventListener("click", () => {
            const newText = prompt("Enter new text:");
            if (newText) this.label.innerText = newText;
        })
        this.mainDiv.appendChild(this.label);

        //Counter number
        this.counterDisplay = document.createElement("span");
        this.counterDisplay.textContent = `Counter: ${this.number}`;

        const counterDiv = document.createElement("div");
        counterDiv.className = "counter";
        counterDiv.appendChild(this.counterDisplay);
        counterDiv.appendChild(this.createButton("+1", () => this.updateCounter(1)));
        counterDiv.appendChild(this.createButton("-1", () => this.updateCounter(-1)));
        counterDiv.appendChild(this.createButton("Reset", () => this.resetCounter()));
        this.mainDiv.appendChild(counterDiv);


        //Timer text and buttons
        this.timerDisplay = document.createElement("span");
        this.timerDisplay.textContent = 'Timer: 0:00';

        const timerDiv = document.createElement("div");
        timerDiv.className = "timer";
        timerDiv.appendChild(this.timerDisplay);

        this.startStopBtn = this.createButton("Start", () => this.toggleTimer());
        const resetTimerBtn = this.createButton("Reset", () => this.resetTimer());

        timerDiv.appendChild(this.startStopBtn);
        timerDiv.appendChild(resetTimerBtn);
        this.mainDiv.appendChild(timerDiv);


        this.container.appendChild(this.mainDiv);
    };
    createButton(text, onClick) {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", onClick);

        return button;
    };

    updateCounter(amount) {
        this.number += amount;
        this.counterDisplay.textContent = `Counter: ${this.number}`;
    };
    resetCounter() {
        this.number = 0;
        this.counterDisplay.textContent = `Counter: ${this.number}`;
    };

    toggleTimer() {
        if (this.running) {
            clearInterval(this.interval);
            this.startStopBtn.textContent = "Start";
        } else {
            this.interval = setInterval(() => this.updateTimer(), 1000);
            this.startStopBtn.textContent = "Stop";
        }
        this.running = !this.running;
    };
    updateTimer() {
        this.seconds += 1;
        this.updateTimerDisplay();
    };
    updateTimerDisplay() {
        const mins = String(Math.floor(this.seconds / 60));
        const secs = String(this.seconds % 60).padStart(2, "0");
        this.timerDisplay.textContent = `Timer: ${mins}:${secs}`;
    };
    resetTimer() {
        this.seconds = 0;

        clearInterval(this.interval);
        this.running = false;
        this.startStopBtn.textContent = "Start";

        this.updateTimerDisplay();
    };
};