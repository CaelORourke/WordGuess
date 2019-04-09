var stopwatch = {
    intervalId: null,
    timerRunning: false,
    time: 0,
    startTime: 60,
    startTimer: function () {
        if (!this.timerRunning) {
            this.intervalId = setInterval(this.timerTick.bind(this), 1000);
            this.timerRunning = true;
        }
    },
    stopTimer: function () {
        if (this.timerRunning) {
            clearInterval(this.intervalId);
            this.timerRunning = false;
        }
    },
    resetTimer: function () {
        this.time = this.startTime;
        if (typeof this.displayTime === "function") {
            this.displayTime(this.formatTime(this.time));
        }
    },
    displayTime: function (time) {
    },
    timesUp: function () {
    },
    timerTick: function () {
        this.time--;

        if (typeof this.displayTime === "function") {
            this.displayTime(this.formatTime(this.time));
        }

        if (this.time <= 0) {
            this.stopTimer();
            this.time = 0;
            if (typeof this.timesUp === "function") {
                this.timesUp();
            }
        }
    },
    formatTime: function (time) {
        var minutes = Math.floor(time / 60);
        var seconds = time - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
}
