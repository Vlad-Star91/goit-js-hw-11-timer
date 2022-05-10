class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.intervalID = null;
        this.getRefs().btnStart.addEventListener("click", this.start.bind(this));
        this.getRefs().btnStop.addEventListener("click", this.stop.bind(this));
        this.getRefs().btnStop.disabled = true;
    }
    getDateNow() {
        return Date.now();
    }
    getRefs() {
        const container = document.querySelector(this.selector);
        const daysRef = container.querySelector('[data-value="days"]');
        const hoursRef = container.querySelector('[data-value="hours"]');
        const minsRef = container.querySelector('[data-value="mins"]');
        const secsRef = container.querySelector('[data-value="secs"]');
        const btnStart = container.querySelector(".start");
        const btnStop = container.querySelector(".stop");
        return {daysRef, hoursRef, minsRef, secsRef, btnStart, btnStop};
    }
    updateTimer({ daysRef, hoursRef, minsRef, secsRef }) {
        const time = this.targetDate - this.getDateNow();
        daysRef.textContent = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        hoursRef.textContent = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        minsRef.textContent = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        secsRef.textContent = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    }
    start() {
        this.getRefs().btnStart.disabled = true;
        this.intervalId = setInterval(() => {
            this.updateTimer(this.getRefs())
        }, 1000);
        this.getRefs().btnStop.disabled = false;
    }
    stop() {
        clearInterval(this.intervalId);
        this.getRefs().btnStart.disabled = false;
        this.getRefs().btnStop.disabled = true;
    }
    pad(value) {
        return String(value).padStart(2, "0");
    }
}


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 18, 2022'),
});
// const timer2 = new CountdownTimer({
//   selector: '#timer-2',
//   targetDate: new Date('Sep 25, 2021'),
// });
console.log(timer);
// timer.start();
// timer2.start();