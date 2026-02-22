// Expand / Collapse modules
document.querySelectorAll(".module-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.style.display = content.style.display === "flex" ? "none" : "flex";
  });
});

// Clean builder
function generatePrompt() {

  const values = [
    document.getElementById("subject").value,
    document.getElementById("action").value,
    document.getElementById("location").value,
    document.getElementById("style").value,
    document.getElementById("engine").value,
    document.getElementById("camera").value,
    document.getElementById("lens").value,
    document.getElementById("lighting").value,
    document.getElementById("mood").value,
    document.getElementById("resolution").value,
    document.getElementById("ratio").value
  ];

  // Remove empty values
  const cleaned = values.filter(v => v && v.trim() !== "");

  let finalPrompt = cleaned.join(", ");

  const negative = document.getElementById("negative").value;

  if (negative.trim() !== "") {
    finalPrompt += ` --negative ${negative}`;
  }

  document.getElementById("result").value = finalPrompt;
}

// Copy
function copyPrompt() {
  const result = document.getElementById("result");
  result.select();
  document.execCommand("copy");
  alert("Prompt copied to clipboard.");
}
