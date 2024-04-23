async function getAllShows() {
  const response = await fetch("https://api.tvmaze.com/shows");
  if (!response.ok) {
    throw new Error("Failed to fetch show data");
  }
  return await response.json();
}

async function setup() {
  try {
    const allShows = await getAllShows();
    state.allShows = allShows;
    makePageForShows(allShows);
  } catch (error) {
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = "<p>Error loading data. Please try again later.</p>";
    console.error("Error fetching data:", error);
  }
}

function makePageForShows(showList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = ""; // Clear existing content

  showList.forEach((show) => {
    const showDiv = document.createElement("div");
    showDiv.classList.add("show");

    const showTitle = document.createElement("h2");
    showTitle.textContent = show.name;
    const showImage = document.createElement("img");
    showImage.src = show.image.medium;
    showImage.alt = show.name;
    const showSummary = document.createElement("p");
    showSummary.innerHTML = show.summary;
    const showGenres = document.createElement("p");
    showGenres.textContent = `Genres: ${show.genres.join(", ")}`;
    const showStatus = document.createElement("p");
    showStatus.textContent = `Status: ${show.status}`;
    const showRating = document.createElement("p");
    showRating.textContent = `Rating: ${show.rating.average || 'N/A'}`;
    const showRuntime = document.createElement("p");
    showRuntime.textContent = `Runtime: ${show.runtime} minutes`;

    showDiv.appendChild(showTitle);
    showDiv.appendChild(showImage);
    showDiv.appendChild(showSummary);
    showDiv.appendChild(showGenres);
    showDiv.appendChild(showStatus);
    showDiv.appendChild(showRating);
    showDiv.appendChild(showRuntime);

    showDiv.addEventListener("click", () => {
      fetchAndDisplayEpisodes(show.id);
    });

    rootElem.appendChild(showDiv);
  });

  // Add attribution to TVMaze
  const attribution = document.createElement("p");
  attribution.innerHTML =
    'Data sourced from <a href="https://tvmaze.com/" target="_blank">TVMaze.com</a>';
  rootElem.appendChild(attribution);
}

async function fetchAndDisplayEpisodes(showId) {
  const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
  if (!response.ok) {
    throw new Error("Failed to fetch episode data");
  }
  const episodes = await response.json();
  state.currentShowId = showId;
  state.allEpisodes = episodes;
  hideShowsListing();
  makePageForEpisodes(episodes);
}

function hideShowsListing() {
  const rootElem = document.getElementById("root");
  rootElem.textContent = ""; // Clear existing content
}

function showShowsListing() {
  setup();
}

function searchShows(query) {
  const filteredShows = state.allShows.filter((show) => {
    const searchFields = [show.name, show.genres.join(" "), show.summary];
    return searchFields.some((field) => field.toLowerCase().includes(query.toLowerCase()));
  });
  makePageForShows(filteredShows);
}

// Other functions (render, navigateToEpisode, etc.) remain unchanged

const state = {
  allShows: [],
  allEpisodes: [],
  searchTerm: "",
  currentShowId: null
};

const input = document.querySelector("#q");

input.addEventListener("input", function () {
  state.searchTerm = input.value.toLowerCase();
  searchShows(state.searchTerm);
});

function navigateToShowListing() {
  showShowsListing();
}

window.onload = setup;
