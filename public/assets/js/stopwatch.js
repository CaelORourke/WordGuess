export const stopwatch = (function () {
    let displayTime = null;
    let intervalId = null;
    let startTime = 60;
    let time = 0;
    let timerRunning = false;
    let timesUp = null;

    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    };

    function timerTick() {
        time--;

        if (typeof displayTime === "function") {
            displayTime(formatTime(time));
        }

        if (time <= 0) {
            timer.stopTimer();
            time = 0;
            if (typeof timesUp === "function") {
                timesUp();
            }
        }
    };

    let timer = {
        onDisplayTime(displayTimeCallback) {
            displayTime = displayTimeCallback;
        },

        onTimesUp(timesUpCallback) {
            timesUp = timesUpCallback;
        },

        resetTimer() {
            time = startTime;
            if (typeof displayTime === "function") {
                displayTime(formatTime(time));
            }
        },

        startTimer() {
            if (!timerRunning) {
                intervalId = setInterval(timerTick.bind(this), 1000);
                timerRunning = true;
            }
        },

        stopTimer() {
            if (timerRunning) {
                clearInterval(intervalId);
                timerRunning = false;
            }
        }
    };

    return timer;
})();
