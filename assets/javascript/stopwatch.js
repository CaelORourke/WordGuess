var stopwatch = {
    intervalId: null,
    timerRunning: false,
    time: 0,
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
        this.time = 0;
        this.displayTime();
    },
    displayTime: function () {
        $("#timerDisplay .card-text").text(this.formatTime(this.time));
    },
    timerTick: function () {
        this.time++;
        this.displayTime();
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
