const elModeToggler = document.querySelector("[data-mode-toggler]");
const { body } = document;

elModeToggler.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) localStorage.setItem("mode", "dark");
  else localStorage.setItem("mode", "light");
});

if (localStorage.getItem("mode") === "light" && body.classList.contains("dark-mode")) {
  body.classList.remove("dark-mode");
} else if (localStorage.getItem("mode") === "dark" && !body.classList.contains("dark-mode")) {
  body.classList.add("dark-mode");
}
