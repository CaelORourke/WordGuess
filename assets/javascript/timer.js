var intervalId;
var timerRunning = false;
var time = 0;

function startTimer() {
    if (!timerRunning) {
        intervalId = setInterval(timerTick, 1000);
        timerRunning = true;
    }
}

function stopTimer() {
    if (timerRunning) {
        clearInterval(intervalId);
        timerRunning = false;
    }
}

function resetTimer() {
    time = 0;
    displayTime();
}

function displayTime() {
    $("#timerDisplay .card-text").text(formatTime(time));
}

function timerTick() {
    time++;
    displayTime();
}

function formatTime(time) {
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
