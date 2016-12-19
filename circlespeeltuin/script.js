//3  circles

var svg = d3.select('#circlesSVG')
var circle = svg.selectAll("circle")
  .data([64,114,224]);
circle.attr("r", function(d) { return Math.sqrt(d); });
circle.attr("cx", function(_,i) { return 100 * i + 30; });

circle.style("fill", "orange");

// add 2 datapoints
//
var circle = svg.selectAll("circle")
    .data([64,114,224,300,500])
var circleEnter = circle.enter().append("circle");
console.log(circleEnter)
circleEnter.attr("cy", 60);
circleEnter.attr("cx", function(d, i) { return i * 100 + 30; });
circleEnter.attr("r", function(d) { return Math.sqrt(d); });
circleEnter.style("fill", "red")

// //style color
// //give radius
// circle.attr("r", 25)
// //give the circles random x-coordinates
// circle.attr("cx", function() { return Math.random() * 720; });

// Real data
// bind data to objects

var circleEnter = circle.enter().append("circle");
// Give radius squared of value

