const elModeToggler = document.querySelector("[data-mode-toggler]")




elModeToggler.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode")

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("mode", "dark")
  } else {
    localStorage.setItem("mode", "light")
  }
})

if (localStorage.getItem("mode") === "light" && document.body.classList.contains("dark-mode")) {
  document.body.classList.remove("dark-mode")
}

if (localStorage.getItem("mode") === "dark" && !document.body.classList.contains("dark-mode")) {
  document.body.classList.add("dark-mode")
}
