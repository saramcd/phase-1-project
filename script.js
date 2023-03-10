document.addEventListener("DOMContentLoaded", () => {
  const breweryForm = document.getElementById("brewery-form");
  breweryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchFormInput = document.querySelector("input#search").value;
    getBreweries(searchFormInput);
  });

  const getBreweries = (state) => {
    // Clear results from the prior search
    const breweryElement = document.getElementById("breweries-list");
    breweryElement.innerHTML = "";
    const breweryInfoElement = document.getElementById("brewery-info");
    breweryInfoElement.innerHTML = "";
    // Fetch brewery data by state
    fetch(
      `https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=200`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.length) {
          // Alert the user if no breweries found for the state entered
          alert(
            `No breweries found for ${state}! Please enter one of the 50 states within the USA.`
          );
        } else {
          // Populate HTML with requested state brewery data;
          const stateHeader = document.createElement("h3");
          stateHeader.innerText = `Breweries in ${state}:`;

          breweryElement.append(stateHeader);
          // Create a List Item for each brewery name
          data.forEach((brewery) => {
            const li = document.createElement("li");
            li.innerText = brewery.name;
            li.setAttribute("id", brewery.id);
            breweryElement.appendChild(li);
            // Add a click event listener to each brewery
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
            // Add a mouseover and mouseout event listeners to each brewery to change color to blue
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
