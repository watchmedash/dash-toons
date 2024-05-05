document.addEventListener('DOMContentLoaded', () => {
  const itemList = [
    "Zack Snyder's Justice League",
    "Mercenary Enrollment",
    "Trash of the Count's Family"
  ];

  function performSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchTerm = searchInput.value.toLowerCase().trim(); // Ensure search term is in lowercase and trimmed

    // Clear previous search results
    searchResults.innerHTML = "";

    if (searchTerm === "") {
      // If the search input is empty, hide the search results and return
      searchResults.style.display = "none";
      return;
    }

    // Filter items based on search term
    const filteredItems = itemList.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );

    // Display search results
    if (filteredItems.length === 0) {
      searchResults.innerHTML = "<p>No results found.</p>";
    } else {
      displayItemList(filteredItems, searchResults);
    }

    // Show the search results
    searchResults.style.display = "block";
  }

  function displayItemList(items, container) {
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = item;
      // You may need to adjust the href attribute based on your actual URLs
      link.href = `chapters/${encodeURIComponent(item)}.html`;
      li.appendChild(link);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", performSearch);

  // Prevent form submission on button click
  const form = document.querySelector('.search-container form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const searchResults = document.getElementById("searchResults");
  searchResults.style.display = "none";
});
