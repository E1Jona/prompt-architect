let selectedOptions = {};
function playSound() {
  const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");
  audio.volume = 0.1;
  audio.play();
}

document.querySelectorAll(".option").forEach(btn => {
  btn.addEventListener("click", () => {

    const group = btn.parentElement.dataset.group;

    // WEATHER → MULTI SELECT
    if (group === "weather") {

      btn.classList.toggle("active");

      if (!selectedOptions[group]) {
        selectedOptions[group] = [];
      }

      const value = btn.dataset.value;

      if (selectedOptions[group].includes(value)) {
        selectedOptions[group] =
          selectedOptions[group].filter(v => v !== value);
      } else {
        selectedOptions[group].push(value);
      }

      if (selectedOptions[group].length === 0) {
        delete selectedOptions[group];
      }

      updateTags();
      playSound();
      return;
    }

    // RESTO → SELECCIÓN ÚNICA CON TOGGLE

    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      delete selectedOptions[group];
      updateTags();
      return;
    }

    btn.parentElement.querySelectorAll(".option")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    selectedOptions[group] = btn.dataset.value;

    updateTags();
    playSound();
  });
});

function generatePrompt() {

  const base = [
    document.getElementById("subject").value,
    document.getElementById("action").value,
    document.getElementById("location").value
  ];

  const weatherChip = selectedOptions.weather;
const weatherCustom = document.getElementById("customWeather").value;

let weatherCombined = "";

if (weatherChip && weatherCustom) {
  weatherCombined = weatherChip + ", " + weatherCustom;
} else if (weatherChip) {
  weatherCombined = weatherChip;
} else if (weatherCustom) {
  weatherCombined = weatherCustom;
}

const modular = [
  weatherCombined,
  selectedOptions.style,
  selectedOptions.engine,
  selectedOptions.camera,
  selectedOptions.lens,
  selectedOptions.lighting,
  selectedOptions.mood,
  selectedOptions.resolution,
  selectedOptions.ratio
];

  const cleaned = [...base, ...modular]
    .filter(v => v && v.trim() !== "");

  let finalPrompt = cleaned.join(", ");

  const negative = document.getElementById("negative").value;

  if (negative.trim() !== "") {
    finalPrompt += ` --negative ${negative}`;
  }

  document.getElementById("result").value = finalPrompt;
}

function copyPrompt() {
  const result = document.getElementById("result");
  result.select();
  document.execCommand("copy");
  alert("Prompt copied.");
}





