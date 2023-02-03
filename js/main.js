const BASE_API = "https://restcountries.com/v3.1/all"

const elLoader = document.querySelector("[data-loader]")

// Loader
function loader(state) {
  if (state) {
    elLoader.classList.remove("hidden")
  } else {
    elLoader.classList.add("hidden")
  }
}