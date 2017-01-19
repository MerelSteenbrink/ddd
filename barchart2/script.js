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


var margin = 20,
    padding = 10,
    svg_height = 300
    svg_width = 4*svg_height;

var box_width = (svg_width - 3*padding - 2*margin) / 4,
    box_heigth = svg_height - 2*margin;

var graph_height = box_width;

console.log(box_width)

// Set the range and make equal parts
var x = d3.scaleBand()
    .range([0, box_width])
    .padding(0.1)
    .domain(["old", "new"])

var all = persons.map(elt => elt.old).concat(persons.map(elt => elt.new)),
 max = d3.max(all)

var y = d3.scaleLinear()
    .range([0, box_heigth])
    .domain([max, 0])


// maek one big svg, all the boxes will be in there
var svg = d3.select("#container").append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    
var boxes = svg.selectAll(".box")
              .data(persons)
              .enter().append("g")
              .attr("class", "box")
              .attr("width", box_width)
              .attr("height", box_heigth)
              .attr("transform", function(_, i) { return "translate("+ ( (margin + i*(box_width+padding)) ) + ","+margin+")" })

var graph = boxes.append("g")
                .attr("class", "graph")
                .attr("width", graph_height)
                .attr("height", graph_height)
                .attr("x", padding)
                .attr("y", padding)


var rect_old = graph.append("rect")
                  .attr("class", "old_bar")
                  .attr("x", x.bandwidth())
                  .attr("y", function(d) { return y(d.old)})
                  .attr("width", "50px")
                  .attr("height", function(d) {return box_width - y(d.old)})
                  .style("fill", "#00BC94")

var rect_new = graph.append("rect")
                  .attr("class", "new_bar")
                  .attr("x", x.bandwidth() + 60)
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
                .attr("y", box_heigth)
                .attr("text-anchor", "middle")





// y.domain([0, d3.max(data, function(d) {
//     return d.value; })])

// svg.selectAll(".bar")
//     .data(dati.bars)
//     .enter().append("rect")
//     .attr("class", "bar")
//     .attr("x", function(d) {
//         return x(d.time); })
//     .attr("width", x.bandwidth())
//     .attr("y", function(d) {
//         return y(d.value); })
//     .attr("height", function(d) {
//         return height - y(d.value); })
//     .style("fill", function(d, i) {
//         return color[i] });

// console.log(svg.selectAll(".bar").data(dati.bars))

// var title = svg.select("text")
//     .data(dati.name)
//     .enter().append("text")
//     .text(function(d) {
//         return d.name })
// console.log(svg.select("text").data(dati))






// var dats = [
//    {name: "Aretha Fr", old: 12, new: 15, delta: 0.3  },
//    {name: "Aretha Fr", old: 12, new: 15, delta: 0.3  },
//    {name: "Aretha Fr", old: 12, new: 15, delta: 0.3  },
//    {name: "Aretha Fr", old: 12, new: 15, delta: 0.3  },
//    {name: "Aretha Fr", old: 12, new: 15, delta: 0.3  },

// ]

// var dati = { name: "Aretha Fr", bars:[{time:"old", value: 12} ,{time: "new", value: 15}], delta: 0.3 }

// var data = [
//     { name: "Locke", value: 4, delta: 12 },
//     { name: "Reyes", value: 8, delta: 12 },
//     { name: "Ford", value: 15, delta: 12 },
//     { name: "Jarrah", value: 6, delta: 12 },
//     { name: "Shephard", value: 23, delta: 12 },
//     { name: "Kwon", value: 32, delta: 12 }
// ];