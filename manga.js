const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('id');
let currentChapter = 1; // Default chapter for ongoing manga
let totalChapters = 0; // Define totalChapters globally

// Function to fetch and display manga details
async function fetchMangaDetails(id) {
    const query = `
    query ($id: Int) {
        Media (id: $id, type: MANGA) {
            id
            title {
                romaji
            }
            coverImage {
                large
            }
            chapters
        }
    }`;

    const variables = { id: parseInt(id) };

    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();
        displayMangaDetails(data.data.Media);
    } catch (error) {
        console.error("Failed to fetch manga details:", error);
    }
}

// Function to display manga details in the UI
function displayMangaDetails(manga) {
    document.getElementById('manga-title').innerText = manga.title.romaji;
    document.getElementById('manga-cover').src = manga.coverImage.large;

    // Determine if the manga is ongoing or completed
    if (manga.chapters === null) {
        // Ongoing manga logic
        currentChapter = 1; // Set to chapter 1 for ongoing mangas
        totalChapters = 0; // You can keep this for any specific checks if needed
        updateEmbed(); // Load the first chapter for ongoing mangas
    } else {
        // Completed manga logic
        totalChapters = manga.chapters; // Set total chapters
        // Populate the chapter dropdown
        populateChaptersDropdown();
        currentChapter = Math.min(currentChapter, totalChapters); // Ensure current chapter doesn't exceed total chapters
        updateEmbed(); // Load the initial chapter
    }

    // Navigation for both top and bottom chapter buttons
    document.getElementById('prev-chapter').onclick = navigateToPreviousChapter;
    document.getElementById('next-chapter').onclick = navigateToNextChapter;
    document.getElementById('prev-chapter-bottom').onclick = navigateToPreviousChapter;
    document.getElementById('next-chapter-bottom').onclick = navigateToNextChapter;

    // Handle 'Go to Chapter' button click
    document.getElementById('go-to-chapter').onclick = () => {
        const chapterInput = document.getElementById('chapter-input');
        const chapterNumber = parseInt(chapterInput.value);
        if (!isNaN(chapterNumber) && chapterNumber > 0) {
            currentChapter = chapterNumber; // Update currentChapter to user input
            updateEmbed();
            updateButtonStates(); // Update button states when chapter changes
        } else {
            alert('Please enter a valid chapter number.');
        }
    };

    updateButtonStates(); // Initial button states on load
}

// Function to populate chapters in the dropdown for completed mangas
function populateChaptersDropdown() {
    const chapterDropdown = document.getElementById('chapter-dropdown');
    chapterDropdown.innerHTML = ''; // Clear previous chapters

    for (let i = 1; i <= totalChapters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Chapter ${i}`;
        chapterDropdown.appendChild(option);
    }

    // Set the dropdown to the current chapter
    chapterDropdown.value = currentChapter;

    // Update the embed URL for the manga reader
    updateEmbed();

    // Handle dropdown changes
    chapterDropdown.addEventListener('change', () => {
        currentChapter = chapterDropdown.value;
        updateEmbed();
        updateButtonStates(); // Update button states when chapter changes
    });
}

// Function to navigate to the previous chapter
function navigateToPreviousChapter() {
    if (currentChapter > 1) {
        currentChapter--;
        updateEmbed();
        updateButtonStates(); // Update button states after navigation
    }
}

// Function to navigate to the next chapter
function navigateToNextChapter() {
    if (totalChapters === 0 || currentChapter < totalChapters) { // Check if ongoing or current chapter is less than total
        currentChapter++;
        updateEmbed();
        updateButtonStates(); // Update button states after navigation
    }
}

// Function to update the embed URL for the manga reader
function updateEmbed() {
    const embedFrame = document.getElementById('manga-embed');
    embedFrame.src = `https://vidsrc.icu/embed/manga/${mangaId}/${currentChapter}`;
}

// Function to update the states of the navigation buttons
function updateButtonStates() {
    document.getElementById('prev-chapter').disabled = (currentChapter <= 1);
    document.getElementById('prev-chapter-bottom').disabled = (currentChapter <= 1);
    document.getElementById('next-chapter').disabled = (totalChapters > 0 && currentChapter >= totalChapters); // Disable if completed and at last chapter
    document.getElementById('next-chapter-bottom').disabled = (totalChapters > 0 && currentChapter >= totalChapters); // Disable if completed and at last chapter
}

// Back button functionality
document.getElementById('back-button').onclick = () => {
    window.location.href = 'index.html';
};

// Fetch the manga details when the page loads
fetchMangaDetails(mangaId);
