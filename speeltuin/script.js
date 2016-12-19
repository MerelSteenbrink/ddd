var data = [4, 8, 15, 16, 23, 42];

var scale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0,300]);

//select the chart div:
var chart = d3.select(".chart");
// we initiate the data join by defining
// the selection to which we will join data.
var bar = chart.selectAll("div");
// join tghe data to the selection
var barupdate = bar.data(data);
// as there are no dom elements yet, we only need a enter
// function and no exit and update yet.
var barEnter = barupdate.enter().append("div");
// set the width of each new bar
barEnter.style("width", function(d) {return scale(d) + "px";});
// add text to bar
barEnter.text(function(d) {return "yay: "+ d});
