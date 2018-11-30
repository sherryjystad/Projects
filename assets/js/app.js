// =================================================================
// Initiaize Parameters
// =================================================================
  
 // set the svg size
const svgWidth = 960;
const svgHeight = 500;

// set the margins
const margin = {
   top: 25,
   right: 50,
   bottom: 120,
   left: 190
};

// calculate the plot area dimensions
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

//Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
const svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

let chosenXAxis = "poverty"
let chosenYAxis = "healthcare";

// =================================================================
// function used for updating x-scale const upon click on axis label
// =================================================================
function xScale(usa_data, chosenXAxis) {

  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(usa_data, d => d[chosenXAxis]) * 0.9,
      d3.max(usa_data, d => d[chosenXAxis]) * 1.0
    ])
    .range([0, width]);
  return xLinearScale;
}

// =================================================================
// function used for updating y-scale const upon click on axis label
// =================================================================
function yScale(usa_data, chosenYAxis) {

  var yLinearScale = d3.scaleLinear()
    .domain([0,d3.max(usa_data, d => d[chosenYAxis]) * 1.2])
    .range([height, 0]);
  return yLinearScale;
}

// =================================================================
// function used for updating xAxis const upon click on axis label
// =================================================================
function renderXAxis(newXScale, xAxis) {

  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// =================================================================
// function used for updating yAxis const upon click on axis label
// =================================================================
function renderYAxis(newYScale, yAxis) {
  
  var leftAxis= d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// =================================================================
// function used for updating circles group with a transition to new circles
// =================================================================
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
  return circlesGroup;
}

// =================================================================
// function used for updating circles group with a transition to new circles
// =================================================================
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));
  return circlesGroup;
}

// =================================================================
// function used for updating texts group with x axis in order to
// transition to new circles
// =================================================================
function renderXTexts(textsGroup, newXScale, chosenXAxis) {

  textsGroup.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]));
  return textsGroup;
}

// =================================================================
// function used for updating texts group with y axis in order to
// transition to new circles
// =================================================================
function renderYTexts(textsGroup, newYScale, chosenYAxis) {

  textsGroup.transition()
    .duration(1000)
    .attr("y", d => newYScale(d[chosenYAxis]));
  return textsGroup;
}

// =================================================================
// function used for updating X-axis circles group with new tooltip
// =================================================================
function updateXToolTip(chosenXAxis, circlesGroup) {
 
  if (chosenXAxis === "poverty") {
    var label = "Poverty (%):";
  }
  else if (chosenXAxis === "age") {
    var label = "Age: ";
  }
  else if (chosenXAxis === "income") {
    var label = "Household Income:";
  }  

  var chosenYAxis = d3.select(".yLabel").select(".active").attr("value");

  if (chosenYAxis === "healthcare") {
   var yLabel = "Lacks Healthcare (%):";
  }
  else if (chosenYAxis === "obesity") {
    var yLabel = "Obesity (%):";
  }
  else if (chosenYAxis === "smokes") {
    var yLabel = "Smokes (%):";
  }

  const toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>${label} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    });


  // Create tooltip
  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide);
  return circlesGroup;
}

// =================================================================
// function used for updating Y-axis circles group with new tooltip
// =================================================================
function updateYToolTip(chosenYAxis, circlesGroup) {
  console.log('in updateYToolTip')
  if (chosenYAxis === "healthcare") {
    var yLabel = "Lacks Healthcare (%):";
  }
  else if (chosenYAxis === "obesity") {
    var yLabel = "Obesity (%):";
  }
  else if (chosenYAxis === "smokes") {
    var yLabel = "Smokes (%):";
  }

  var chosenXAxis = d3.select(".xLabel").select(".active").attr("value");

  console.log(`ylabel`,yLabel)
  console.log(`chosen x axis`, chosenXAxis)
  console.log(`chosen y axis`, chosenYAxis)

  if (chosenXAxis === "poverty") {
    var label = "Poverty (%):";
  }
  else if (chosenXAxis === "age") {
    var label = "Age: ";
  }
  else if (chosenXAxis === "income") {
    var label = "Household Income:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>${label} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
    });

  // Create tooltip
  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", toolTip.show)
  .on("mouseout", toolTip.hide);

  return circlesGroup;
}

// =====================end of functions============================================

d3.csv("assets/data/data.csv").then((usa_data,err) => {

  if (err) throw err;
  
  usa_data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });
  
  var xLinearScale = xScale(usa_data, chosenXAxis);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(usa_data, d => d.healthcare)])
    .range([height, 0]);
  
  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(usa_data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "blue")
    .attr("opacity", ".5");

  // add text to circles
  var textsGroup = chartGroup.append("text")
    .selectAll("tspan")
    .data(usa_data)
    .enter()
    .append("tspan")
    .text(d => d.abbr)
    //.attr("id", "circleText")
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .attr("fill", "white")
    .attr("font-size", 8)
    .attr("class", "stateText");

  // Responsive scatter size and text labels
  if (svgWidth < 500) {
    circlesGroup.attr("r", 5);
    textsGroup.style("display", "none");
  }
  else {
    circlesGroup.attr("r", 12);
    textsGroup.style("display", "inline");
  }

  // Create group for  3 x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`)
    .classed("xLabel", true);

  var poverty = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty(%)");

  var age = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age Median");

  var income = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income Median");

  // Create group for  3 y- axis labels
  var ylabelsGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)")
    .classed("yLabel", true);

  var healthcare = ylabelsGroup.append("text")
    .attr("y", 0 -50)
    .attr("x", 0 - (height / 2) )
    .attr("dy", "1em") 
    .attr("value", "healthcare")
    .classed("active", true)
    .text("Lacks Healthcare (%)");

  var smokes = ylabelsGroup.append("text")
    .attr("y", 0 - 85)
    .attr("x", 0 - (height / 2))
    .attr("value", "smokes") // value to grab for event listener
    .attr("dy", "2em")
    .classed("inactive", true)
    .text("Smokes (%)");

  var obese = ylabelsGroup.append("text")
    .attr("y", 0 - 120)
    .attr("x", 0 - (height / 2))
    .attr("value", "obesity") // value to grab for event listener
    .attr("dy", "3em")
    .classed("inactive", true)
    .text("Obesity (%)");

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selectionS
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXaxis with value
        chosenXAxis = value;

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(usa_data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderXAxis(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderXCircles(circlesGroup, xLinearScale,chosenXAxis);

        // update texts with new x values
        textsGroup = renderXTexts(textsGroup, xLinearScale, chosenXAxis);
 
        // updates tooltips with new info
        circlesGroup = updateXToolTip(chosenXAxis,circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "poverty") {
          poverty
            .classed("active", true)
            .classed("inactive", false);
          age
            .classed("active", false)
            .classed("inactive", true);
          income
            .classed("active", false)
            .classed("inactive", true); 
        } 
        else if (chosenXAxis === "age") {
          poverty
            .classed("active", false)
            .classed("inactive", true);
          age
            .classed("active", true)
            .classed("inactive", false);
          income
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "income") {
          poverty
            .classed("active", false)
            .classed("inactive", true);
          age
            .classed("active", false)
            .classed("inactive", true);
          income
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });

  // y axis labels event listener
  ylabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      console.log(`value in yaxis label`, value)

      if (value !== chosenYAxis) {

        // replaces chosenyaxis with value
        chosenYAxis = value;

        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(usa_data, chosenYAxis);
        console.log(`ylinear`, yLinearScale)

        // updates y axis with transition
        yAxis = renderYAxis(yLinearScale, yAxis);
        console.log(`yAxis`, yAxis)

        // updates circles with new y values
        circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
      
        // update texts with new y values
        textsGroup = renderYTexts(textsGroup, yLinearScale, chosenYAxis);
     
        // updates tooltips with new info
        circlesGroup = updateYToolTip(chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "healthcare") {
         healthcare
          .classed("active", true)
          .classed("inactive", false);
         smokes
          .classed("active", false)
          .classed("inactive", true);
         obesity
          .classed("active", false)
          .classed("inactive", true); 
        }
        else if (chosenYAxis === "smokes") {
          healthcare
          .classed("active", false)
          .classed("inactive", true);
          smokes
          .classed("active", true)
          .classed("inactive", false);
          obesity
          .classed("active", false)
          .classed("inactive", true);
        }
        else if(chosenYAxis === "obese") {
          healthcare
          .classed("active", false)
          .classed("inactive", true);
          smokes
          .classed("active", false)
          .classed("inactive", true);
          obesity
          .classed("active", true)
          .classed("inactive", false);
        }
      }
  });
});