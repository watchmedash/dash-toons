




document.addEventListener('DOMContentLoaded', (event) => {
  // Sample list of items for search
  const itemList = [
    "1917",
    "I Am Rage",
    "The Collective",
    "The Three Musketeers D Artagnan",
    "Hidden Strike",
    "Insidious - The Red Door",
"365 Days This Day",
"Army of the Dead",
"Army of Thieves",
"As Certain as Death",
"Asteroid City",
"Avatar The Way of Water",
"Batman - Soul of the Dragon",
"Batman - The Doom That Came to Gotham",
"Batman and Superman - Battle of the Super Sons",
"Beast",
"Bird Box Barcelona",
"Black Adam",
"Black Clover Sword of the Wizard King",
"Bullet Train",
"Call Her King",
"Chaos Walking",
"Cocaine Bear",
"DC League of Super - Pets",
"Death on the Nile",
"Demon Slayer the Movie - Mugen Train",
"Doctor Strange in the Multiverse of Madness",
"Dog",
"Dune",
"Dungeons & Dragons - Honor Among Thieves",
"El Camino - A Breaking Bad Movie",
"Enola Holmes 2",
"Eternals",
"Extraction 2",
"Fantastic Beasts - The Secrets of Dumbledore",
"Fast & Furious Presents - Hobbs & Shaw",
"Fast X",
"Firestarter",
"Fullmetal Alchemist - The Final Alchemy",
"Ghosted",
"Glass Onion - A Knives Out Mystery",
"God Is a Bullet",
"Godzilla vs Kong",
"Goodbye, Don Glees!",
"Guardians of the Galaxy Volume 3",
"Halloween Kills",
"Home Sweet Home Alone",
"Hotel Transylvania - Transformania",
"Injustice",
"John Wick Chapter 4",
"Joker",
"Jurassic World Dominion",
"Justice League x RWBY - Super Heroes & Huntsmen, Part One",
"Justice League-Warworld",
"Justice Society - World War II",
"Knights of the Zodiac",
"Lightyear",
"Luck",
"Me Time",
"Mighty Morphin Power Rangers Once & Always",
"Minions - The Rise of Gru",
"Morbius",
"Mortal Kombat",
"Nimona",
"No Time to Die",
"Nobody",
"Nope",
"Operation Fortune - Ruse de Guerre",
"Orphan - First Kill",
"Pinocchio",
"Pokémon Detective Pikachu",
"Prey",
"Quicksand",
"Raya and the Last Dragon",
"Red Notice",
"Renfield",
"Resident Evil - Death Island",
"Resident Evil - Welcome to Raccoon City",
"Ruby Gillman  Teenage Kraken",
"Samaritan",
"scream 6",
"Shang-Chi and the Legend of the Ten Rings",
"Shazam! Fury of the Gods",
"Sisu",
"Sonic the Hedgehog 2",
"Spider-Man - No Way Home",
"Spider-Man Across the Spider-Verse",
"Terminator - Dark Fate",
"Texas Chainsaw Massacre",
"The Addams Family 2",
"The Black Demon",
"The Blackening",
"The Conjuring - The Devil Made Me Do It",
"The Croods - A New Age",
"The Flash",
"The Gray Man",
"The Lion King",
"The Little Mermaid",
"The Lost City",
"The Machine",
"The Matrix Resurrections",
"The Mitchells vs The Machines",
"The Northman",
"The Out-Laws",
"The Secret Life of Pets 2",
"The Super Mario Bros Movie",
"Thor - Love and Thunder",
"Tom Clancys Without Remorse",
"Top Gun - Maverick",
"Toy Story 4",
"Transformers - Rise of the Beasts",
"Turning Red",
"Uncharted",
"Venom- Let There Be Carnage",
"Violent Night",
"Weathering With You",
"Werewolf by Night",
"Wonder Woman - Bloodlines",
"Wrath of Man",
"Zack Snyders Justice League",

  ];

  // Function to perform search
  function performSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchTerm = searchInput.value.toLowerCase();

    // Clear previous search results
    searchResults.innerHTML = "";

    if (searchTerm.trim() === "") {
      // If the search input is empty, hide the search results
      searchResults.style.display = "none";
    } else {
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
  }

  // Function to display a list of items in the search results container
  function displayItemList(items, container) {
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = item;
      // Replace 'YOUR_LINK_BASE_URL' with your own link base URL
      link.href = `../movies/${encodeURIComponent(item)}.html`;
      li.appendChild(link);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  // Attach event listener to search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", performSearch);

  // Initially hide the search results
  const searchResults = document.getElementById("searchResults");
  searchResults.style.display = "none";
});
