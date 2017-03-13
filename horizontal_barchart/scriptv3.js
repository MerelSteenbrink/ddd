var padding = 20


d3.json("data.json", function(error, data){
  if (error) throw error;

  var n = data.length
  console.log(n)

  var conti = d3.select("#container")
    svg_width = parseInt(conti.style('width'), 10),
    svg_height = svg_width/14 * n 
    

  var box_width = svg_width 
      box_heigth = svg_width /8

  var part = svg_width / 8 ;

  var all = data.map(elt => elt.old).concat(data.map(elt => elt.new)),
      max = d3.max(all)

  // Set the range and make equal parts
  var x = d3.scale.linear()
        .range([0, 5*svg_width/8])
        .domain([0, max]);
// make one big svg, all the boxes will be in there
  var svg = d3.select("#container").append("svg")
    .attr("width", svg_width + 20)
    .attr("height", svg_height)
    .attr("class", "topaint")
    
var boxes = svg.selectAll(".box")
              .data(data)
              .enter().append("g")
              .attr("class", "box")
              .attr("width", svg_width + 20)
              .attr("height", box_heigth)
              .attr("transform", function(_, i) { return "translate(0," + (i * part/2 + part/2)  + ")" })

//Two rects will be in here
var graph = boxes.append("g")
                .attr("class", "graph")
                .attr("width", svg_width)
                .attr("height", part)
                .style("position", "relative")

// Upper rect
var rect_old = graph.append("rect")
                  .attr("class", "old_bar old_fill")
                  .attr("x", part*2)
                  .attr("width", function(d) {
                    console.log(d)
                    console.log(x(d.old))
                    return x(d.old)})
                  .attr("height", 12)
                  .style("transition", "all 800ms ease")
// Lower rect
var rect_new = graph.append("rect")
                  .attr("class", "new_bar new_fill")
                  .attr("x", part*2)
                  .attr("y", 15)
                  .attr("width", function(d) {return x(d.new)})
                  .attr("height", 12)
                  .style("transition", "all 800ms ease")

// Up or down percentage
var stats = graph.append("g")
                  .attr("y", 13)
                  .attr("class", function(d) {return (d.delta > 0) ? "percentage positive" : "percentage negative"})

var percentages = stats.append("text")
                  .text( function(d) {return ((d.delta > 0) ? "▲" + d.delta : "▼" + d.delta )+"%"}) 
                  .attr("text-anchor", "middle")
                  .attr("x", 8* part)



var name = boxes.append("text")
                .text( function(d) {return d.name})
                .attr("dy", ".3em")
                .style("position", "absolute")
                .attr("x", part)
                .attr("y", 13)
                .attr("text-anchor", "start")

// Make a legend

var legend = svg.append("g")
                .attr("class", "legend")
                .attr("width", "50px")
                .attr("height", "50px")


              legend.append("rect")
                  .attr("class", "blocks old_fill old_bar")
                  .attr("width", "10px")
                  .attr("height", "10px")
                  .attr("y", 0)

              legend.append("rect")
                  .attr("class", "blocks new_fill new_bar")
                  .attr("width", "10px")
                  .attr("height", "10px")
                  .attr("y", 0)
                  .attr("x", 100)

              legend.append("text")
                    .text("Old")
                    .attr("class", "blocks old_bar")
                    .attr("y", 10)
                    .attr("x", 10)

              legend.append("text")
                    .text("Now")
                    .attr("class", "blocks new_bar")
                    .attr("x", 120)
                    .attr("y", 10)
              



var oldies = d3.selectAll(".old_bar")

  oldies.on('mouseover', function(d){
                   d3.selectAll(".new_bar").style({opacity:'0.2'});
                   d3.selectAll(".old_bar").style("opacity",'1');
                   
             })

var newbies = d3.selectAll(".new_bar")

  newbies.on('mouseover', function(d){
                   d3.selectAll(".old_bar").style({opacity:'0.2'});
                   d3.selectAll(".new_bar").style("opacity",'1');                     
                           
             })
    
  rect_old.on('mouseout', function(){ d3.selectAll("rect").style("opacity", "1")  });
  rect_new.on('mouseout', function(){ d3.selectAll("rect").style("opacity", "1")  });


                   
})