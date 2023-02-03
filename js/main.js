const BASE_API = "https://restcountries.com/v3.1/all"

const elCountriesWrapper = document.querySelector("[data-countries-wrapper]")
const elCountryTemplate = document.querySelector("[data-country-template]")
const elLoader = document.querySelector("[data-loader]")

async function getData() {
  loader(true)
  const res = await fetch(BASE_API)
  const searchResult = await res.json()
  loader(false)

  renderCountries(searchResult)
}

getData()


function renderCountries(countries) {
  elCountriesWrapper.innerHTML = ""
  countries.forEach(country => {
    const elCountryCard = elCountryTemplate.content.cloneNode(true)
    const elCountryCardImg = elCountryCard.querySelector("[data-country-img]")

    elCountryCardImg.src = country.flags.png
    elCountryCardImg.alt = country.name.common
    elCountryCardImg.width = 264
    elCountryCardImg.height = 160
    elCountryCard.querySelector("[data-country-title]").textContent = country.name.common
    elCountryCard.querySelector("[data-country-population-text]").textContent = country.population
    elCountryCard.querySelector("[data-country-region-text]").textContent = country.region
    elCountryCard.querySelector("[data-country-capital-text]").textContent = country.capital

    elCountriesWrapper.appendChild(elCountryCard)
  });
}


// Loader
function loader(state) {
  if (state) {
    elLoader.classList.remove("hidden")
  } else {
    elLoader.classList.add("hidden")
  }
}