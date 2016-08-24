/* jshint esnext: true */

var totalWidth = 1000;
var totalHeight = 600;
var margin = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
};
var width = totalWidth - margin.left - margin.right;
var height = totalHeight - margin.top - margin.bottom;

function csvParser(d) {
  return {
    year: +d.Year,
    album: d.Album,
    artist: d.Artist,
    sales: +d.Sales
  };
}

window.ondload = d3.csv('/example-code/panning-d3/top-selling-albums.csv', csvParser, data => buildChart(data));

function buildChart(topSellingAlbums) {
  var svg = d3.select('.chart-container').append('svg')
    .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
    .attr('preserveAspectRatio', 'xMinYMin meet');

  var x = d3.scaleLinear()
    .domain(d3.extent(topSellingAlbums, d => d.year))
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain(d3.extent(topSellingAlbums, d => d.sales).reverse())
    .range([0, height]);

  var albums = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  albums.selectAll('circle')
    .data(topSellingAlbums).enter()
    .append('circle')
      .attr('class', 'album-bubble')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(d.sales))
      .attr('r', 3);

  /*
   * Axis Time
   */
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  var gX = svg.append('g')
    .attr('transform', `translate(0, ${margin.top + height})`)
    .call(xAxis);

  var gY = svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis);

  svg.append('text')
    .attr('class', 'axis-label')
    .text('Sales (Millions)')
    .attr('transform',`rotate(-90) translate(-${margin.top + (height / 2)}, ${margin.left / 2})`);

  svg.append('text')
    .attr('class', 'axis-label')
    .text('Year')
    .attr('transform',`translate(${margin.left + (width / 2)}, ${margin.top + height + (margin.bottom )})`);
}

