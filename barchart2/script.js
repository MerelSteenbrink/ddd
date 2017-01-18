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


var margin = 10,
    svg_height = 300 + 2*margin,
    svg_width = 4*svg_height + 5*margin;

var box_width = ( svg_width - 5*margin ) / 4
console.log("boxwidth"+box_width)
// Set the range and make equal parts
var x = d3.scaleBand()
    .range([0, box_width])
    .padding(0.1)
    .domain(["old", "new"])

var all = persons.map(elt => elt.old).concat(persons.map(elt => elt.new))
console.log(all)
var max = d3.max(all)

var y = d3.scaleLinear()
    .range([0, box_width])
    .domain([max, 0])


// maek one big svg, all the boxes will be in there
var svg = d3.select("body").append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    
var boxes = svg.selectAll(".box")
              .data(persons)
              .enter().append("g")
              .attr("class", "box")
              .attr("width", box_width)
              .attr("height", box_width)
              .attr("transform", function(_, i) { return "translate("+ (i*box_width+margin) + ",0)"; });

var rect_old = boxes.append("rect")
                  .attr("class", "old_bar")
                  .attr("x", x.bandwidth())
                  .attr("y", function(d) { return y(d.old)})
                  .attr("width", "50px")
                  .attr("height", function(d) {
                    console.log("heigt")
                    console.log(y(d.old))
                    return box_width - y(d.old)})
                  .style("fill", "red")

var rect_new = boxes.append("rect")
                  .attr("class", "new_bar")
                  .attr("x", x.bandwidth() + 60)
                  .attr("y", function(d) { return y(d.new)})
                  .attr("width", "50px")
                  .attr("height", function(d) {
                    
                    console.log(y(d.old))
                    return box_width - y(d.new)})
                  .style("fill", "blue")

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