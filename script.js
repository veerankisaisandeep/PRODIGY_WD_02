let interval;
let elapsedTime = 0;  // Start from 0
let running = false;
let laps = [];

const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');

function startPause() {
    if (!running) {
        startPauseButton.textContent = 'Pause';
        resetButton.disabled = false;
        lapButton.disabled = false;
        running = true;
        interval = setInterval(updateClock, 1000);
    } else {
        startPauseButton.textContent = 'Resume';
        running = false;
        clearInterval(interval);
    }
}

function reset() {
    clearInterval(interval);
    elapsedTime = 0;  // Reset to 0
    running = false;
    startPauseButton.textContent = 'Start';
    resetButton.disabled = true;
    lapButton.disabled = true;
    laps = [];
    lapTimesList.innerHTML = '';
    updateClock();  // Update the display to show 00:00:00
}

function lap() {
    laps.push(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(elapsedTime);
    lapTimesList.appendChild(lapItem);
}

function updateClock() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    const hoursDeg = (hours / 12) * 360;
    const minutesDeg = (minutes / 60) * 360;
    const secondsDeg = (seconds / 60) * 360;

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    document.getElementById('hours-circle').style.background = `conic-gradient(#ff4757 ${hoursDeg}deg, #2c3e50 0deg)`;
    document.getElementById('minutes-circle').style.background = `conic-gradient(#f1c40f ${minutesDeg}deg, #2c3e50 0deg)`;
    document.getElementById('seconds-circle').style.background = `conic-gradient(#2ecc71 ${secondsDeg}deg, #2c3e50 0deg)`;

    document.getElementById('hours-dot').style.transform = `rotate(${hoursDeg}deg)`;
    document.getElementById('minutes-dot').style.transform = `rotate(${minutesDeg}deg)`;
    document.getElementById('seconds-dot').style.transform = `rotate(${secondsDeg}deg)`;

    if (running) {
        elapsedTime++;  // Increment after displaying the initial time
    }
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

updateClock();  // Ensure the display starts at 00:00:00
