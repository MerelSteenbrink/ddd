
// Select svg and take width and heigh in html
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// create the document with centred force
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));


d3.json("data.json", function(error, json) {
  console.log(json)
  console.log(json.nodes)
  console.log(json.links)


})

d3.json("data.json", function(error, json) {


  // define links, all in one container, g
  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(json.links)
    .enter().append("line")
    .attr("stroke-width", 10);

  //define all nodes, in one container, g
  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(json.nodes)
    .enter().append("circle")
    .attr("r", 10);

simulation
      .nodes(json.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(json.links);

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

