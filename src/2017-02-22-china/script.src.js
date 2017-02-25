const data = [{
  country: "China",
  value: 1408.7
}, {
  country: "USA",
  value: 518.7
}, {
  country: "Germany",
  value: 147.7,
}, {
  country: "Japan",
  value: 136.1
}, {
  country: "S. Korea",
  value: 114.6
}, {
  country: "India",
  value: 77.3
}, {
  country: "France",
  item: 74.2
}, {
  country: "Taiwan",
  value: 71.5
}, { 
  country: "Brazil",
  value: 59.7
}, {
  country: "Italy",
  value: 51.9
}];

const width = 600;
const height = 600;
const colors = {
  high: '#e91e5b',
  base: '#5e81bc',
  txtHigh: 'rgba(249, 212, 15, 0.83)',
  txtBase: 'rgba(255,255,255,.77)'
};
const svg = d3.select('#target')
  .attr('width', width)
  .attr('height', height);

const pack = d3.pack()
    .size([width, height])
    .padding(5);

const root = d3.hierarchy({children: data})
    .sum(function(d) { return d.value; });

var node = svg.selectAll(".node")
    .data(pack(root).leaves())
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

node.append("circle")
      .attr("id", d => d.data.country)
      .attr("r", d => d.r)
      .style("fill", d => isChina(d) ? colors.high : colors.base );

node.append("clipPath")
      .attr("id", d => "clip-" + d.data.country)
    .append("use")
      .attr("xlink:href", d => "#" + d.data.country);

node.append("text")
      .attr('text-anchor', 'middle')
      .attr("clip-path", d => "url(#clip-" + d.data.country + ")")
      .attr('fill', d => isChina(d) ? colors.txtHigh : colors.txtBase )
      .attr('font-size', d => isChina(d) ? 38 : 18)
    .selectAll("tspan")
    .data(d => [d.data.country]) 
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) =>  13 + (i - nodes.length / 2 - 0.5) * 10)
      .text(d => d);

node.append("title")
      .text(function(d) { return d.value});

function isChina(d) {
  return d.data.country === 'China';
}