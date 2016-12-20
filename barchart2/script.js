var data = [
  {name: "Locke",    value:  4},
  {name: "Reyes",    value:  8},
  {name: "Ford",     value: 15},
  {name: "Jarrah",   value: 16},
  {name: "Shephard", value: 23},
  {name: "Kwon",     value: 42}
];

var width = 420;
var barHeight = 20;

var maxi = d3.max(data.map(function(d) {return d.value}));

//We noemen x de schaal
var x = d3.scale.linear()
  .domain([0, maxi])
  .range([0,width]);

console.log(x)
console.log(x.range)
console.log(x.domain)

//standaard breedte (420) en de hoogte is hoogte van 1 bar * aantla bars
var chart = d3.select(".chart")
  .attr("width", width)
  .attr("height", barHeight * data.length)

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(_, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x.range(d))

    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d.value) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });






