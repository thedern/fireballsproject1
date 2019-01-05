$(document).ready(function() {

    // Tatooine is selected on the dropdown by default
    var selectedPlanet = "tatooine";
    var planetPopulation;

    // When the selection on the dropdown changes...
    $("select.planet-selection").change(function(){
        // Store the value of the selected planet into a variable
        selectedPlanet = $(this).children("option:selected").val();
    });

    function generatePopulationGraphic(pop) {

        $(".population-graphic").empty();

        if (selectedPlanet === "alderaan") {
            $("#1000000000-population").append("<img src=\"images/populationdead.png\" style=\"height: 30px; width: 30px;\">");
            $("#1000000000-population").append("<img src=\"images/populationdead.png\" style=\"height: 30px; width: 30x;\">");
        } else if (pop === "unknown") {
            $("#unknown-population").append("<img src=\"images/populationunknown.png\" style=\"height: 50px; width: 50px;\">");
        } else {
            for (i = 100000000000; i >= 100; i /= 10) {
                if (pop / i >= 1) {
                    var numberOfIcons = pop / i;
                    for (j = 1; j <= numberOfIcons; j++) {
                        $("#" + i + "-population").append("<img src=\"images/population" + i + ".png\" style=\"height: 25px; width: 25px;\">");
                    }
                    pop = pop % i;
                }
            }
        }
    }

    // Returns string with first letter upper case, used for terrain and climate fields
    function upperCaseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // displayPlanetInfo function re-renders the HTML to display the appropriate content
    function displayChosenPlanetInfo() {

        $("#submit-btn").attr("data-name", selectedPlanet);

        var planet = $(this).attr("data-name");
        var queryURL = "https://swapi.co/api/planets/?search=" + planet;

        // Creates an AJAX call for the specific planet being chosen
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            // var name = response.name;
            planetPopulation = response.results[0].population;

            $("#planet-name").text("Name: " + response.results[0].name);
            $("#planet-terrain").text("Terrain: " + upperCaseFirst(response.results[0].terrain));
            $("#planet-climate").text("Climate: " + upperCaseFirst(response.results[0].climate));
            // toString().replace... method puts commas in the numbers
            $("#planet-population").text("Population: " + response.results[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            if (selectedPlanet === "alderaan") {
                $("#planet-population").append("...before the planet was blown up :(");
            }
            
            $("#planet-img").attr("src", "images/" + selectedPlanet + ".png");

            generatePopulationGraphic(planetPopulation);
        });

    }

    function displayRandomPlanetInfo() {

        var random = Math.floor(Math.random() * (61 - 1)) + 1;

        // var planet = $(this).attr("data-name");
        var queryURL = "https://swapi.co/api/planets/" + random;
        console.log(queryURL);

        // Creating an AJAX call for the planet chosen at random
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            // var name = response.name;
            planetPopulation = response.population;

            $("#planet-name").text("Name: " + response.name);
            $("#planet-terrain").text("Terrain: " + upperCaseFirst(response.terrain));
            $("#planet-climate").text("Climate: " + response.climate);
            // toString().replace... method puts commas in the numbers
            $("#planet-population").text("Population: " + response.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            if (selectedPlanet === "alderaan") {
                $("#planet-population").append("...before the planet was blown up :(");
            }

            $("#planet-img").attr("src", "images/" + response.name + ".png");

            generatePopulationGraphic(planetPopulation);
        });

    }

    $(document).on("click", "#submit-btn", displayChosenPlanetInfo);
    $(document).on("click", "#random-btn", displayRandomPlanetInfo);

});