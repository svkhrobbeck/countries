const elCountriesWrapper = document.querySelector("[data-countries-wrapper]");
const elCountryTemplate = document.querySelector("[data-country-template]");
const elSearchForm = document.querySelector("[data-search-filter-form]");

const API_NAME_SEARCH = "https://restcountries.com/v3.1/name/";

// get Data
async function getData() {
  loader(true);
  const res = await fetch(BASE_API);
  const searchResult = await res.json();
  loader(false);
  renderCountries(searchResult);
  countrySearch(searchResult);
  countryFilter(searchResult);
}
getData();

// Search
function countrySearch(countries) {
  let filteredCountries;
  elSearchForm.search.addEventListener("input", () => {
    filteredCountries = countries.filter((item) =>
      item.name.common
        .toLowerCase()
        .includes(elSearchForm.search.value.toLowerCase())
    );
    renderCountries(filteredCountries);
  });
}

// filter
function countryFilter(countries) {
  let sortedCountries;
  elSearchForm.filter.addEventListener("change", () => {
    if (elSearchForm.filter.value === "Filter by Region") {
      sortedCountries = [...countries];
    } else {
      sortedCountries = countries.filter(
        (item) =>
          item.region.toLowerCase() === elSearchForm.filter.value.toLowerCase()
      );
    }
    renderCountries(sortedCountries);
  });
}

// Render Countries
function renderCountries(countries) {
  elCountriesWrapper.innerHTML = "";
  countries.forEach((country) => {
    const population = country.population;

    const elCountryCard = elCountryTemplate.content.cloneNode(true);
    const elCountryCardImg = elCountryCard.querySelector("[data-country-img]");

    elCountryCardImg.src = country.flags.png;
    elCountryCardImg.alt = country.name.common;
    elCountryCardImg.width = 264;
    elCountryCardImg.height = 160;
    elCountryCard.querySelector("[data-country-title]").textContent =
      country.name.common;
    elCountryCard.querySelector("[data-country-population-text]").textContent =
      population.toLocaleString("uz");
    elCountryCard.querySelector("[data-country-region-text]").textContent =
      country.region;
    elCountryCard.querySelector("[data-country-capital-text]").textContent =
      country.capital;
    elCountryCard.querySelector(
      "[data-country-link]"
    ).href = `country.html?country=${country.name.common}`;

    elCountriesWrapper.appendChild(elCountryCard);
  });

  if (countries.length === 0) {
    const el = `<p class="alert-text">Countries Not Found!</p>`;

    elCountriesWrapper.innerHTML = el;
  } else return;
}
