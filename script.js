document.addEventListener("DOMContentLoaded", () => {
    let currentChallenge = 1;
    let countdownInterval;

    const leetPhrase = "I want cake";
    const leetTranslation = "1 w4nt c4k3";

    const badCode = "conslole.log(\"Wh3re is mai c4ke?);";
    const goodCode = "console.log(\"Where is my cake?\");";

    const startGameButton = document.getElementById("start-game");
    const leetSubmitButton = document.getElementById("leet-submit");
    const codeSubmitButton = document.getElementById("code-submit");
    const startChallengeButton = document.getElementById("start-challenge");
    const retryButton = document.getElementById("retry-challenge");
    
    const leetInput = document.getElementById("leet-input");
    const codeEditor = document.getElementById("code-editor");

    function showScreen(screenId) {
        document.querySelectorAll(".challenge, #welcome-screen, #pre-challenge-screen, #fail-screen, #final-screen").forEach(screen => {
            screen.classList.add("hidden");
        });
        document.getElementById(screenId).classList.remove("hidden");
    }

    function startCountdown(timerId, seconds, onTimeout) {
        const timerElement = document.getElementById(timerId);
        let timeLeft = seconds;
        timerElement.textContent = timeLeft;
        countdownInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearTimer();
                onTimeout();
            }
        }, 1000);
    }

    function clearTimer() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }

    function nextChallenge() {
        clearTimer();
        
        if(currentChallenge < 3) {
            currentChallenge++;
            showScreen("pre-challenge-screen");
        } else {
            showScreen("final-screen");
        }
            
    }

    function failChallenge() {
        clearTimer();
        showScreen("fail-screen");
    }

    function spawnBugs() {
        const bugArea = document.getElementById("bug-area");
        bugArea.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const bug = document.createElement("div");
            bug.classList.add("bug");
            bug.style.top = Math.random() * 270 + "px";
            bug.style.left = Math.random() * 370 + "px";
            bug.addEventListener("click", () => {
                bug.remove();
                if (bugArea.children.length === 0) {
                    nextChallenge();
                }
            });
            bugArea.appendChild(bug);
        }
    }

    function startChallenge() {
        showScreen(`challenge-${currentChallenge}`);

        if (currentChallenge === 1) {
            document.getElementById("leet-phrase").textContent = leetPhrase;
            leetInput.value = "";
            startCountdown("leet-timer", 10, () => showScreen("fail-screen"));
        } else if (currentChallenge === 2) {
            spawnBugs();
            startCountdown("bug-timer", 15, () => showScreen("fail-screen"));
        } else if (currentChallenge === 3) {
            codeEditor.value = badCode;
            startCountdown("code-timer", 20, () => showScreen("fail-screen"));
        }
    }

    startGameButton.addEventListener("click", () => {
        currentChallenge = 1;
        startChallenge();
    });

    startChallengeButton.addEventListener("click", () => {
        startChallenge();
    });

    retryButton.addEventListener("click", () => {
        startChallenge();
    });

    leetSubmitButton.addEventListener("click", () => {
        if (leetInput.value.toLowerCase() === leetTranslation) {
            nextChallenge();
        } else {
            failChallenge();
        }
    });

    codeSubmitButton.addEventListener("click", () => {
        if (codeEditor.value === goodCode) {
            nextChallenge();
        } else {
            failChallenge();
        }
    });

    // Show welcome screen initially
    showScreen("welcome-screen");
});
