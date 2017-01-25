

var color = ["#a05d56", "#d0743c"];
var padding = 20

var conti = d3.select("#container")
    svg_height = parseInt(conti.style('height'), 10),
    console.log(svg_height)
    svg_width = 4*svg_height - 6*padding
    console.log(svg_width)
    
    

var box_width = (svg_width - 2*padding) / 4,
    box_heigth = box_width

var graph_height = (3*box_width)/4 ;


// Set the range and make equal parts
var x = d3.scale.ordinal().rangeRoundBands([0, box_width], .1, 0.1)
        .domain(["old", "new"])


d3.json("data.json", function(error, data){
  if (error) throw error;

var all = data.map(elt => elt.old).concat(data.map(elt => elt.new)),
    max = d3.max(all)

var y = d3.scale.linear()
    .range([graph_height, 0])
    .domain([0, max])


// make one big svg, all the boxes will be in there
var svg = d3.select("#container").append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .attr("class", "topaint")
    
var boxes = svg.selectAll(".box")
              .data(data)
              .enter().append("g")
              .attr("class", "box")
              .attr("width", box_width)
              .attr("height", box_heigth)
              .attr("transform", function(_, i) { return "translate("+ ( (padding + i*box_width) ) + ","+padding+")" })

var graph = boxes.append("g")
                .attr("class", "graph")
                .attr("width", box_width)
                .attr("height", graph_height)
                .style("position", "absolute")
                .attr("x", 0)
                .attr("y", padding)


var rect_old = graph.append("rect")
                  .attr("class", "old_bar")
                  .attr("x", x.rangeBand())
                  .attr("y", function(d) { return y(d.old)})
                  .attr("width", "50px")
                  .attr("height", function(d) {return box_width - y(d.old)})
                  .style("fill", "#00BC94")

var rect_new = graph.append("rect")
                  .attr("class", "new_bar")
                  .attr("x", x.rangeBand() + 55)
                  .attr("y", function(d) { return y(d.new)})
                  .attr("width", "50px")
                  .attr("height", function(d) { return box_width - y(d.new)})
                  .style("fill", "#2478A1")

var delta = boxes.append("text")
                  .attr("class", "delta")
                  .attr("x", box_width/2 + padding)
                  .text( function(d) {return "+"+d.delta}) 
                  .attr("text-anchor", "middle")
                  
var name = boxes.append("text")
                .text( function(d) {return d.name})
                .attr("dy", ".3em")
                .attr("x", box_width/2 + padding)
                .attr("y", box_heigth + padding)
                .attr("text-anchor", "middle")
                    
})