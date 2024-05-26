document.addEventListener('DOMContentLoaded', () => {
  const itemList = [
    "The Perks of Working in the Black Magic Industry",
    "Solo Leveling",
    "Dandadan",
    "Easy Survival in Another World",
    "The Player That Cant Level Up",
    "The Worn and Torn Newbie",
    "Murim RPG Simulation",
    "Volcanic Age",
    "Forest Syrup",
    "Jujutsu Kaisen",
    "Tougen Anki",
    "Class 1-9",
    "Chronicles of Heavenly Demon",
    "Wind Breaker",
    "Peerless Dad",
    "Omniscient Reader",
    "Leveling With the Gods",
    "Mercenary Enrollment",
    "Return of the Blossoming Blade",
    "Im the Max-Level Newbie",
    "Pick Me Up Infinite Gacha",
    "Dungeon Reset",
    "The Tutorial Is Too Hard",
    "The Greatest Estate Developer",
    "Nano Machine",
    "The World After the Fall",
    "Survival Story of a Sword King in a Fantasy World",
    "QUESTISM",
    "The Max Level Hero Has Returned",
    "Return of the Broken Constellation",
    "The Legend of the Northern Blade",
    "TSUYOSHI",
    "Ingoshima",
    "Tower of God",
    "Kagurabachi",
    "Sakamoto Days",
    "Kill Blue",
    "Justice League vs Godzilla vs Kong",
    "Superboy The Man of Tomorrow",
    "Blue Lock",
    "Overgeared",
    "Eleceed",
    "Manager Kim",
    "Monster-8",
    "Boundless Ascension",
    "SSS-Class Suicide Hunter",
    "The Breaker 3 – Eternal Force",
    "Surviving the Game as a Barbarian",
    "The Beginning After the End",
    "Doom Breaker",
    "Leviathan",
    "Bastard",
    "Shotgun Boy",
    "Sweet Home",
    "The Boxer",
    "Her Summon",
    "The Horizon",
    "The Villainess Turns the Hourglass",
    "Child of the Sheath",
    "Who Made Me A Princess",
    "Mercenary Enrollment",
    "Trash of the Counts Family"
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
