// *********** Initialize Variables ****************
//************************************************** 

// Get references to the input field and button
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");

// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Console.log the ufo data from data.js
var dataFilter = 0;
ufos = data
console.log(data);

// Use d3 to create a bootstrap striped table
var table = d3.select("table");


// ******************** Step 1 ************************
// ****** Print the whole table for sightings *********
// ****************************************************

// Use d3 to update each cell's text with alien report 
data.forEach((ufoSighting) => {		
	var row = tbody.append("tr");
    Object.entries(ufoSighting).forEach(([key, value]) => {
	  	console.log(key, value);
		var cell = row.append("td");
     	cell.text(value);
	});	
});

// ***************** Step 2 *******************
// ******* Submit button to filter table *****
// *******************************************

// Enable filter button
var submit = d3.select("#filter-btn");

submit.on("click", function() {
	var filteredData = tableData;
	tbody.html("");
	d3.event.preventDefault();	
	
	// look at index.html to initialize variables
    var date = d3.select("#datetime").property("value");
	var city = d3.select("#city").property("value");
	var state = d3.select("#state").property("value");
	var country = d3.select("#country").property("value");
	var shape = d3.select("#shape").property("value");

	// Checking for input data to start filtering
	if (date){filteredData = filteredData.filter(data => data.datetime === date)};
	if (city){filteredData = filteredData.filter(data => data.city === city)};
	if (state){filteredData = filteredData.filter(data => data.state === state)};
	if (country){filteredData = filteredData.filter(data => data.country === country)};
	if (shape){filteredData = filteredData.filter(data => data.shape === shape)};
	// call fuction buildTable to print table
	buildTable(filteredData);
});

// Build table after filtering
function buildTable(filteredData) {
	filteredData.forEach((data) => {
		var row = tbody.append("tr");
		Object.entries(data).forEach(([key, value]) => {
			console.log(key, value);
			var cell = row.append("td");
			cell.text(value);
		});
	});
};
