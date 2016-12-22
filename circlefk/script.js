
fetch("./bub.json")
  .then(function(response) { return response.json()})
  .then(function(d) { maak(d)});

function maak(d) {
  console.log(d);
  var dataset = d;
  visualization(d);
}


function visualization(dataset){
  var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");



      var bubble = d3.pack(dataset)
              .size([width/1.5, height /1.5])
              .padding(3);


      var nodes = d3.hierarchy(dataset)
              .sum(function(d) { return d.times; });

      var node = svg.selectAll(".node")
              .data(bubble(nodes).descendants())
              .enter()
              .filter(function(d){
                  return  !d.children
              })
              .append("g")
              .attr("class", "node")
              .attr("transform", function(d) {
                  return "translate(" + d.x + "," + d.y + ")";
              });


      node.append("title")
              .text(function(d) {
                  return d.data.name + ": " + d.data.times;
              });

      node.append("circle")
              .attr("r", function(d) {
                  return d.r;
              })
              .style("fill", function(d) {
                  return "#81BCB8";
              });

      node.append("text")
              .attr("dy", ".3em")
              .style("text-anchor", "middle")
              .text(function(d) {
                  return d.data.name + ": " + d.data.times;
              });

      d3.select(self.frameElement)
              .style("height", height + "px");
}
