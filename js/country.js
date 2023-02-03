const BASE_COUNTRY_API = "https://restcountries.com/v3.1/name/"

const elCountryInfoTemplate = document.querySelector("[data-country-info-template]")
const CountryName = new URLSearchParams(window.location.search).get("country")

async function getCountryData(name) {
  const res = await fetch(BASE_COUNTRY_API + name)
  const searchResult = res.json()
}

getCountryData(CountryName)

// Render country info
function renderCountryInfo(country) {
  const elCountryInfoCard = elCountryInfoTemplate.content.cloneNode(true)
  const elCountryInfoCardImg = elCountryInfoCard.querySelector("[data-country-img]")

  elCountryInfoCardImg.src = country.flags.png
}