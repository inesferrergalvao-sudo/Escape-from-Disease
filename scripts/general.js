/**
 * GENERAL.JS
 * Shared logic for dialogue transitions, game starts, and navigation.
 */

// 1. Dialogue Transitions: Move from the first text/image to the second
function toSecondDialogue() {
    const c1 = document.getElementById('container-1');
    const c2 = document.getElementById('container-2');
    if (c1 && c2) {
        c1.classList.add('hidden');
        c2.classList.remove('hidden');
    }
}


// 2. Start Game: Hides dialogue, shows navbar, and runs level-specific code
function startGame() {
    const overlay = document.getElementById('dialogue-overlay');
    const navbar = document.getElementById('navbar');
    const gameContainer = document.getElementById('game-container');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        setTimeout(() => overlay.style.display = 'none', 500);
    }

    if (navbar) navbar.classList.add('active');

    // CRITICAL: Make the game container visible
    if (gameContainer) {
        gameContainer.classList.add('visible');
    }

    if (typeof initMiniGame === "function") {
        initMiniGame();
    }
}

// 3. Navigation & Modal Listeners
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backBtn');
    const quitPopup = document.getElementById('popup-quit');

    // Attach click to the back icon (voltar.svg)
    if (backBtn && quitPopup) {
        backBtn.onclick = () => {
            quitPopup.style.display = 'block';
        };
    }

    // Initialize dialogue overlay state
    const diagOverlay = document.getElementById('dialogue-overlay');
    if (diagOverlay) {
        diagOverlay.style.opacity = '1';
        diagOverlay.style.pointerEvents = 'auto';
        diagOverlay.classList.remove('hidden');
    }
});

// Helper: Close the quit confirmation modal
const quitPopup = document.getElementById('popup-quit');
function openQuitPopup() {
    if (quitPopup) quitPopup.style.display = 'block';
}

function closeQuitPopup() {
    if (quitPopup) quitPopup.style.display = 'none';
}

// Helper: Return to the map
function confirmQuit() {
    window.location.href = 'home.html';
}

// 4. Success Logic: Called when a mini-game is won
function showSuccess() {
    const successPopup = document.getElementById('popup-success');
    if (successPopup) successPopup.style.display = 'block';
}

function openEndDialogue() {
    const endOverlay = document.getElementById('end-dialogue-overlay');
    if (endOverlay) {
        endOverlay.classList.remove('hidden');
        endOverlay.style.opacity = '1';
        endOverlay.style.pointerEvents = 'auto';
        endOverlay.style.display = 'flex';
    }
}

function toNextEndStep(currentStep, nextStep) {
    const current = document.getElementById(`end-container-${currentStep}`);
    const next = document.getElementById(`end-container-${nextStep}`);
    if (current && next) {
        current.classList.add('hidden');
        next.classList.remove('hidden');
    }
}


function isGameFinished() {
    // These must exactly match your filenames (hospital.html, market.html, etc.)
    const requiredGames = ['hospital', 'market', 'park', 'arcade', 'house'];
    const progress = JSON.parse(localStorage.getItem('gameProgress')) || {};
    
    // Returns true only if every game in the list is marked as true in localStorage
    return requiredGames.every(game => progress[game] === true);
}