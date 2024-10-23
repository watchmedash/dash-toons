const mangasPerPage = 30;
let currentPage = 1;
let totalMangas = 0; // Store total number of mangas

async function fetchMangaData(page) {
    const query = `
    query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: MANGA, sort: POPULARITY_DESC) {
                id
                title {
                    romaji
                }
                coverImage {
                    large
                }
                chapters
                format
            }
            pageInfo {
                total
            }
        }
    }`;

    const variables = {
        page: page,
        perPage: mangasPerPage,
    };

    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error fetching data:", errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        totalMangas = data.data.Page.pageInfo.total; // Update total mangas

        // Include all mangas, even if chapters are null (ongoing)
        const mangaList = data.data.Page.media.filter(manga =>
            manga.format === 'MANGA' // Only include regular manga
        );

        displayMangaList(mangaList);
        setupPagination();
    } catch (error) {
        console.error("Failed to fetch manga data:", error);
    }
}

function displayMangaList(mangaList) {
    const mangaContainer = document.getElementById('manga-list');
    mangaContainer.innerHTML = ''; // Clear previous content

    mangaList.forEach(manga => {
        const mangaItem = document.createElement('div');
        mangaItem.className = 'manga-item';
        mangaItem.innerHTML = `
            <img src="${manga.coverImage.large}" alt="${manga.title.romaji}" class="manga-cover" data-id="${manga.id}">
            <h3 class="manga-title" data-id="${manga.id}">${manga.title.romaji}</h3>
            <p>Chapters: ${manga.chapters !== null ? manga.chapters : 'Ongoing'}</p> <!-- Display ongoing if chapters are null -->
        `;
        mangaContainer.appendChild(mangaItem);
    });

    // Add click event listeners for manga titles and covers
    const titles = document.querySelectorAll('.manga-title');
    const covers = document.querySelectorAll('.manga-cover');

    titles.forEach(title => {
        title.addEventListener('click', () => {
            const currentMangaId = title.getAttribute('data-id');
            window.location.href = `manga.html?id=${currentMangaId}&chapter=1`; // Redirect to manga.html with manga ID
        });
    });

    covers.forEach(cover => {
        cover.addEventListener('click', () => {
            const currentMangaId = cover.getAttribute('data-id');
            window.location.href = `manga.html?id=${currentMangaId}&chapter=1`; // Redirect to manga.html with manga ID
        });
    });
}


// Function to set up pagination
function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear previous pagination

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Prev';
    prevButton.disabled = currentPage === 1; // Disable if on first page
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMangaData(currentPage); // Fetch data for the previous page
            window.scrollTo(0, 0); // Scroll to the top of the page
        }
    });
    pagination.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage * mangasPerPage >= totalMangas; // Disable if on last page
    nextButton.addEventListener('click', () => {
        if (currentPage * mangasPerPage < totalMangas) {
            currentPage++;
            fetchMangaData(currentPage); // Fetch data for the next page
            window.scrollTo(0, 0); // Scroll to the top of the page
        }
    });
    pagination.appendChild(nextButton);
}

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

    // Show the details section
    document.getElementById('manga-details').style.display = 'block';

    // Populate the chapter dropdown (if chapters are available)
    const chapterDropdown = document.getElementById('chapter-dropdown');
    chapterDropdown.innerHTML = ''; // Clear previous chapters

    const chapters = manga.chapters !== null ? manga.chapters : 0; // Fallback to 0 if null

    for (let i = 1; i <= chapters; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Chapter ${i}`;
        chapterDropdown.appendChild(option);
    }
}

// Initial data fetch
fetchMangaData(currentPage);
