
var colors = [{
  name: "Last week", 
  color: "#00BC94",
  class: "old_bar"
},
{
  name: "Now", 
  color: "#2478A1",
  class: "new_bar"
}]

var color = ["#00BC94", "#2478A1"];
var padding = 20

var conti = d3.select("#container")
    //svg_height = parseInt(conti.style('height'), 10),
    svg_width = parseInt(conti.style('width'), 10),
    svg_height = 0.25*svg_width + 1.5*padding
    
    //svg_width = 4*svg_height - 6*padding
    
    
    

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

//Two rects will be in here
var graph = boxes.append("g")
                .attr("class", "graph")
                .attr("width", box_width)
                .attr("height", graph_height + 2*padding)
                .style("position", "relative")
                .attr("transform", "translate(0,10)")


// left rect
var rect_old = graph.append("rect")
                  .attr("class", "old_bar")
                  .attr("x", x.rangeBand())
                  .attr("y", function(d) { return y(d.old)})
                  .attr("width", box_width/5)
                  .attr("height", function(d) {return box_width - y(d.old)})
                  .style("fill", color[0])
                  .style("transition", "all 800ms ease")


//second rect
var rect_new = graph.append("rect")
                  .attr("class", "new_bar")
                  .attr("x", x.rangeBand() + 5 + box_width/5 )
                  .attr("y", function(d) { return y(d.new)})
                  .attr("width", box_width/5)
                  .attr("height", function(d) { return box_width - y(d.new)})
                  .style("fill", color[1])
                  .style("transition", "all 800ms ease")

//buzz scores on top
          graph.append("text")
                .text(function(d) {return d.old})
                .attr("y", function(d) { return y(d.old) - 3})
                .attr("x", x.rangeBand())
                .attr("dx", ".10em")
                .attr("dy", ".10em")
                .style("fill", color[0])
                .style("font-size", "10px")

          graph.append("text")
                .text(function(d) {return d.new})
                .attr("y", function(d) { return y(d.new) - 3})
                .attr("x", x.rangeBand() + 5 + box_width/5)
                .attr("dx", ".10em")
                .attr("dy", ".10em")
                .style("font-size", "10px")
                .style("fill", color[1])

// ------------> Arrowzzzzz
        graph.append("line")
            .attr("x1", x.rangeBand() + 5 + box_width/5 + box_width/10 )
            .attr("x2", x.rangeBand() + 5 + box_width/5 + box_width/10 )

            .attr("y1",function(d) { return y(d.old)})
            .attr("y2", function(d) { return y(d.new)})
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            .attr("stroke-dasharray","5,2")

        graph.append("line")
            .attr("x1", x.rangeBand() + 5 + box_width/5 + box_width/10 - 6 )
            .attr("y1",function(d) { return (d.old > d.new) ? y(d.new) - 8 : y(d.new) + 8})
            .attr("x2", x.rangeBand() + 5 + box_width/5 + box_width/10 )
            .attr("y2", function(d) { return y(d.new)})
            .attr("stroke-width", 1)
            .attr("stroke", "white")
            
        graph.append("line")
            .attr("x1", x.rangeBand() + 5 + box_width/5 + box_width/10 + 6 )
            .attr("y1",function(d) { return (d.old > d.new) ? y(d.new) - 8 : y(d.new) + 8})
            .attr("x2", x.rangeBand() + 5 + box_width/5 + box_width/10 )
            .attr("y2", function(d) { return y(d.new)})
            .attr("stroke-width", 1)
            .attr("stroke", "white")


var deltas =  graph.append("text")
              .attr("class", "delta")
              .attr("x", x.rangeBand() + 5 + box_width/5 + box_width/7)
              .text( function(d) {return d.delta+"%"}) 
              .attr("text-anchor", "middle")
              .attr("y", function(d) {return (( y(d.old) + y(d.new) )/ 2) })
              .style("fill", "white")
              .style("font-size", "10px")

// var delta = boxes.append("text")
//                   .attr("class", "delta")
//                   .attr("x", box_width/2 + padding)
//                   .text( function(d) {return d.delta+"%"}) 
//                   .attr("text-anchor", "middle")
                  
var name = boxes.append("text")
                .text( function(d) {return d.name})
                .attr("dy", ".3em")
                .style("position", "absolute")
                .attr("x", box_width/2)
                .attr("y", box_heigth + padding)
                .attr("text-anchor", "start")


// Make a legend

var legend = svg.append("g")
                .attr("class", "legend")
                .attr("width", "50px")
                .attr("height", "50px")


                legend.selectAll(".blocks")
                  .data(colors)
                  .enter().append("rect")
                  .attr("class", "blocks")
                  .attr("class", function(d) {return d.class})
                  .attr("width", "10px")
                  .attr("height", "10px")
                  .attr("y", function(d, i) {return 15*i})
                  .style("fill", function(d) {return d.color})


                legend.selectAll(".legend-name")
                  .data(colors)
                  .enter().append("text")
                  .text(function(d) {return d.name})                  
                  .attr("class", function(d) {return d.name})
                  .attr("class", function(d) {return d.class})
                  .attr("y", function(d, i) {return 10 + 15*i})
                  .attr("x", "15px")




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
    
  rect_old.on('mouseout', function(){
                         d3.selectAll("rect").style("opacity", "1")
                         d3.select(".text-title").remove();
                   });
  rect_new.on('mouseout', function(){
                         d3.selectAll("rect").style("opacity", "1")
                         d3.select(".text-title").remove();
                   });


                   
})