
// 1. Dialogue Transitions
function toSecondDialogue() {
    const c1 = document.getElementById('container-1');
    const c2 = document.getElementById('container-2');
    if (c1 && c2) {
        c1.classList.add('hidden');
        c2.classList.remove('hidden');
    }
}


// 2. Start Game: Hides dialogue, shows navbar, and mini-games
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

const quitPopup = document.getElementById('popup-quit');

// back button and quit pop-up
//Rever (antes não funcionava por isso criei as funções abaixo)
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backBtn');

    if (backBtn && quitPopup) {
        backBtn.onclick = () => {
            quitPopup.style.display = 'block';
        };
    }

    const diagOverlay = document.getElementById('dialogue-overlay');
    if (diagOverlay) {
        diagOverlay.style.opacity = '1';
        diagOverlay.style.pointerEvents = 'auto';
        diagOverlay.classList.remove('hidden');
    }
});

function openQuitPopup() {
    if (quitPopup) quitPopup.style.display = 'block';
}

function closeQuitPopup() {
    if (quitPopup) quitPopup.style.display = 'none';
}

function confirmQuit() {
    window.location.href = 'home.html';
}


// win mini-game
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
    const requiredGames = ['hospital', 'market', 'park', 'arcade', 'house'];
    const progress = JSON.parse(localStorage.getItem('gameProgress')) || {};
    
    return requiredGames.every(game => progress[game] === true);
}


const quitBtn= document.getElementById('quitBtn');
const stayBtn= document.getElementById('stayBtn');

if (quitBtn) {
    quitBtn.addEventListener('mouseenter', () => {
        quitBtn.src = 'assets/general/sair_jogo_hover.svg';
    });

    quitBtn.addEventListener('mouseleave', () => {
        quitBtn.src = 'assets/general/sair_jogo.svg';
    });
}

if (stayBtn) {
    stayBtn.addEventListener('mouseenter', () => {
        stayBtn.src = 'assets/general/continuar_jogo_hover.svg';
    });

    stayBtn.addEventListener('mouseleave', () => {
        stayBtn.src = 'assets/general/continuar_jogo.svg';
    });
}