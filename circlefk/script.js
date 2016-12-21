var dataset = {
"children": [
{"name": "Donald Trump", "size": 6 },
{"name": "Theresa May", "size": 64 },
{"name": "Nicola Sturgeon", "size": 19 },
{"name": "Philip Hammod", "size": 42 },
{"name": "Angela Merkel", "size": 3 }
]}

var diameter = 800;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);
    var svg = d3.select(".chart")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
            .sum(function(d) { return d.size; });

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
                return d.name + ": " + d.size;
            });

    node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d) {
                return color(d.name);
            });

    node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.name.substring(0, d.r / 3) + ": " + d.data.size;
            });

    d3.select(self.frameElement)
            .style("height", diameter + "px");

