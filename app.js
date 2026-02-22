document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".option").forEach(btn => {

    btn.addEventListener("click", () => {

      // Toggle simple
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

  // Obtener TODAS las opciones activas
  const activeOptions = Array.from(
    document.querySelectorAll(".option.active")
  ).map(btn => btn.dataset.value);

  const cleaned = [...base, ...activeOptions]
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
