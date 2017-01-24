var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range([ "rgb(64, 195, 300)", "rgb(64, 165, 280)", "rgb(64, 145, 260)", "rgb(64, 125, 240)", "rgb(64, 195, 220)", "rgb(64, 195, 200)"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { 
      console.log(d.buzz)
      return d.buzz; });

var svg = d3.select(".donutcontainer").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("data.json", function(error, data) {
  if (error) throw error;
  
  var arcs = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  arcs.append("path")
      .attr("d", arc)
      .style("fill", function(d, i) { return color(i)})
      .style("fill-opacity", 0.8)
   
   arcs.on('mouseover', function(d){
                  d3.selectAll(".arc").style({opacity:'0.3'});
                  d3.select(this).style("opacity", "1");
                  console.log(d.data.name)
                  d3.select("svg").append("text")
                          .attr("class", "arcname")
                          .attr("dy", ".3em")
                          .style("text-anchor", "middle")
                          .attr("transform", "translate("+ width/2 +","+ height/2 + ")")
                          .style("fill", function(d, i) {return color(i)})
                          .text(d.data.name);
                          
            })
   
   arcs.on('mouseout', function(){
                          d3.selectAll(".arc").style("opacity", "1")
                          d3.select(".arcname").remove();
                    });


  
});
