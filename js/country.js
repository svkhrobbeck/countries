const BASE_COUNTRY_API = "https://restcountries.com/v3.1/";

const elCountryInfoWrapper = document.querySelector("[data-country-info]");
const elCountryInfoTemplate = document.querySelector("[data-country-info-template]");

const params = new URLSearchParams(location.search);
const CountryName = params.get("country");

const getCountryData = async name => {
  loader(true);
  const res = await fetch(BASE_COUNTRY_API + name);
  const searchResult = await res.json();
  loader(false);

  renderCountryInfo(searchResult);
};

getCountryData(CountryName);
elCountryInfoWrapper.innerHTML = "";

// Render country info
const renderCountryInfo = countries => {
  countries.forEach(country => {
    console.log(country.name.common);
    const population = country.population;

    const objLang = country.languages;
    const objCurr = country.currencies;

    const itemLang = Object.values(objLang).join(", ");
    const itemCurr = Object.values(objCurr);

    // Els
    const elCountryInfoCard = elCountryInfoTemplate.content.cloneNode(true);
    const elCountryInfoCardImg = elCountryInfoCard.querySelector("[data-country-info-img]");
    const elBorderCountries = elCountryInfoCard.querySelector("[data-border-countries]");

    document.title = country.name.common;
    elCountryInfoCardImg.src = country.flags.png;
    elCountryInfoCardImg.alt = country.name.common;
    elCountryInfoCard.querySelector("[data-country-info-title]").textContent = country.name.common;
    elCountryInfoCard.querySelector("[data-country-info-native-name]").textContent = country.altSpellings[1];
    elCountryInfoCard.querySelector("[data-country-info-population-text]").textContent = population.toLocaleString("en");
    elCountryInfoCard.querySelector("[data-country-info-region-text]").textContent = country.region;
    elCountryInfoCard.querySelector("[data-country-info-subregion-text]").textContent = country.subregion;
    elCountryInfoCard.querySelector("[data-country-info-capital-text]").textContent = country.capital;
    elCountryInfoCard.querySelector("[data-country-info-domain]").textContent = country.tld;
    elCountryInfoCard.querySelector("[data-country-info-currencies-text]").textContent = itemCurr[0].name;
    elCountryInfoCard.querySelector("[data-country-info-languages-text]").textContent = itemLang;

    if (country.borders) {
      country.borders.forEach(item => {
        if (item)
          elBorderCountries.innerHTML += `
          <a href="country.html?country=alpha/${item}" class="country-info__border-countries-link">
            ${item}
          </a>
          `;
      });
    } else elBorderCountries.innerHTML = "No Borders";

    elCountryInfoWrapper.appendChild(elCountryInfoCard);
  });
};
