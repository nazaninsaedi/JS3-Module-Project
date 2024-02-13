function setup() {
  const allEpisodes = getAllEpisodes();
  state.allEpisodes = allEpisodes;
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = ""; // Clear existing content

  episodeList.forEach((episode) => {
    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode");

    const episodeTitle = document.createElement("h2");
    const episodeCode = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    episodeTitle.textContent = `${episode.name} - ${episodeCode}`;
    const seasonNumber = document.createElement("p");
    const episodeNumber = document.createElement("p");
    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.alt = episode.name;
    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    const episodeOption = document.createElement("option");
    episodeOption.value = episode.id;
    episodeOption.text = `${episodeCode} - ${episode.name}`;
    dropDownMenu.appendChild(episodeOption);
    episodeDiv.id = `episode - ${episode.id}`;

    episodeDiv.appendChild(episodeTitle);
    episodeDiv.appendChild(seasonNumber);
    episodeDiv.appendChild(episodeNumber);
    episodeDiv.appendChild(episodeImage);
    episodeDiv.appendChild(episodeSummary);

    rootElem.appendChild(episodeDiv);
  });

  // Add attribution to TVMaze
  const attribution = document.createElement("p");
  attribution.innerHTML =
    'Data sourced from <a href="https://tvmaze.com/" target="_blank">TVMaze.com</a>';
  rootElem.appendChild(attribution);
}

// level 200 

const state = {
  allEpisodes: [],
  searchTerm: ""
};

function render() {
  const filteredEpisodes = state.allEpisodes.filter(function (episode) {
    return episode.name.toLowerCase().includes(state.searchTerm.toLowerCase()) || episode.summary.toLowerCase().includes(state.searchTerm.toLowerCase());
  });

  makePageForEpisodes(filteredEpisodes);

  document.getElementById("search-info").textContent = `Displaying ${filteredEpisodes.length} / 73 episodes`;
};

const input = document.querySelector("#q");

input.addEventListener("input", function () {
  state.searchTerm = input.value.toLowerCase();
  render();
});

const dropDownMenu = document.getElementById("select");
dropDownMenu.addEventListener("change", function () {
  const selectedValue = dropDownMenu.value;

  if (selectedValue === "all") {
    render(state.allEpisodes);
  }
  else {
    const selectedEpisode = state.allEpisodes.find((episode) => episode.id === parseInt(selectedValue));
    render([selectedEpisode]);
    navigateToEpisode(selectedEpisode);
  }
});

function navigateToEpisode(episode) {
  if (episode) {
    const episodeElement = document.getElementById(`episode - ${episode.id}`);

    if (episodeElement) {
      episodeElement.scrollIntoView({behavior: "smooth"});
    }
  }
}

window.onload = setup;

