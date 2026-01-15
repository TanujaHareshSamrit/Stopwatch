 let startTime;
        let elapsedTime = 0;
        let timerInterval;
        let isRunning = false;
        let laps = [];

        const display = document.getElementById('display');
        const startStopBtn = document.getElementById('startStopBtn');
        const startIcon = document.getElementById('startIcon');
        const startText = document.getElementById('startText');
        const lapBtn = document.getElementById('lapBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapsContainer = document.getElementById('lapsContainer');
        const progressBar = document.getElementById('progress-bar');

        function timeToString(time) {
            let diffInHrs = time / 3600000;
            let hh = Math.floor(diffInHrs);

            let diffInMin = (diffInHrs - hh) * 60;
            let mm = Math.floor(diffInMin);

            let diffInSec = (diffInMin - mm) * 60;
            let ss = Math.floor(diffInSec);

            let diffInMs = (diffInSec - ss) * 100;
            let ms = Math.floor(diffInMs);

            let formattedHH = hh.toString().padStart(2, "0");
            let formattedMM = mm.toString().padStart(2, "0");
            let formattedSS = ss.toString().padStart(2, "0");
            let formattedMS = ms.toString().padStart(2, "0");

            return `${formattedMM}:${formattedSS}<span class="text-3xl text-blue-500 font-normal">.${formattedMS}</span>`;
        }

        function print(txt) {
            display.innerHTML = txt;
        }

        function start() {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(function printTime() {
                elapsedTime = Date.now() - startTime;
                print(timeToString(elapsedTime));
                // Update progress bar (visual flair)
                progressBar.style.width = `${(elapsedTime % 60000) / 600}%`;
            }, 10);
            showButton("PAUSE");
        }

        function pause() {
            clearInterval(timerInterval);
            showButton("START");
        }

        function reset() {
            clearInterval(timerInterval);
            print("00:00:00<span class='text-3xl text-blue-500 font-normal'>.00</span>");
            elapsedTime = 0;
            laps = [];
            lapsContainer.innerHTML = "";
            lapsContainer.classList.add('hidden');
            progressBar.style.width = "0%";
            showButton("START");
            lapBtn.disabled = true;
        }

        function lap() {
            const lapTime = elapsedTime;
            laps.unshift(lapTime);
            lapsContainer.classList.remove('hidden');
            
            const lapElement = document.createElement('div');
            lapElement.className = "lap-item glass p-4 rounded-2xl flex justify-between items-center text-sm font-medium border-none shadow-sm";
            
            const lapNumber = laps.length;
            const lapFormatted = timeToString(lapTime);
            
            lapElement.innerHTML = `
                <span class="text-gray-400">Lap ${lapNumber}</span>
                <span class="timer-font font-bold text-gray-700">${lapFormatted}</span>
            `;
            
            lapsContainer.prepend(lapElement);
        }

        function showButton(buttonKey) {
            if (buttonKey === "PAUSE") {
                startIcon.className = "fas fa-pause";
                startText.innerText = "Pause";
                startStopBtn.classList.replace('bg-gray-900', 'bg-blue-600');
                lapBtn.disabled = false;
                isRunning = true;
            } else {
                startIcon.className = "fas fa-play";
                startText.innerText = "Start";
                startStopBtn.classList.replace('bg-blue-600', 'bg-gray-900');
                isRunning = false;
            }
        }

        startStopBtn.addEventListener("click", () => {
            if (!isRunning) {
                start();
            } else {
                pause();
            }
        });

        resetBtn.addEventListener("click", reset);
        lapBtn.addEventListener("click", lap);