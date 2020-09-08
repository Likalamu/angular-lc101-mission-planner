window.addEventListener("load", function() {
   let button = document.getElementById("formSubmit");
   //let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");

   function updatingShuttleStatus(){
      if (fuelLevel.value < 10000 ){
         document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;

      }else if (fuelLevel.value > 10000 ){
         document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
      }

      if (cargoMass.value > 10000 ){
         document.getElementById("cargoStatus").innerHTML = `Cargo mass too high for launch`;

      }else if (cargoMass.value < 10000 ){
         document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
      }
      
      if ((fuelLevel.value < 10000 || cargoMass.value > 10000) && fuelLevel.value != "" && cargoMass.value != ""){
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";

         
      }else if((fuelLevel.value > 10000 || cargoMass.value < 10000) && fuelLevel.value != "" && cargoMass.value != ""){
         document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
         document.getElementById("launchStatus").style.color = "green";     
      }
   }

   function formValidation(){
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         //event.preventDefault();
      } else if (isNaN(pilotName.value) == false || isNaN(copilotName.value) == false || isNaN(fuelLevel.value) == true || isNaN(cargoMass.value) == true) {
         alert("Make sure to enter valid information for each field!");
         //event.preventDefault();
      } 
   }

   button.addEventListener("click", function(event) {
      event.preventDefault();
      formValidation();
      updatingShuttleStatus();
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready for Launch`;
      document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} is ready for Launch`;    
   
      console.log(launchStatus.innerHTML);
      console.log(pilotName.value)
      console.log(copilotName.value)
      console.log(fuelLevel.value)
      console.log(cargoMass.value)
   });
 });

// This block of code shows how to format the HTML once you fetch some planetary JSON!
fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
   response.json().then(function(json){
      function planetsTemplate(planets, index){
         return `
         <div id="missionTarget">
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planets.name}</li>
               <li>Diameter: ${planets.diameter}</li>
               <li>Star: ${planets.star}</li>
               <li>Distance from Earth: ${planets.distance}</li>
               <li>Number of Moons: ${planets.moons}</li>
            </ol>
            <img src="${planets.image}">
         </div>
         `
      }
      document.getElementById("missionTarget").innerHTML =`
      ${json.map(planetsTemplate).slice(3, 4).join('')}
      `
   });
});