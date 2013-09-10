(function(){
// 描画領域の設定
var margin = {top: 20, right: 120, bottom: 80, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// 利用する色のカテゴリー
var color = d3.scale.category10();

// X軸の範囲
var x = d3.time.scale()
    .range([0, width]);

// Y軸の範囲
var y = d3.scale.linear()
    .range([height, 0]);

// X軸のラベル位置
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Y軸のラベル位置
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.GDP); });

var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("graph/sales.csv", function(error, data) {
  // ドメイン毎の色の設定
  // filterでheaderのkeyが"年"のカラムを取り除く
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "年"; }));

  data.forEach(function(d) {
    // Date形式にparse
    d.year = d3.time.format("%Y").parse(d["年"]);
  });

  var industries = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {year: d.year, GDP: +d[name]};
      })
    };
  });

  // X軸、Y軸のラベルの範囲を最小、最大値から設定する
  x.domain(d3.extent(data, function(d) {
    return d.year;
   }));

  y.domain([
    d3.min(industries, function(j) { return d3.min(j.values, function(v) { return v.GDP; }); }),
    d3.max(industries, function(j) { return d3.max(j.values, function(v) { return v.GDP; }); })
  ]);

  // X, Y軸に単位を追加
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("10億円");

   var industry = svg.selectAll(".industry")
      .data(industries)
    .enter().append("g")
      .attr("class", "industry");

  // 各業種毎のライン
  industry.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  // 各ラインの業種
  industry.append("text")
    .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.GDP) + ")"; })
    .attr("x", 3)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });
});
})();
