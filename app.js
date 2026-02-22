function generatePrompt() {
  const input = document.getElementById("inputPrompt").value;

  if (!input.trim()) {
    alert("Please enter a description first.");
    return;
  }

  const optimized = `Ultra-detailed cinematic scene, ${input}, 8K resolution, dramatic lighting, hyper-realistic, sharp focus, professional composition`;

  document.getElementById("outputPrompt").value = optimized;
}
