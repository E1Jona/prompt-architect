document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".option").forEach(btn => {

    btn.addEventListener("click", () => {

      const group = btn.parentElement.dataset.group;

      // Si ya está activo → desmarcar
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        return;
      }

      // Quitar activos del mismo grupo
      document
        .querySelectorAll(`.options[data-group="${group}"] .option`)
        .forEach(b => b.classList.remove("active"));

      // Activar el actual
      btn.classList.add("active");

    });

  });

});
