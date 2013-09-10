(function(){

    // CSV読込
    d3.csv("http://tenten0213.github.io/slide/introduction_to_d3.js/graph/sales.csv", function(data) {
        nv.addGraph(function() {

            // X軸、Y軸に設定する項目と、表示範囲、色の設定
            var chart = nv.models.lineChart()
              .x(function(d) { return d["年"]; })
              .y(function(d) { return d["GDP"]; })
              .yDomain([0,140000])
              .color(d3.scale.category10().range());

            // データをnvd3.js用に整形
            var keys = d3.keys(data[0]).filter(function(key) { return key !== "年"; });
            data = $.map(keys, function(key){ return {"key": key, "values": $.map(data, function(row) { return {"年":parseInt(row["年"]), "GDP":parseInt(row[key])}; })};})

            // チャート作成
            d3.select('#graph svg')
              .datum(data)
              .transition().duration(2000) //指定した時間をかけて描画する
              .call(chart);

            return chart;
        });
    });
})();

