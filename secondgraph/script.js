
// Select svg and take width and height in html
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// defines a function color with input a number and output a hex
var color = d3.scaleOrdinal(d3.schemeCategory20);


// create the document with centred force
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));


d3.json("data.json", function(error, json) {


  // define links, all in one container, g
  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(json.links)
    .enter().append("line")
    .attr("stroke-width", function(d) {return d.value});

  // define all nodes, in one container, g
  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(json.nodes)
    .enter().append("circle")
    .attr("r", function(d) {return d.times})
    .attr("fill", function(d) {return color(d.group)})

  node.append("title")
    .text(function(d) {return d.id;})

simulation
      .nodes(json.nodes)
      .on("tick", ticked);

simulation.force("link")
      .links(json.links);

// This is the listener, wich is executed every time an internall timer ticks
//
  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
});




//QUESTION: why can you do d.x  and d.y ?? Where do these coordinates come from??
//HOW DO THESE NODES GET THEIR PLACES??
//// --> that's how force works
