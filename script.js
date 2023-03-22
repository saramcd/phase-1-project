document.addEventListener("DOMContentLoaded", () => {
  const breweryForm = document.getElementById("brewery-form");
  breweryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchFormInput = document.querySelector("input#search").value;
    getBreweries(searchFormInput);
  });

  const getBreweries = (state) => {
    const breweryElement = document.getElementById("breweries-list");
    breweryElement.innerHTML = "";
    const breweryInfoElement = document.getElementById("brewery-info");
    breweryInfoElement.innerHTML = "";
    fetch(
      `https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=200`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.length) {
          alert(
            `No breweries found for ${state}! Please enter one of the 50 states within the USA.`
          );
        } else {
          const stateHeader = document.createElement("h3");
          stateHeader.innerText = `Breweries in ${state}:`;

          breweryElement.append(stateHeader);
          data.forEach((brewery) => {
            const li = document.createElement("li");
            li.innerText = brewery.name;
            li.setAttribute("id", brewery.id);
            breweryElement.appendChild(li);
            li.addEventListener("click", (event) => {
              const breweryClicked = event.target.innerText;
              const breweryData = data.filter(function (brewery) {
                return brewery.name == breweryClicked;
              });
              const h2 = document.createElement("h2");
              breweryInfoElement.append(h2);
              h2.innerText = breweryClicked;
              const breweryDataObj = breweryData[0];
              const attributesList = ["brewery_type", "city", "street"];
              for (const attr in breweryDataObj) {
                const breweryInfoLi = document.createElement("li");
                if (attributesList.includes(attr)) {
                  breweryInfoLi.innerText = `${attr}: ${breweryDataObj[attr]}`;
                  breweryInfoElement.appendChild(breweryInfoLi);
                }
              }
            });
            li.addEventListener("mouseover", (event) => {
              event.target.style.color = "blue";
            });
            li.addEventListener("mouseout", (event) => {
              event.target.style.color = "";
            });
          });
        }
      });
  };
});
