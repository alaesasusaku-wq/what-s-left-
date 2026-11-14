
const artifacts = [
  {
    id: "retroreflector",
    name: "Lunar Laser Ranging Retroreflector",
    mission: "Apollo 11",
    year: "1969",
    status: "Passive scientific experiment",
    model: "models/left.glb",
    description:
      "An array of corner-cube prisms deployed on the Moon during Apollo 11.",
    facts: [
      "Deployed in July 1969.",
      "Reflects laser pulses sent from Earth.",
      "Helps scientists measure the Earth-Moon distance.",
      "Requires no electricity."
    ],
    source: "NASA"
  },
  {
    id: "moon",
    name: "The Moon",
    mission: "Lunar Environment",
    year: "Present",
    status: "Environment model",
    model: "models/moon.glb",
    description:
      "Explore the lunar surface and the environment where these historic objects remain.",
    facts: [
      "Earth's only natural satellite.",
      "Home to several Apollo landing sites.",
      "Preserves evidence of human exploration."
    ],
    source: "NASA"
  },
  {
    id: "astronaut",
    name: "Apollo Astronaut",
    mission: "Human Lunar Exploration",
    year: "1969–1972",
    status: "Historical exhibit",
    model: "models/Astronaut.glb",
    description:
      "A representation of the astronauts who explored the lunar surface.",
    facts: [
      "Apollo astronauts explored the Moon.",
      "They deployed scientific experiments.",
      "Their missions transformed lunar science."
    ],
    source: "NASA"
  },
  {
    id: "friendship",
    name: "Friendship 7",
    mission: "Mercury-Atlas 6",
    year: "1962",
    status: "Historical context",
    model: "models/Atlas 6 (Friendship 7).glb",
    description:
      "A spacecraft from John Glenn's historic orbital mission. This is a contextual exhibit, not lunar equipment.",
    facts: [
      "Launched in February 1962.",
      "Completed three Earth orbits.",
      "Part of the Mercury program."
    ],
    source: "NASA"
  }
];

// HTML elements
const list = document.getElementById("list");
const viewer = document.getElementById("mv");
const slot = document.getElementById("slot");
const tag = document.getElementById("tag");
const name = document.getElementById("name");
const facts = document.getElementById("facts");
const source = document.getElementById("src");

let selected = 0;

// Display artifact information
function selectArtifact(index) {
  selected = index;

  const artifact = artifacts[index];

  // Update selected button
  document.querySelectorAll(".artifact-btn").forEach((button, i) => {
    button.classList.toggle("active", i === index);
  });

  name.textContent = artifact.name;
  tag.textContent = artifact.status;

  // Update description and facts
  facts.innerHTML = "";

  const description = document.createElement("p");
  description.textContent = artifact.description;
  facts.appendChild(description);

  artifact.facts.forEach(fact => {
    const item = document.createElement("p");
    item.textContent = "• " + fact;
    facts.appendChild(item);
  });

  source.textContent =
    `MISSION: ${artifact.mission} | ${artifact.year} | SOURCE: ${artifact.source}`;

  loadModel(artifact);
}

// Load 3D model
function loadModel(artifact) {
  viewer.removeAttribute("src");

  if (!artifact.model) {
    slot.textContent = "3D RECONSTRUCTION COMING SOON";
    return;
  }

  slot.textContent = "LOADING 3D MODEL...";

  viewer.addEventListener("load", () => {
    slot.textContent = "";
  }, { once: true });

  viewer.addEventListener("error", (event) => {
    slot.textContent = "MODEL COULD NOT BE LOADED";
    console.error("3D model error:", event);
  }, { once: true });

  viewer.src = artifact.model;
}

// Create artifact navigation
function createList() {
  list.innerHTML = "";

  artifacts.forEach((artifact, index) => {
    const button = document.createElement("button");

    button.className = "artifact-btn";
    button.textContent = artifact.name;

    button.addEventListener("click", () => {
      selectArtifact(index);
    });

    list.appendChild(button);
  });
}

// Start museum
createList();
selectArtifact(selected);

