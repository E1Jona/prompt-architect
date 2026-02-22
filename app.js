let selectedOptions = {};

// Expand modules
document.querySelectorAll(".module-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.style.display = content.style.display === "flex" ? "none" : "flex";
  });
});

// Option selection
document.querySelectorAll(".option").forEach(btn => {
  btn.addEventListener("click", () => {
    const group = btn.parentElement.dataset.group;

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

  const modular = [
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
