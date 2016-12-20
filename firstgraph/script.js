// Select an element and add svg
var vis = d3.select("#charity")
.append("svg");

vis.attr("width", 600)
  .attr("height", 200)
  .classed("fillie", true)


var nootjes = [{x: 30, y: 50, name: "paprika"},
{x: 190, y: 120, name: "bloemkool"},
{x: 390, y:50, name: "spinazie"}]

var pizza = vis.selectAll("circle .nodes")
    .data(nootjes)
    .enter().append("svg:circle")
    .attr("class", "nodes")
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y})
    .attr("r", 10)


vis.selectAll("text")
    .data(nootjes)
    .enter().append("text")
    .attr("dx", function(d) {return d.x + 5})
    .attr("dy", function(d) {return d.y -10})
    .text(function(d) { return d.name })
    .attr("font-family", "Verdana")
    .attr("font-size", "20px")


var linkies = [
{source: nootjes[0], target: nootjes[1]},
{source: nootjes[2], target: nootjes[1]}
]

vis.selectAll(".line")
    .data(linkies)
    .enter().append("line")
    .attr("x1", function(d) {return d.source.x})
    .attr("y1", function(d) {return d.source.y})
    .attr("x2", function(d) {return d.target.x})
    .attr("y2", function(d) {return d.target.y})
    .style("stroke", "rgb(6,120,155)");
