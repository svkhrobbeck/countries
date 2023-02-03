const BASE_COUNTRY_API = "https://restcountries.com/v3.1/name/"
const BASE_COUNTRY_CODE_API = "https://restcountries.com/v3.1/alpha?codes="

const elCountryInfoWrapper = document.querySelector("[data-country-info]")
const elCountryInfoTemplate = document.querySelector("[data-country-info-template]")
const CountryName = new URLSearchParams(window.location.search).get("country")

async function getCountryData(name) {
  loader(true)
  const res = await fetch(BASE_COUNTRY_API + name)
  const searchResult = await res.json()

  loader(false)

  renderCountryInfo(searchResult)
}

getCountryData(CountryName)
elCountryInfoWrapper.innerHTML = ""

// Render country info
function renderCountryInfo(countries) {
  html = ""
  countries.forEach(country => {
    const elCountryInfoCard = elCountryInfoTemplate.content.cloneNode(true)
    const elCountryInfoCardImg = elCountryInfoCard.querySelector("[data-country-info-img]")
    const elBorderCountries = elCountryInfoCard.querySelector("[data-border-countries]")

    document.title = country.name.common
    elCountryInfoCardImg.src = country.flags.png
    elCountryInfoCardImg.alt = country.name.common
    elCountryInfoCard.querySelector("[data-country-info-title]").textContent = country.name.common
    elCountryInfoCard.querySelector("[data-country-info-native-name]").textContent = country.altSpellings[1]
    elCountryInfoCard.querySelector("[data-country-info-population-text]").textContent = country.population
    elCountryInfoCard.querySelector("[data-country-info-region-text]").textContent = country.region
    elCountryInfoCard.querySelector("[data-country-info-subregion-text]").textContent = country.subregion
    elCountryInfoCard.querySelector("[data-country-info-capital-text]").textContent = country.capital
    elCountryInfoCard.querySelector("[data-country-info-domain]").textContent = country.tld
    // elCountryInfoCard.querySelector("[data-country-info-currencies-text]").textContent = country.currencies
    // elCountryInfoCard.querySelector("[data-country-info-languages-text]").textContent = country.languages

    // (country.borders).forEach(border => {
    //   html += `<a class="country-info__border-countries-link" href="${}"
    //   >Netherlands</a
    // >`
    // })
    console.log(country);

    elCountryInfoWrapper.appendChild(elCountryInfoCard)
  });

}