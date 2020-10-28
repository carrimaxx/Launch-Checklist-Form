window.addEventListener("load", function () {
  // Variables
  const form = document.forms[0];
  const pilotName = document.querySelector("input[name=pilotName]");
  const copilotName = document.querySelector("input[name=copilotName]");
  const fuelLevel = document.querySelector("input[name=fuelLevel]");
  const cargoMass = document.querySelector("input[name=cargoMass]");
  const faultyItems = document.getElementById("faultyItems");
  const pilotStatus = document.getElementById("pilotStatus");
  const copilotStatus = document.getElementById("copilotStatus");
  const fuelStatus = document.getElementById("fuelStatus");
  const cargoStatus = document.getElementById("cargoStatus");
  const launchStatus = document.getElementById("launchStatus");
  const missionTarget = document.getElementById("missionTarget");

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };

  // Fetching Planetary Data (+ Bonus mission: randomize)
  fetch("https://handlers.education.launchcode.org/static/planets.json").then(
    function (response) {
      response.json().then(function (json) {
        let randomNum = Math.floor(Math.random() * json.length);

        missionTarget.innerHTML = `<h2>Mission Destination</h2>
        <ol>
           <li>Name: ${json[randomNum].name}</li>
           <li>Diameter: ${json[randomNum].diameter}</li>
           <li>Star: ${json[randomNum].star}</li>
           <li>Distance from Earth: ${json[randomNum].distance}</li>
           <li>Number of Moons: ${json[randomNum].moons}</li>
        </ol>
        <img src="${json[randomNum].image}">`;
      });
    }
  );

  // Form
  form.addEventListener("submit", function (event) {
    // Adding Validation
    if (
      pilotName.value.trim() === "" ||
      copilotName.value.trim() === "" ||
      fuelLevel.value.trim() === "" ||
      cargoMass.value.trim() === ""
    ) {
      alert("All fields are required!");
      event.preventDefault();
    } else {
      if (
        !isNaN(pilotName.value) ||
        !isNaN(copilotName.value) ||
        isNaN(fuelLevel.value) ||
        isNaN(cargoMass.value)
      ) {
        alert("Make sure to enter valid information for each field");
        event.preventDefault();
      } else {
        // Updating Shuttle Requirements
        event.preventDefault();
        pilotStatus.innerHTML = `Pilot ${pilotName.value.capitalize()} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilotName.value.capitalize()} is ready for launch`;
        faultyItems.style.visibility = "visible";

        // launchStatus functions
        function redStatus() {
          launchStatus.innerHTML = "Shuttle not ready for launch";
          launchStatus.style.color = "red";
        }
        function greenStatus() {
          cargoStatus.innerHTML = "Cargo mass low enough for launch";
          fuelStatus.innerHTML = "Fuel level high enough for launch";
          launchStatus.innerHTML = "Shuttle is ready for launch";
          launchStatus.style.color = "green";
        }

        if (
          Number(fuelLevel.value) < 10000 ||
          Number(cargoMass.value) > 10000
        ) {
          if (Number(fuelLevel.value) < 10000) {
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
          } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
          }

          if (Number(cargoMass.value) > 10000) {
            cargoStatus.innerHTML =
              "There is too much mass for the shuttle to take off";
          } else {
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
          }
          redStatus();
        } else {
          greenStatus();
        }
      }
    }
  });
});
