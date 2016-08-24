/* jshint esnext: true */

var totalWidth = 1000;
var totalHeight = 600;
var margin = {
  top: 20,
  bottom: 80,
  left: 80,
  right: 20
};
var padding = 10;
var width = totalWidth - margin.left - margin.right;
var height = totalHeight - margin.top - margin.bottom;

function* generateId() {
  var id = 0;
  while (true) {
    yield id++;
  }
}
var gen = generateId();

function csvParser(d) {
  return {
    id: 'id-' + gen.next().value,
    year: +d.Year,
    album: d.Album,
    artist: d.Artist,
    sales: +d.Sales
  };
}

window.ondload = d3.csv('/example-code/panning-d3/top-selling-albums.csv', csvParser, data => buildChart(data));

function buildChart(topSellingAlbums) {
  let svg = d3.select('.chart-container').append('svg')
    .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
    .attr('preserveAspectRatio', 'xMinYMin meet');

  let x = d3.scaleLinear()
    .domain(d3.extent(topSellingAlbums, d => d.year))
    .range([0, width]);

  let y = d3.scaleLinear()
    .domain(d3.extent(topSellingAlbums, d => d.sales).reverse())
    .range([0, height]);

  let albums = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  albums.selectAll('circle')
    .data(topSellingAlbums).enter()
    .append('circle')
      .attr('id', d => d.id)
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(d.sales))
      .attr('r', 3);

  /*
   * Axis Time
   */
  let xAxis = d3.axisBottom(x)
    .tickFormat(d3.format('d'));
  let yAxis = d3.axisLeft(y);

  let gX = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top + height + padding})`)
    .call(xAxis);
  let gY = svg.append('g')
    .attr('transform', `translate(${margin.left - padding}, ${margin.top})`)
    .call(yAxis);

  let axisFontSize = 20;
  svg.append('text')
    .text('Sales (Millions)')
    .attr('font-size', axisFontSize)
    .attr('text-anchor', 'middle')
    .attr('transform',`rotate(-90) translate(-${margin.top + (height / 2)}, ${axisFontSize})`);
  svg.append('text')
    .text('Year')
    .attr('text-anchor', 'middle')
    .attr('font-size', axisFontSize)
    .attr('transform',`translate(${margin.left + (width / 2)}, ${totalHeight})`);

  /*
   * Tooltip
   */
  var tip = d3.tip()
    .attr('class', 'tooltip')
    .html(d => `
    <div>
      ${d.album} - ${d.artist}
    </div>
    `);

  svg.call(tip);
  let voronoi = d3.voronoi()
    .x(d => x(d.year))
    .y(d => y(d.sales))
    .extent([[0, 0], [width, height]]);

  svg.selectAll('.voronoi')
    .data(voronoi.polygons(topSellingAlbums))
    .enter().append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('fill', 'none')
      .attr('stroke', 'none')
      .attr('pointer-events', 'all')
    .append('path')
      .attr('d', d => d ? "M" + d.join("L") + "Z" : null)
      .on('mouseover', (d) => {
        let bubble = document.getElementById(d.data.id);
        //TweenMax.fromTo(`#${d.data.id}`, 0.2, {
          //scale: 1
        //}, {
          //ease: Back.easeOut.config(4),
          //scale: 2 
        //});
        //if (d.data.seconds > 300) {
          //tip.offset([15,0]);
          //tip.direction('s');
        //} else if (d.data.year < new moment('January 30 1906', 'MMMM DD YYYY') ) {
          //tip.offset([0,15]);
          //tip.direction('e');
        //} else if (d.data.year > new moment('January 30 2000', 'MMMM DD YYYY')) {
          //tip.offset([0,-15]);
          //tip.direction('w');
        //} else {
          //tip.direction('n');
          //tip.offset([-15,0]);
        //}
        tip.show(d.data, bubble);
      })
    .on('mouseout', (d) => {
      //TweenMax.to(`#${d.data.id}`, 0.2, {
        //scale: 1
      //});
      tip.hide();
    });

}

