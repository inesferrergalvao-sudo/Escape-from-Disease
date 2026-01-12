
const playBtn = document.getElementById('playBtn');
const bodyEl = document.body;
const viewport = document.getElementById('viewport');
const stage = document.querySelector('.stage');
const narrativeScreen = document.getElementById('narrative-screen');
const narrativeText = document.getElementById('narrative-text');
const person1 = document.getElementById('person-img');
const person2 = document.getElementById('person2-img');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');
const comecarBtn = document.getElementById('comecar-btn');
const fadeOverlay = document.getElementById('fade-overlay');

document.addEventListener('DOMContentLoaded', () => {
    if (fadeOverlay) {
        setTimeout(() => fadeOverlay.classList.add('fade-out'), 100);
    }
    
    // Start the animation sequence
    requestAnimationFrame(startPageTransition);
});

// --- SINGLE PAGE TRANSITION --- 
if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (stage) stage.classList.add('hidden');
        if (viewport) {
            viewport.classList.remove('hidden');
            startNarrativeSequence();
        }
    });
}

function startPageTransition() {
    // Fade the background and start logo
    bodyEl.classList.add('frame2');
    bodyEl.classList.add('body-ready');

    //  Wait for logo to finish then show play button
    setTimeout(() => {
        bodyEl.classList.add('controls-visible');
    }, 1000); 
}




// --- INTRO NARRATIVE LOGIC ---

function startNarrativeSequence() {
    // Initial text fade
    setTimeout(() => narrativeText.style.opacity = 1, 500);

    setTimeout(() => {
        narrativeScreen.style.opacity = 0;
        setTimeout(() => {
            narrativeScreen.classList.add('hidden');
            if (person1) {
                person1.classList.remove('hidden');
                setTimeout(() => person1.classList.add('visible'), 50);
            }
            triggerMessages();
        }, 1500);
    }, 3500);
}

function triggerMessages() {
    if (!msg1) return;
    setTimeout(() => msg1.classList.add('show'), 800);
    setTimeout(() => {
        if (msg2) msg2.classList.add('show');
        enableInteraction();
    }, 2000);
}

function enableInteraction() {
    const handleClick = () => {
        person1.classList.add('fade-out');
        const noteArea = document.getElementById('notification-area');
        if (noteArea) noteArea.classList.add('fade-out');

        setTimeout(() => {
            person1.classList.add('hidden');
            if (msg1) msg1.classList.add('hidden');
            if (msg2) msg2.classList.add('hidden');
            if (noteArea) noteArea.classList.add('hidden');

            if (person2) {
                person2.classList.remove('hidden');
                setTimeout(() => person2.classList.add('visible'), 50);
            }

            setTimeout(() => {
                if (comecarBtn) {
                    comecarBtn.style.display = 'block';
                    setTimeout(() => comecarBtn.style.opacity = 1, 100);

                    comecarBtn.onclick = () => {
                        const overlay = document.getElementById('fade-overlay');
                        if (overlay) overlay.classList.remove('fade-out');

                        // Wait for the fade out (800ms) then change page
                        setTimeout(() => {
                            window.location.href = 'home.html';
                        }, 100);
                    };
                }
            }, 1000);
        }, 800);
    };

    if (msg1) msg1.onclick = handleClick;
    if (msg2) msg2.onclick = handleClick;
}

//--- Hover effects ---
const playBtnContainer = document.getElementById('playBtn');
const playImg = document.querySelector('.play-image');

if (playBtnContainer && playImg) {
    playBtnContainer.addEventListener('mouseenter', () => {
        playImg.src = 'assets/general/Play_hover.svg';
    });

    playBtnContainer.addEventListener('mouseleave', () => {
        playImg.src = 'assets/general/Play.svg';
    });
}


const comecarBtnContainer = document.getElementById('comecar-btn');

if (comecarBtnContainer) {
    comecarBtnContainer.addEventListener('mouseenter', () => {
        comecarBtnContainer.src = 'assets/general/comecar_hover.svg';
    });

    comecarBtnContainer.addEventListener('mouseleave', () => {
        comecarBtnContainer.src = 'assets/general/comecar.svg';
    });
}
