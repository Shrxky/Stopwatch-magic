let [centiseconds, seconds, minutes] = [0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let intervalId = null;
let isRunning = false;

let force = 0;

function setvalue() {
    force = document.getElementById("user-input").value;
    const elements = document.getElementsByClassName("inp");

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("hidden");  // Hide immediately
    }
}



const toggleBtn = document.getElementById("toggle-timer");

toggleBtn.addEventListener("click", () => {
    if (isRunning) {
        // Pause
        centiseconds = force; // Apply forced value
        clearInterval(intervalId);
        updateDisplay();
        toggleBtn.innerText = "Start";
        toggleBtn.classList.remove("pause");
        toggleBtn.classList.add("start");
    } else {
        // Start
        intervalId = setInterval(displayTimer, 10);
        toggleBtn.innerText = "Stop";
        toggleBtn.classList.remove("start");
        toggleBtn.classList.add("pause");
    }
    isRunning = !isRunning;
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(intervalId);
    [centiseconds, seconds, minutes] = [0, 0, 0];
    updateDisplay();
    isRunning = false;
    toggleBtn.innerText = "Start";
    toggleBtn.classList.remove("pause");
    toggleBtn.classList.add("start");
});

function displayTimer() {
    centiseconds++;
    if (centiseconds === 100) {
        centiseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            // No hours anymore, so no reset after 60 minutes
        }
    }
    updateDisplay();
}

function updateDisplay() {
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let cs = centiseconds < 10 ? "0" + centiseconds : centiseconds;

    timeRef.innerHTML = `${m}:${s}:${cs}`;
}
