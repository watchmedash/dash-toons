const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-button'); // Get the clear button
const mangaContainer = document.getElementById('manga-list');

searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim();

    if (query.length === 0) {
        // If the search input is empty, fetch and display the default manga list
        await fetchMangaData(currentPage);
        clearButton.style.display = 'none'; // Hide clear button when input is empty
        return;
    }

    clearButton.style.display = 'inline-block'; // Show clear button when there is input

    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query ($search: String) {
                        Page {
                            media(search: $search, type: MANGA) {
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
                        }
                    }
                `,
                variables: {
                    search: query,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const mangaList = data.data.Page.media.filter(manga =>
            manga.format === 'MANGA' // Keep only manga format
        );

        displayMangaList(mangaList);
    } catch (error) {
        console.error("Failed to fetch search results:", error);
    }
});

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    searchInput.value = ''; // Clear the input
    clearButton.style.display = 'none'; // Hide clear button
    fetchMangaData(currentPage); // Fetch and display the default manga list
});
