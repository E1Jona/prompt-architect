document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".option").forEach(btn => {

    btn.addEventListener("click", () => {

      // Toggle multi-select
      btn.classList.toggle("active");

    });

  });

});

function generatePrompt() {

  const base = [
    document.getElementById("subject").value,
    document.getElementById("action").value,
    document.getElementById("location").value
  ];

  const activeOptions = Array.from(
    document.querySelectorAll(".option.active")
  ).map(btn => btn.dataset.value);

  const customWeather = document.getElementById("customWeather")?.value || "";

  const cleaned = [...base, ...activeOptions, customWeather]
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
