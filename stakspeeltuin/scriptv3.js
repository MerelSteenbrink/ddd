// This is a fucntion to calculate the x position of every rectangle
function cumulise(data) {
    var vori = 0
    data[0].cum = 0
    for (var i = 1; i < data.length; i++) {    
        vori += data[i-1].buzz
        data[i].cum = vori
    }    
}


// Set the svg and the g where we're gonna make the chart
var svg = d3.select("svg"),
  margin = {top: 10, right: 10, bottom: 20, left: 20},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  
  deltas= svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  blokken = svg.append("g").attr("transform", "translate(" + margin.left + ",100 )");


// Set the range of the chart (eg the range to map the data on) 
var x = d3.scale.linear()
    .rangeRound([0, width]);

//Set the colorscheme
var color = d3.scale.ordinal()
    .range(["#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

//Get the data (in the json file)
d3.json("data.json", function(error, json) {
  if (error) throw error;
  
  var max = d3.max(json, function(d) {return d.buzz});
  var sum = d3.sum(json, function(d) {return d.buzz});
  

  x.domain([0, sum])

  console.log(json)
  json.sort(function(a, b) {  return b.buzz - a.buzz; });
  console.log(json)
  cumulise(json)
  console.log(json)
  
  // Make the coloured boxes
  var boxes = blokken.selectAll("g")
      .data(json)
      .enter().append("g")
      //.attr("transform", function(d) { return "translate(" + x(d.cum) + ", 0)"; })
      .attr("width", function(d) {return x(d.buzz)})

      console.log(boxes)
  var recs = boxes.append("rect")
                  .attr("x", function(d) {return x(d.cum)})
                  .attr("y", margin.top)
                  .attr("height", 100)
                  .attr("width", function(d) {return x(d.buzz)})
                  .style("fill", function(d, i) { return color(i); })
  
  recs.on('mouseover', function(d){
                  d3.selectAll("rect").style({opacity:'0.3'});
                  d3.select(this).style("opacity", "1");                  
            })
   
   recs.on('mouseout', function(){ d3.selectAll("rect").style("opacity", "1")
                          
                    });





  var text = boxes.append("text")
                  .text(function(d) {return d.name;}) 
                  .attr("x", function(d) {return x(d.cum + 20)})
                  .attr("y", 100)  
                  .attr("text-anchor", "start")
                  .style("fill", "white")
                  .style("font-size", "10px")
                  .style("opacity", "0.5")

  // Make deltas
  var upper = deltas.selectAll("g")
      .data(json)
      .enter().append("g")
      //.attr("transform", function(d) { return "translate(" + x(d.cum) + ", 0)"; })
      .attr("width", function(d) {return x(d.buzz)})

  var delta_text = upper.append("text")
                  .text(function(d) {return "+ "+d.delta*100+"%";}) 
                  .attr("x", function(d) {return x(d.cum + d.buzz/2)})
                  .attr("y", 60)  
                  .attr("text-anchor", "middle")
                  .style("fill", function(d, i){return color(i)})
                  .style("font-size", "15px")

  });     


