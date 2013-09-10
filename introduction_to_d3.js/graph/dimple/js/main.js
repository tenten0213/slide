(function(){
    // SVGのサイズなどを設定
    var svg = dimple.newSvg("#graph", 1000, 700);
    var margin = {top: 70, right: 10, bottom: 80, left: 100},
        width = 1000 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    // CSV読込
    d3.csv("../sales.csv", function (data) {

        // use Undersocre.js
        // data = _.flatten(_.map(data, function(row) { return _.map(_.filter(_.keys(row), function(key) { return key != "年"; }), function(key) { return {"Year": row["年"], "Type": key,"Value": row[key]}; }) }))

        // データをdimple.js用に整形
        data = $.map($.map(data, function(row) { return $.map(d3.keys(row).filter(function(key) { return key !== "年"; }), function(key) { return {"年": row["年"], "業種": key,"GDP": row[key]}; }) }),function(n){ return n;})

        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(margin.left, margin.top, width, height);

        // X軸の設定
        var x = myChart.addTimeAxis("x", "年", "%Y", "%Y");
        x.showGridlines = true;

        // Y軸の設定
        var y = myChart.addMeasureAxis("y", "GDP");
        y.showGridlines = true;

        // 設定しない場合は"140k"のように表示される(通常は%などを追加したい場合に利用)
        y.tickFormat = "";

        // ラインのプロット
        myChart.addSeries("業種", dimple.plot.line);

        // 凡例の追加
        var myLegend = myChart.addLegend(100, 10, 900, 40, "left");
        myChart.draw();

        // フォントサイズの変更
        myLegend.shapes.selectAll(".legendText").style("font-size", "12px");

        // X軸のテキスト（年）を斜めに回転
        x.shapes.selectAll("text").attr("transform",
          function (d) {
            return d3.select(this).attr("transform") + " translate(25, 40) rotate(-160)";
        });
    });
})();
