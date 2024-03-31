// // Global variables to store fetched shows and episodes to avoid re-fetching
// let fetchedShows = [];
// let fetchedEpisodes = {};

// async function getAllShows() {
//   const response = await fetch("https://api.tvmaze.com/shows");
//   if (!response.ok) {
//     throw new Error("Failed to fetch show data");
//   }
//   const shows = await response.json();
//   fetchedShows = shows;
//   return shows;
// }

// async function getAllEpisodes(showId) {
//   if (!fetchedEpisodes[showId]) {
//     const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch episode data");
//     }
//     const episodes = await response.json();
//     fetchedEpisodes[showId] = episodes;
//   }
//   return fetchedEpisodes[showId];
// }

// async function setup() {
//   try {
//     // Fetch list of available shows from TVmaze API
//     const shows = await getAllShows();

//     // Populate the select element with show options
//     const selectElement = document.getElementById("show-select");
//     shows.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'accent' }));
//     shows.forEach((show) => {
//       const option = document.createElement("option");
//       option.value = show.id;
//       option.textContent = show.name;
//       selectElement.appendChild(option);
//     });

//     // Call render function with initial episode data
//     render();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Handle error fetching data
//     const rootElem = document.getElementById("root");
//     rootElem.innerHTML = "<p>Error loading data. Please try again later.</p>";
//   }
// }

// function render() {
//   const selectedShowId = document.getElementById("show-select").value;
//   if (!selectedShowId) return; // No show selected

//   const searchTerm = document.getElementById("q").value.toLowerCase();
//   const filteredEpisodes = fetchedEpisodes[selectedShowId]?.filter((episode) =>
//     episode.name.toLowerCase().includes(searchTerm) ||
//     episode.summary.toLowerCase().includes(searchTerm)
//   );

//   makePageForEpisodes(filteredEpisodes);

//   const searchInfo = document.getElementById("search-info");
//   searchInfo.textContent = `Displaying ${filteredEpisodes?.length ?? 0} episodes`;
// }

// // Event listener for when the user selects a show
// document.getElementById("show-select").addEventListener("change", async function () {
//   const selectedShowId = this.value;
//   if (selectedShowId) {
//     try {
//       // Fetch episodes for the selected show if not already fetched
//       await getAllEpisodes(selectedShowId);
//       // Call render function with new episode data
//       render();
//     } catch (error) {
//       console.error("Error fetching episode data:", error);
//       // Handle error fetching episode data
//       const rootElem = document.getElementById("root");
//       rootElem.innerHTML = "<p>Error loading data. Please try again later.</p>";
//     }
//   }
// });

// // Event listener for search input
// document.getElementById("q").addEventListener("input", function () {
//   render();
// });

// // Helper function to create and append HTML elements for each episode
// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = ""; // Clear existing content

//   if (!episodeList || episodeList.length === 0) {
//     const noResults = document.createElement("p");
//     noResults.textContent = "No episodes found.";
//     rootElem.appendChild(noResults);
//     return;
//   }

//   episodeList.forEach((episode) => {
//     const episodeDiv = document.createElement("div");
//     episodeDiv.classList.add("episode");

//     const episodeTitle = document.createElement("h2");
//     const episodeCode = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
//     episodeTitle.textContent = `${episode.name} - ${episodeCode}`;
//     const seasonNumber = document.createElement("p");
//     seasonNumber.textContent = `Season: ${episode.season}`;
//     const episodeNumber = document.createElement("p");
//     episodeNumber.textContent = `Episode: ${episode.number}`;
//     const episodeImage = document.createElement("img");
//     episodeImage.src = episode.image?.medium ?? "https://via.placeholder.com/210x295";
//     episodeImage.alt = episode.name;
//     const episodeSummary = document.createElement("p");
//     episodeSummary.innerHTML = episode.summary ?? "No summary available.";

//     episodeDiv.appendChild(episodeTitle);
//     episodeDiv.appendChild(seasonNumber);
//     episodeDiv.appendChild(episodeNumber);
//     episodeDiv.appendChild(episodeImage);
//     episodeDiv.appendChild(episodeSummary);

//     rootElem.appendChild(episodeDiv);
//   });

//   // Add attribution to TVMaze
//   const attribution = document.createElement("p");
//   attribution.innerHTML = 'Data sourced from <a href="https://tvmaze.com/" target="_blank">TVMaze.com</a>';
//   rootElem.appendChild(attribution);
// }

// // Call setup function when the page loads
// window.onload = setup;
// Global variables to store fetched shows and episodes to avoid re-fetching
let fetchedShows = [];
let fetchedEpisodes = {};

async function getAllShows() {
  const response = await fetch("https://api.tvmaze.com/shows");
  if (!response.ok) {
    throw new Error("Failed to fetch show data");
  }
  const shows = await response.json();
  fetchedShows = shows;
  return shows;
}

async function getAllEpisodes(showId) {
  if (!fetchedEpisodes[showId]) {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
    if (!response.ok) {
      throw new Error("Failed to fetch episode data");
    }
    const episodes = await response.json();
    fetchedEpisodes[showId] = episodes;
  }
  return fetchedEpisodes[showId];
}

async function setup() {
  try {
    // Fetch list of available shows from TVmaze API
    const shows = await getAllShows();

    // Populate the select element with show options
    const selectElement = document.getElementById("show-select");
    shows.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'accent' }));
    shows.forEach((show) => {
      const option = document.createElement("option");
      option.value = show.id;
      option.textContent = show.name;
      selectElement.appendChild(option);
    });

    // Call render function with initial episode data
    render();
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error fetching data
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = "<p>Error loading data. Please try again later.</p>";
  }
}

function render() {
  const selectedShowId = document.getElementById("show-select").value;
  if (!selectedShowId) return; // No show selected

  const searchTerm = document.getElementById("q").value.toLowerCase();
  const filteredEpisodes = fetchedEpisodes[selectedShowId]?.filter((episode) =>
    episode.name.toLowerCase().includes(searchTerm) ||
    episode.summary.toLowerCase().includes(searchTerm)
  );

  makePageForEpisodes(filteredEpisodes);

  const searchInfo = document.getElementById("search-info");
  searchInfo.textContent = `Displaying ${filteredEpisodes?.length ?? 0} episodes`;
}

// Event listener for when the user selects a show
document.getElementById("show-select").addEventListener("change", async function () {
  const selectedShowId = this.value;
  if (selectedShowId) {
    try {
      // Fetch episodes for the selected show if not already fetched
      await getAllEpisodes(selectedShowId);
      // Call render function with new episode data
      render();
    } catch (error) {
      console.error("Error fetching episode data:", error);
      // Handle error fetching episode data
      const rootElem = document.getElementById("root");
      rootElem.innerHTML = "<p>Error loading data. Please try again later.</p>";
    }
  }
});

// Event listener for search input
document.getElementById("q").addEventListener("input", function () {
  render();
});

// Helper function to create and append HTML elements for each episode
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = ""; // Clear existing content

  if (!episodeList || episodeList.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No episodes found.";
    rootElem.appendChild(noResults);
    return;
  }

  episodeList.forEach((episode) => {
    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode");

    const episodeTitle = document.createElement("h2");
    const episodeCode = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    episodeTitle.textContent = `${episode.name} - ${episodeCode}`;
    const seasonNumber = document.createElement("p");
    seasonNumber.textContent = `Season: ${episode.season}`;
    const episodeNumber = document.createElement("p");
    episodeNumber.textContent = `Episode: ${episode.number}`;
    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image?.medium ?? "https://via.placeholder.com/210x295";
    episodeImage.alt = episode.name;
    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary ?? "No summary available.";

    episodeDiv.appendChild(episodeTitle);
    episodeDiv.appendChild(seasonNumber);
    episodeDiv.appendChild(episodeNumber);
    episodeDiv.appendChild(episodeImage);
    episodeDiv.appendChild(episodeSummary);

    rootElem.appendChild(episodeDiv);
  });

  // Add attribution to TVMaze
  const attribution = document.createElement("p");
  attribution.innerHTML = 'Data sourced from <a href="https://tvmaze.com/" target="_blank">TVMaze.com</a>';
  rootElem.appendChild(attribution);
}

// Call setup function when the page loads
window.onload = setup;
