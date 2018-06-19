var height = 25;
var width = 1000;
var margin = 40;

var formatTime = function(input, formatInput, formatOutput){
    var dateParse = d3.time.format(formatInput).parse;
    var dateFormat = d3.time.format(formatOutput);
    return dateFormat(dateParse(input));
};


var data1980 =[];
var data1990 =[];
var data2000 =[];
var data2010 =[];

d3.csv("data_1980_1.csv"
, function (error, crimeData) {
  if (error) throw error;
    crimeData.forEach(function (data) {
    data.x = formatTime(data.x,"%m/%d/%y",'%Y-%m-%d');
    data.y = +data.y;
    data.c = +data.c;
    data.size = +data.size
    data.summary = data.summary;

    data1980.push({
      x:  data.x,
      y: data.y,
      c: data.c,
      size: data.size,
      summary:data.summary
    });
  });
  console.log('Plotting 1980-1989')
  renderGraph(data1980,'#area1980')
  console.log(data1980)
});


d3.csv("data_1990_1.csv"
, function (error, crimeData) {
  if (error) throw error;
  crimeData.forEach(function (data) {
    data.x = formatTime(data.x,"%m/%d/%y",'%Y-%m-%d');
    data.y = +data.y;
    data.c = +data.c;
    data.size = +data.size
    data.summary = data.summary;

    data1990.push({
      x:  data.x,
      y: data.y,
      c: data.c,
      size: data.size,
      summary:data.summary
    });
  });
  console.log('Plotting 1990-1999')
  renderGraph(data1990,'#area1990')
  console.log(data1990)
});

d3.csv("data/data_2000_1.csv"
, function (error, crimeData) {
  if (error) throw error;
  crimeData.forEach(function (data) {
    console.log(data)
    data.x = formatTime(data.x,"%m/%d/%y",'%Y-%m-%d');
    data.y = +data.y;
    data.c = +data.c;
    data.size = +data.size
    data.summary = data.summary;

    data2000.push({
      x:  data.x,
      y: data.y,
      c: data.c,
      size: data.size,
      summary:data.summary
    });
  });
  console.log('Plotting 2000 - 2009')
  renderGraph(data2000,'#area2000')
  console.log(data2000)
});

d3.csv("data/data_2010_1.csv"
, function (error, crimeData) {
  if (error) throw error;
  crimeData.forEach(function (data) {
      console.log(data)
    data.x = formatTime(data.x,"%m/%d/%y",'%Y-%m-%d');
    data.y = +data.y;
    data.c = +data.c;
    data.size = +data.size
    data.summary = data.summary;

    data2010.push({
      x:  data.x,
      y: data.y,
      c: data.c,
      size: data.size,
      summary:data.summary
    });
  });
  console.log('Plotting 2010 - 2018')
  renderGraph(data2010,'#area2010')
  console.log(data2010)
});


function renderGraph(data,area) {
var labelX = 'X';
var labelY = 'Y';
var svg = d3.select(area)
            .append('svg')
			.attr('class', 'chart')
			.attr("width", width + margin + margin)
			.attr("height", height + margin + margin)
			.append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")");

            var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);
                    

var x = d3.time.scale()
    .range([0, width])
    .domain([d3.min(data, function (d) { return (new Date(d.x)) }), d3.max(data, function (d) { return (new Date(d.x))})])


var y = d3.scale.linear()
		.domain([d3.min(data, function (d) { return d.y; }), d3.max(data, function (d) { return d.y; })])
		.range([height, 0]);

var scale = d3.scale.sqrt()
        .domain([0,1092])
		.range([1, 50]);

// var opacity = d3.scale.sqrt()
// 		.domain([d3.min(data, function (d) { return d.size; }), d3.max(data, function (d) { return d.size; })])
//         .range([1, .5]);

// var formatTime = d3.time.format("%e %B");
                                
// var color = d3.scale.category20();

var color = ["#be719b","#3caaa1"]

// var color =d3.scale.ordinal()
//     .range(["#b0a98e","#7b6888"])
 //   .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


//var xAxis = d3.svg.axis().scale(x)//.orient("bottom").ticks(2);

var xAxis = d3.svg.axis().scale(x).orient("bottom")//.tickFormat(function (d){return d3.format("d")(d);});
var yAxis = d3.svg.axis().scale(y).orient("left");


svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)
 	.append("text")
	.attr("x", width + 20)
	.attr("y", margin - 20)
	.attr("dy", ".71em")
	.style("text-anchor", "end");
 
svg.selectAll("circle")
	.data(data)
	.enter()
	.insert("circle")
	.attr("cx", width / 2)
	.attr("cy", height / 2)
    .attr("opacity", 0.5)
	.attr("r", function (d) { return scale(d.size); })
    //.style("fill", function (d) { return color(d.c); })
    .attr("fill", function(d) { return color[d.c]; })
    .on('mouseover', function (d, i) { fade(d.c, .1);})
    .on('mouseout', function (d, i) {	
        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
        fadeOut(); 
    })
    .on("click", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div.html("<h4>"+d.x+"</h4>" + "<p>" + d.summary + "</p>")	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");	
        })					
	.transition()
	.delay(1)
	.duration(500)
	.attr("cx", function (d) { return (x(new Date(d.x))); })
	.attr("cy", height)
    .ease("bounce");


                             
function fade(c, opacity) {
	svg.selectAll("circle")
	.filter(function (d) {
		return d.c != c;
	})
	.transition()
	.style("opacity", opacity);
 }

function fadeOut() {
	svg.selectAll("circle")
	.transition()
	.style("opacity", 0.5);
}

}
