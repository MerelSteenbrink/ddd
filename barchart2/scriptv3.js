var persons = [

    {
        "name": "Theresa May",
        "old": 100,
        "new": 150,
        "delta": 0.6
    }, {
        "name": "Trump",
        "old": 200,
        "new": 150,
        "delta": 0.1
    }, {
        "name": "Jamie Oliver",
        "old": 102,
        "new": 103,
        "delta": 0.8
    }, {
        "name": "Tim Barrow",
        "old": 40,
        "new": 30,
        "delta": 0.5
    }
]



var color = ["#a05d56", "#d0743c"];

var conti = d3.select("#container")
    svg_width = parseInt(conti.style('width'), 10),
    svg_height = svg_width / 4

var margin = 20,
    padding = 10
    

var box_width = (svg_width - 3*padding - 2*margin) / 4,
    box_heigth = svg_height - 4*margin;

var graph_height = box_width ;

console.log(box_width)

// Set the range and make equal parts
var x = d3.scale.ordinal().rangeRoundBands([0, box_width], .1, 0.1)
        .domain(["old", "new"])

var all = persons.map(elt => elt.old).concat(persons.map(elt => elt.new)),
 max = d3.max(all)

var y = d3.scale.linear()
    .range([graph_height -20, 0])
    .domain([0, max])


// maek one big svg, all the boxes will be in there
var svg = d3.select("#container").append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .attr("class", "topaint")
    
var boxes = svg.selectAll(".box")
              .data(persons)
              .enter().append("g")
              .attr("class", "box")
              .attr("width", box_width)
              .attr("height", box_heigth + 30)
              .attr("transform", function(_, i) { return "translate("+ ( (margin + i*(box_width+padding)) ) + ","+margin+")" })

var graph = boxes.append("g")
                .attr("class", "graph")
                .attr("width", graph_height)
                .attr("height", graph_height)
                .attr("x", padding)
                .attr("y", 2*margin)


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
                  .attr("x", box_width/2 + padding + margin)
                  .text( function(d) {return "+"+d.delta}) 
                  .attr("text-anchor", "middle")
                  
var name = boxes.append("text")
                .text( function(d) {return d.name})
                .attr("dy", ".3em")
                .attr("x", box_width/2 + padding + margin)
                .attr("y", box_heigth + 2*margin)
                .attr("text-anchor", "middle")
               
                


