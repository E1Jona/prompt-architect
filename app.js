let selectedOptions = {};

document.querySelectorAll(".option").forEach(btn => {
  btn.addEventListener("click", () => {
    const group = btn.parentElement.dataset.group;

    // Si ya está activa → desactivar
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      delete selectedOptions[group];
      return;
    }

    // Si no está activa → activar y desactivar otras del mismo grupo
    btn.parentElement.querySelectorAll(".option")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    selectedOptions[group] = btn.dataset.value;
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



