// Function to create the audio player controls dynamically
function createAudioPlayerControls() {
    // Check if the audio player container already exists
    var playerContainer = document.getElementById('player-container');
    if (playerContainer) {
        return; // If it exists, do nothing
    }

    playerContainer = document.createElement('div');
    playerContainer.id = 'player-container';

    var formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    var label = document.createElement('label');
    label.setAttribute('for', 'audio-select');
    label.textContent = '🔊';

    var select = document.createElement('select');
    select.classList.add('form-control');
    select.id = 'audio-select';
    select.setAttribute('onchange', 'selectAudio(this.value)');

    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '---';
    defaultOption.selected = true;
    defaultOption.disabled = true;

    var option1 = document.createElement('option');
    option1.value = 'background-music1';
    option1.textContent = 'Free Me';

    var option2 = document.createElement('option');
    option2.value = 'background-music2';
    option2.textContent = 'Go';

    var option3 = document.createElement('option');
    option3.value = 'background-music3';
    option3.textContent = 'Modest';

    select.appendChild(defaultOption);
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    formGroup.appendChild(label);
    formGroup.appendChild(select);

    var audioControls = document.createElement('div');
    audioControls.classList.add('audio-controls');

    var playButton = document.createElement('button');
    playButton.id = 'play-btn';
    playButton.textContent = '▶️';
    playButton.setAttribute('onclick', 'playMusic()');
    playButton.disabled = true;

    var pauseButton = document.createElement('button');
    pauseButton.id = 'pause-btn';
    pauseButton.textContent = '⏸️';
    pauseButton.setAttribute('onclick', 'pauseMusic()');
    pauseButton.disabled = true;

    audioControls.appendChild(playButton);
    audioControls.appendChild(pauseButton);

    playerContainer.appendChild(formGroup);
    playerContainer.appendChild(audioControls);

    // Add audio elements with MP3 sources
    var audioContainer1 = document.createElement('div');
    audioContainer1.style.display = 'none';
    audioContainer1.innerHTML = `
        <audio id="background-music1" controls loop>
            <source src="https://dashtoons.xyz/Free-Me.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    `;
    playerContainer.appendChild(audioContainer1);

    var audioContainer2 = document.createElement('div');
    audioContainer2.style.display = 'none';
    audioContainer2.innerHTML = `
        <audio id="background-music2" controls loop>
            <source src="https://dashtoons.xyz/Go.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    `;
    playerContainer.appendChild(audioContainer2);

    var audioContainer3 = document.createElement('div');
    audioContainer3.style.display = 'none';
    audioContainer3.innerHTML = `
        <audio id="background-music3" controls loop>
            <source src="https://dashtoons.xyz/Modest.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    `;
    playerContainer.appendChild(audioContainer3);

    document.body.appendChild(playerContainer);

    // Hide audio controls in pages other than the main page
    if (!isMainPage()) {
        audioControls.style.display = 'none';
    }
}

// Function to check if the current page is the main page
function isMainPage() {
    return window.location.pathname === '/'; // Adjust this based on your main page URL
}

// Call the function to create the audio player controls
createAudioPlayerControls();

// Initialize the current audio variable
var currentAudio = null;

// Function to handle audio selection
function selectAudio(audioId) {
    var audio = document.getElementById(audioId);
    if (audio && audio !== currentAudio) {
        // Pause the currently playing audio
        if (currentAudio) {
            currentAudio.pause();
        }
        // Update the current audio
        currentAudio = audio;
        // Enable play and pause buttons accordingly
        document.getElementById('play-btn').disabled = false;
        document.getElementById('pause-btn').disabled = true;
        // Store the selected audio ID in session storage
        sessionStorage.setItem('currentAudio', audioId);
        // Auto-play the selected audio
        audio.play();
    }
}

// Function to play the selected music
function playMusic() {
    if (currentAudio) {
        currentAudio.play();
        document.getElementById('play-btn').disabled = true;
        document.getElementById('pause-btn').disabled = false;
    }
}

// Function to pause the currently playing music
function pauseMusic() {
    if (currentAudio) {
        currentAudio.pause();
        document.getElementById('play-btn').disabled = false;
        document.getElementById('pause-btn').disabled = true;
    }
}

// Check if there is a selected audio stored in session storage
var storedAudioId = sessionStorage.getItem('currentAudio');
if (storedAudioId) {
    // Select and play the stored audio
    selectAudio(storedAudioId);
}
