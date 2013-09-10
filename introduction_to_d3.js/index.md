% Headers
title: 明日から使えるD3.js
author: @tenten0213
cover: d3.png
lang: ja
% Slides Start

# D3.jsとは？

<link type="text/css" rel="stylesheet" href="../stylesheets/bootstrap-button.min.css"/>
<link href='http://fonts.googleapis.com/css?family=Source+Code+Pro:300,400' rel='stylesheet' type='text/css'>
<link type="text/css" rel="stylesheet" href="../syntaxhighlighter_2.1.382/styles/shCore.css"/>
<link type="text/css" rel="stylesheet" href="../syntaxhighlighter_2.1.382/styles/shThemeSolarized-light.css"/>
<style type="text/css">
.slide P {
margin: 0 0 5px;
}
.slide HEADER {
margin: 0 0 15px;
}

</style>

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" charset="utf-8"></script>
<script type="text/javascript" src="../syntaxhighlighter_2.1.382/scripts/shCore.js"></script>
<script type="text/javascript" src="../syntaxhighlighter_2.1.382/scripts/shBrushXml.js"></script>
<script type="text/javascript" src="../syntaxhighlighter_2.1.382/scripts/shBrushJScript.js"></script>
<script type="text/javascript" src="../javascripts/imgLiquid-min.js"></script>

<script type="text/javascript">
  SyntaxHighlighter.defaults['gutter'] = false;
  SyntaxHighlighter.config.clipboardSwf = '../syntaxhighlighter_2.1.382/scripts/clipboard.swf';
  SyntaxHighlighter.all();
  $(function() {
      $(".imgLiquidFill").imgLiquid({
          fill: true,
          horizontalAlign: "center",
          verticalAlign: "top"
      });
      $(".imgLiquidNoFill").imgLiquid({
          fill: false,
          horizontalAlign: "center",
          verticalAlign: "50%"
      });
      
  });
</script>

* 任意のデータをDOMと結合させ、データ駆動によりHTMLやSVGを作成することができるJavaScriptライブラリ
* [http://d3js.org/](http://d3js.org/)

<div class="imgLiquidNoFill imgLiquid" style="width:700; height:300px; float:right;">
  <img alt="D3.js" src="pictures/D3js.jpg" />
</div>

# 特徴
* 修正BSDライセンス(商用利用可能)
* 豊富なサンプル、ドキュメント
* インタラクティブなグラフの作成や、アニメーションを付けたい場合にオススメ
* jQueryライクなセレクタ(ドットによるメソッドチェイン)
  * jQueryを使い慣れている人には取っ付き易い

# 前提知識
* HTML5
	* DOM構造
* CSS3
* JavaScript
	* jQuery
* SVG  
まったく知らないという状態じゃなければ大丈夫！だと思います...

# Galleryを見てみよう！
* [https://github.com/mbostock/d3/wiki/Gallery](https://github.com/mbostock/d3/wiki/Gallery)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px; float:right;">
  <img alt="gallery" src="pictures/gallery.png" />
</div>

# 例えば、Line Chart
* [http://bl.ocks.org/mbostock/3883245](http://bl.ocks.org/mbostock/3883245)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px; float:right;">
  <img alt="Line Chart" src="pictures/linechart.png" />
</div>

# コードの説明
Line Chartを描くにはこんな感じです。

<pre class="brush: js">
// marginの設定
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// 日付の表示形式の設定
var parseDate = d3.time.format("%d-%b-%y").parse;
</pre>

# コードの説明
<pre class="brush: js">
// X軸、Y軸の設定
var x = d3.time.scale()
  .range([0, width]);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

</pre>

# コードの説明
<pre class="brush: js">
// Line要素の生成
var line = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.close); });

// SVG領域の生成
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");
</pre>

# コードの説明
<pre class="brush: js">
// データ取得
d3.tsv("data.tsv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  // X軸、Y軸の範囲指定
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  // X軸の描画
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
</pre>

# コードの説明
<pre class="brush: js">
  // Y軸の描画
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

  // Lineの描画
  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
});
</pre>

# 意外と大変
ﾑｽﾞｶｼｲ(´・ω・｀)
<br><br>
グラフを描くための大体の流れや、コード量を感じ取ってもらえばと思います。  
もっと簡単にグラフを書きたい方は、おまけでライブラリを紹介しますので、そちらをご参照ください。

# D3.jsを始めよう

Galleryにあるサンプルは綺麗で参考にはなるのですが、  
複雑です。  
まずは基礎から見ていきましょう。

# D3.jsを利用するには
* [D3.js](http://d3js.org/)のサイトからzipファイルを取得
* [Github](https://github.com/mbostock/d3) から取得
* 以下を記述

<pre class="brush: html">
  <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
</pre>

# DOMの操作 - セレクション
* D3.jsはjQueryの様なセレクタを提供している
* 操作対象の任意のノードセットをセレクションと呼ぶ
* メソッドチェインが可能
* 通常のDOM APIを用いた操作と異なり容易  
* jQueryだとこんな感じ  
  * ulタグの子要素にあるhogeクラスの要素を選択

<pre class="brush: js">
$("ul").children(".hoge")
</pre>

# DOM APIだと

<pre class="brush: js">
var paragraphs = document.getElementsByTagName("p");

for (var i = 0; i < paragraphs.length; i++) {
  var paragraph = paragraphs.item(i);
  paragraph.style.setProperty("color", "white", null);
}
</pre>
[http://d3js.org/](http://d3js.org/)

# D3セレクタだと

<pre class="brush: js">
d3.selectAll("p").style("color", "white");
</pre>
[http://d3js.org/](http://d3js.org/)

楽ちんですね！

# 要素の選択(select)

<div>
  <div id="TEXT1">
    <p>
      Hello! D3.js＼(^o^)／
    </p>
  </div>
<pre class="brush: html">
  <div id="TEXT1">
    <p>
      Hello! D3.js＼(^o^)／
    </p>
  </div>
</pre>

<button class="btn btn-info" onclick="
  d3.select('#TEXT1').style('background-color', 'black')">
  toBgBlack
</button>
<button class="btn btn-danger" onclick="
  d3.select('#TEXT1').style('background-color', 'white')">
  reset
</button>
<pre class="brush: js">
  d3.select('#TEXT1').style('background-color', 'black');
</pre>
</div>

# 全ての要素を選択する(selectAll)

<div>
  <div id="TEXT2">
    <p>
      Hello! D3.js＼(^o^)／
    </p>
    <p>
      (๑･ิω･ิ๑)yー～
    </p>
  </div>
<button class="btn btn-info" onclick="
  d3.select('#TEXT2').selectAll('p').style('color', 'red')">
  toTextRed
</button>
<button class="btn btn-danger" onclick="
  d3.select('#TEXT2').selectAll('p').style('color', 'black')">
  reset
</button>
<pre class="brush: js">
  d3.select('#TEXT2').selectAll('p').style('color', 'red');
</pre>

</div>

# 要素の追加と削除(append,remove)

<div id="appendAndRemove"></div>
⇧に以下のdivタグがあります。
<div>
<pre class="brush: html">
  <div id="appendAndRemove"></div>
</pre>
<button class="btn btn-info" onclick="
  d3.select('#appendAndRemove').append('p').text('ｷﾀ━(ﾟ∀ﾟ)━!')">
  append
</button>
<button class="btn btn-danger" onclick="
  d3.select('#appendAndRemove').selectAll('p').node().remove()">
  remove
</button>

<pre class="brush: js">
  d3.select('#appendAndRemove').append('p').text('ｷﾀ━(ﾟ∀ﾟ)━');
</pre>
<pre class="brush: js">
  d3.select('#appendAndRemove').selectAll('p').node().remove();
</pre>

</div>


# データバインディング(update)

<pre class="brush: html">
  <div id="fruits">
    <p>リンゴ</p>
    <p>オレンジ</p>
    <p>バナナ</p>
  </div>
</pre>
<pre class="brush: js">
    var fruits = ["Apple", "Orange", "Banana"];
</pre>

全てのp要素を配列fruitsの内容で上書きします。


# データバインディング(update)

<div id="fruits1">
    <p>リンゴ</p>
    <p>オレンジ</p>
    <p>バナナ</p>
</div>
<pre class="brush: js">
    var fruits = ["Apple", "Orange", "Banana"];
    var p = d3.select('#fruits').selectAll('p');
    p.data(fruits).text(function(d) {return d;});
</pre>

<div>
<script>
  function updateFruits(){
    var fruits = ["Apple", "Orange", "Banana"];
    var p = d3.select('#fruits1').selectAll('p');
    p.data(fruits).text(function(d) {return d;});
  }
  function updateFruitsReset(){
    var fruits = ["リンゴ", "オレンジ", "バナナ"];
    var p = d3.select('#fruits1').selectAll('p');
    p.data(fruits).text(function(d) {return d;});
  }
</script>
<button class="btn btn-info" onclick="updateFruits()">
  update
</button>
<button class="btn btn-danger" onclick="updateFruitsReset()">
  reset
</button>
</div>

# データバインディング(enter)

<pre class="brush: html">
  <div id="fruits">
    <p>リンゴ</p>
    <p>オレンジ</p>
    <p>バナナ</p>
  </div>
</pre>
<pre class="brush: js">
    var fruits = ["Apple", "Orange", "Banana", "strowberry"];
</pre>

p要素の数より配列fruitsの要素数が多いので、多い分は追加します。


# データバインディング(enter)

<div id="fruits2">
  <p>リンゴ</p>
  <p>オレンジ</p>
  <p>バナナ</p>
</div>
<pre class="brush: js">
var fruits = ["Apple", "Orange", "Banana", "strowberry"];
var p = d3.select('#fruits').selectAll('p');
var update = p.data(fruits);
var enter = update.enter();
update.text(function(d) {return d;});
enter.append('p').text(function(d) {return d;});
</pre>

<div>
<script>
  function enterFruits() {
    var fruits = ["Apple", "Orange", "Banana", "strowberry"];
    var p = d3.select('#fruits2').selectAll('p');
    var update = p.data(fruits);
    var enter = update.enter();
    update.text(function(d) {return d;});
    enter.append('p').text(function(d) {return d;});
  }
  function enterFruitsReset() {
    var fruits = ["リンゴ", "オレンジ", "バナナ"];
    var p = d3.select('#fruits2').selectAll('p');
    var update = p.data(fruits);
    var exit = update.exit();
    exit.remove();
    update.text(function(d) {return d;});
  }
</script>
<button class="btn btn-info" onclick="enterFruits()">
  enter
</button>
<button class="btn btn-danger" onclick="enterFruitsReset()">
  reset
</button>
</div>

# データバインディング(enter)

要素がまだ無い場合

<div id="empty"></div>

<pre class="brush: html">
  <div id="empty"></div>
</pre>
<pre class="brush: js">
var fruits = ["Apple", "Orange", "Banana"];
var p = d3.select('#empty').selectAll('p');
var enter = p.data(fruits).enter();
enter.append('p').text(function(d) {return d;});
</pre>

<div>
<script>
  function enterFruitsToEmptyDiv() {
    var fruits = ["Apple", "Orange", "Banana"];
    var p = d3.select('#empty').selectAll('p');
    var enter = p.data(fruits).enter();
    enter.append('p').text(function(d) {return d;});
  }
  function deleteEmptyDiv() {
    d3.select('#empty').selectAll('p').remove();
  }
</script>

<button class="btn btn-info" onclick="enterFruitsToEmptyDiv()">
  enter
</button>
<button class="btn btn-danger" onclick="deleteEmptyDiv()">
  reset
</button>
</div>

# データバインディング(exit)

<pre class="brush: html">
  <div id="fruits">
    <p>リンゴ</p>
    <p>オレンジ</p>
    <p>バナナ</p>
    <p>イチゴ</p>
  </div>
</pre>
<pre class="brush: js">
    var fruits = ["Apple", "Orange", "Banana"];
</pre>

p要素の数の方が配列fruitsの要素数より多いので、余るp要素を削除する

# データバインディング(exit)

<div id="fruits3">
  <p>リンゴ</p>
  <p>オレンジ</p>
  <p>バナナ</p>
  <p>イチゴ</p>
</div>
<pre class="brush: js">
    var fruits = ["Apple", "Orange", "Banana"];
    var p = d3.select('#fruits').selectAll('p');
    var update = p.data(fruits);
    var exit = update.exit();
    update.text(function(d) {return d;});
    exit.remove();
</pre>

<div>
<script>
  function exitFruits() {
    var fruits = ["Apple", "Orange", "Banana"];
    var p = d3.select('#fruits3').selectAll('p');
    var update = p.data(fruits);
    var exit = update.exit();
    update.text(function(d) {return d;});
    exit.remove();
  }
  function exitFruitsReset() {
    var fruits = ["リンゴ", "オレンジ", "バナナ", "イチゴ"];
    var p = d3.select('#fruits3').selectAll('p');
    var update = p.data(fruits);
    var enter = update.enter();
    enter.append('p').text(function(d) {return d;});
    update.text(function(d) {return d;});
  }
</script>
<button class="btn btn-info" onclick="exitFruits()">
  exit
</button>
<button class="btn btn-danger" onclick="exitFruitsReset()">
  reset
</button>
</div>

# SVGの生成
お待たせしましたm(__)m  
やっと描画のお話です。

<br>

SVG要素の生成は以下のように行います。

<pre class="brush: js">
var svg = d3.select("#graph").append("svg");
</pre>

以下のように描画するサイズを指定して生成することも出来ます。

<pre class="brush: js">
var svg = d3.select("#graph").append("svg").attr("width", 200).attr("height", 100);
</pre>

# 線を描いてみる(line)
<div id="line">
</div>

<div>
<script>
var svgLine = d3.select("#line").append("svg").attr("width", 777777700).attr("height", 400);

var data = [
  { "x": 100,   "y": 50},  { "x": 100,  "y": 400},
  { "x": 700,  "y": 400},{ "x": 100,   "y": 50}];

var line = d3.svg.line()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; })
  .interpolate("linear");

svgLine.append("path")
  .attr("d", line(data))
  .attr("stroke", "#e74c3c")
  .attr("stroke-width", 2)
  .attr("fill", "none");

</script>
</div>

# 線を描いてみる(line)

<pre class="brush: js">
var data = [
  { "x": 100,   "y": 50},  { "x": 100,  "y": 400},
  { "x": 700,  "y": 400},{ "x": 100,   "y": 50}];

var line = d3.svg.line()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; })
  .interpolate("linear");

svg.append("path")
  .attr("d", line(data))
  .attr("stroke", "#e74c3c")
  .attr("stroke-width", 2)
  .attr("fill", "none");
</pre>

# 棒を描いてみる(bar)

<div id="bar" style="margin-left:100px; margin-top:100px;">
</div>
<div>
<script>
var data = [ 2, 3, 5, 7, 11, 13, 17, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61];

d3.select("div#bar").selectAll("div")
  .data(data)
  .enter()
  .append("div")
    .style("display", "inline-block")
    .style("width", "20px")
    .style("margin-right", "2px")
    .style("background-color", "#9b59b6")
    .style("height", function(d) {
      var barHeight = d * 5;
      return barHeight + "px";
    });

</script>
</div>

# 棒を描いてみる(bar)
<pre class="brush: js">
var data = [ 2, 3, 5, 7, 11, 13, 17, 23, 29,
             31, 37, 41, 43, 47, 53, 59, 61 ];

d3.select("#bar").selectAll("div")
  .data(data)
  .enter()
  .append("div")
    .style("display", "inline-block")
    .style("width", "20px")
    .style("margin-right", "2px")
    .style("background-color", "#9b59b6")
    .style("height", function(d) {
      var barHeight = d * 5;
      return barHeight + "px";
    });
</pre>


# 円を描いてみる(circle)

<div id="circle">
</div>
<div>
<script>
var svgCircle = d3.select("#circle").append("svg").attr("width",700).attr("height",400);
var circle = svgCircle.append("circle")
  .attr("cx",300)
  .attr("cy",200)
  .attr("r",180)
  .attr("fill","#28cca3")
  .attr("stroke","#2efac7")
  .attr("stroke-width",10);
</script>
</div>

# 円を描いてみる(circle)
<pre class="brush: js">
var svg = d3.select("#circle")
  .append("svg").attr("width",700).attr("height",400);
var circle = svg.append("circle")
  .attr("cx",300)
  .attr("cy",200)
  .attr("r",180)
  .attr("fill","#28cca3")
  .attr("stroke","#2efac7")
  .attr("stroke-width",10);
</pre>


# 円を動かしてみる(transition)

<div id="transition1">
</div>
<div>
  <script>
    var w = 700;
    var h = 300;
    var svgTransition1 = d3.select("#transition1").append("svg").attr("width", w).attr("height", h);
    var circle = svgTransition1.append("circle")
      .attr("cx",300)
      .attr("cy",200)
      .attr("r",80)
      .attr("fill","#f1c40f");

    function move(){
      circle.transition()
        .duration(800)
        .attr("cx", function() { return Math.random() * w; })
        .attr("cy", function() { return Math.random() * h; })
    }

    function bounce(){
      circle.transition()
        .duration(800)
        .attr("cx", function() { return Math.random() * w; })
        .attr("cy", function() { return Math.random() * h; })
        .ease("bounce")
    }

  </script>
  <button class="btn btn-info" onclick="move()"> move </button>
  <button class="btn btn-success" onclick="bounce()"> bounce </button>
</div>

# 円を動かしてみる(transition)
<pre class="brush: js">
circle
  // 円の遷移(transition)を設定する
  .transition()
  // どれくらいの時間をかけて行うか
  .duration(800)
  // ランダムに移動
  .attr("cx", function() { return Math.random() * w; })
  .attr("cy", function() { return Math.random() * h; })
  // イージング（モーションの加速、減速）のオプション
  .ease("bounce")
</pre>

# 要素生成時のアニメーション(transition)

<div id="transition2">
</div>
<div>
<script>

var w = 700;
var h = 300;

var radiuses = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
var color = ["#bdc3c7", "#f39c12", "#2ecc71", "#e74c3c", "#2c3e50",
             "#3498db", "#8e44ad", "#e67e22", "#1abc9c", "#f1c40f",
             "#2980b9", "#c0392b"];

var svgTransition2 = d3.select("#transition2").append("svg")
  .attr("width", w).attr("height", h);

function easeIn() {
  svgTransition2.selectAll("circle").remove();
  svgTransition2.selectAll("circle")
    .data(radiuses)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return Math.random() * w; })
      .attr("cy", function(d) { return Math.random() * h; })
      .attr("fill", function(d, i) { return color[i]; })
      .attr("r", 0)
    .transition()
    .delay(function(d, i) { return i * 200; })
    .duration(700)
    .ease("in")
    .attr("r", function(d) { return d; });
}

function easeBounce() {
  svgTransition2.selectAll("circle").remove();
  svgTransition2.selectAll("circle")
    .data(radiuses)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return Math.random() * w; })
      .attr("cy", function(d) { return Math.random() * h; })
      .attr("fill", function(d, i) { return color[i]; })
      .attr("r", 0)
    .transition()
    .delay(function(d, i) { return i * 200; })
    .duration(700)
    .ease("bounce")
    .attr("r", function(d) { return d; });
}

</script>

<button class="btn btn-info" onclick="easeIn()">
  in
</button>
<button class="btn btn-success" onclick="easeBounce()">
  bounce
</button>

</div>

# 要素生成時のアニメーション(transition)

<pre class="brush: js">
var w = 700;
var h = 300;

var radiuses = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
var color =
  ["#bdc3c7", "#f39c12", "#2ecc71", "#e74c3c", "#2c3e50",
   "#3498db", "#8e44ad", "#e67e22", "#1abc9c", "#f1c40f"];

var svg = d3.select("#transition").append("svg")
  .attr("width", w).attr("height", h);
</pre>

# 要素生成時のアニメーション(transition)
<pre class="brush: js">
svg.selectAll("circle")
  .data(radiuses)
  .enter()
  .append("circle")
    .attr("cx", function(d) { return Math.random() * w; })
    .attr("cy", function(d) { return Math.random() * h; })
    .attr("fill", function(d, i) { return color[i]; })
    // 半径を0に設定しておく(ease以下のattrで上書き)
    .attr("r", 0)
  .transition()
  // 円の生成タイミングをずらす
  .delay(function(d, i) { return i * 100; })
  .duration(1000)
  .ease("bounce")
    .attr("r", function(d) { return d; });
</pre>

# イベント設定(on)

<div id="on">
</div>

<div>
<script>

var w = 700;
var h = 300;

var radiuses2 = [13, 17, 23, 29, 43];
var color2 = ["#f1c40f","#1abc9c", "#2ecc71", "#3498db", "#9b59b6"];

var svgOn = d3.select("#on").append("svg")
  .attr("width", w).attr("height", h);

svgOn.selectAll("circle")
  .data(radiuses2)
  .enter()
  .append("circle")
    .attr("cx", function(d, i) { return 30 + ( i * 100); })
    .attr("cy", function(d) { return h / 2; })
    .attr("fill", function(d, i) { return color2[i]; })
    .attr("r", function(d) { return d; })
  .on("mouseover", function(d) {
    d3.select(this).attr("fill", "#2c3e50"); })
  .on("mouseout", function(d, i) {
    d3.select(this).attr("fill", color2[i]); })
  .on("click", function(d) {
    d3.select(this).remove(); });

function resetEvent(){
  d3.select("#on").selectAll("circle").remove();
  svgOn.selectAll("circle")
    .data(radiuses2)
    .enter()
    .append("circle")
      .attr("cx", function(d, i) { return 30 + ( i * 100); })
      .attr("cy", function(d) { return h / 2; })
      .attr("fill", function(d, i) { return color2[i]; })
      .attr("r", function(d) { return d; })
    .on("mouseover", function(d) {
      d3.select(this).attr("fill", "#2c3e50"); })
    .on("mouseout", function(d, i) {
      d3.select(this).attr("fill", color2[i]); })
    .on("click", function(d) {
      d3.select(this).remove(); });
}

</script>

<button class="btn btn-danger" onclick="resetEvent()">
  reset
</button>

</div>

# イベント設定(on)

<pre class="brush: js">
svg.selectAll("circle")
  .data(radiuses2).enter().append("circle")
    .attr("cx", function(d, i) { return 30 + ( i * 100); })
    .attr("cy", function(d) { return h / 2; })
    .attr("fill", function(d, i) { return color2[i]; })
    .attr("r", function(d) { return d; })

  // マウスオーバー時に円の色を変更
  .on("mouseover", function(d) {
    d3.select(this).attr("fill", "#2c3e50"); })

  // マウスアウト時に円の色を元の色に変更
  .on("mouseout", function(d, i) {
    d3.select(this).attr("fill", color2[i]); })

  // クリックされた円を削除
  .on("click", function(d) {
    d3.select(this).remove(); });
</pre>

# 表示比率(scale)

<div id="scale" style="margin-left:10px; margin-top:10px;">
</div>
<div>

<script>
var w = 700;
var h = 380;

var data = [ 2, 3, 5, 7, 11, 13, 17, 23, 29, 31, 37];

var svgScale = d3.select("div#scale").append("svg")
  .attr("width", w).attr("height", h);

var xScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, w])
  .nice();

svgScale.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", 0)
    .attr("y", function(d, i) { return i * 30; })
    .attr("width", function(d) { return xScale(d); })
    .attr("height", 20)
    .attr("fill", "#e67e22");

</script>
</div>

# 表示比率(scale)

<pre class="brush: js">
// linear:スケールの仕方
var xScale = d3.scale.linear()
  // 表示するデータの範囲を設定
  .domain([0, d3.max(data)])
  // 表示する領域を設定
  .range([0, w])
  // キリの良い数字にして表示
  .nice();

svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", 0)
    .attr("y", function(d, i) { return i * 30; })
    // 表示領域の幅とデータから表示する棒の幅を設定
    .attr("width", function(d) { return xScale(d); })
    .attr("height", 20)
    .attr("fill", "#e67e22");
</pre>

# 軸の作成(axis)

<div id="axis" style="margin-left:10px; margin-top:10px;">
</div>
<div>

<script>
var w = 700;
var h = 380;
var padding = 20;

var data = [ 2, 3, 5, 7, 11, 13, 17, 23, 29, 31, 37];

var svgAxis = d3.select("div#axis").append("svg")
  .attr("width", w).attr("height", h);

var xScale2 = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([padding, w - padding])
  .nice();

var xAxis = d3.svg.axis()
  .scale(xScale2)
  .orient("bottom");

svgAxis.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h-20) + " )")
  .attr("font-size", "14px")
  .attr("fill", "none")
  .attr("stroke", "black")
  .call(xAxis);

svgAxis.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", padding)
    .attr("y", function(d, i) { return i * 30; })
    .attr("width", function(d) { return xScale2(d) - padding; })
    .attr("height", 20)
    .attr("fill", "#2980b9");

</script>
</div>


# 軸の作成(axis)
<pre class="brush: js">
// 軸の両サイドのラベル文字が切れないようにpaddingを設定
var padding = 20;

var xAxis = d3.svg.axis()
  .scale(xScale)
  // 目盛を出す方向
  .orient("bottom");

svgAxis.append("g")
  .attr("class", "axis")
  // 軸を高さ-20pxに移動
  .attr("transform", "translate(0," + (h-20) + " )")
  .attr("font-size", "14px")
  .attr("fill", "none")
  .attr("stroke", "black")
  .call(xAxis);

</pre>

# scaleの種類(scale)

<div id="scaleType" style="margin-left:10px; margin-top:10px;">
</div>
<div>

<script>
var w = 700;
var h = 320;
var padding = 20;

var data = [ 2, 3, 5, 7, 11, 13, 17, 23, 29];

var svgScaleType = d3.select("div#scaleType").append("svg")
  .attr("width", w).attr("height", h);

var xScale3 = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([padding, w - padding])
  .nice();

var xAxis2 = d3.svg.axis()
  .scale(xScale3)
  .orient("bottom");

svgScaleType.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h-20) + " )")
  .attr("font-size", "14px")
  .attr("fill", "none")
  .attr("stroke", "black")
  .call(xAxis2);

svgScaleType.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", padding)
    .attr("y", function(d, i) { return i * 30; })
    .attr("width", function(d) { return xScale3(d) - padding; })
    .attr("height", 20)
    .attr("fill", "#1abc9c");

function scaleLinear() {
  d3.select("div#scaleType").selectAll("rect").remove();
  d3.select("div#scaleType").selectAll("g").remove();
  var xScale3 = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([padding, w - padding])
    .nice();

  var xAxis2 = d3.svg.axis()
    .scale(xScale3)
    .orient("bottom");

  svgScaleType.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h-20) + " )")
    .attr("font-size", "14px")
    .attr("fill", "none")
    .attr("stroke", "black")
    .call(xAxis2);

  svgScaleType.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", padding)
      .attr("y", function(d, i) { return i * 30; })
      .attr("width", function(d) { return xScale3(d) - padding; })
      .attr("height", 20)
      .attr("fill", "#1abc9c");
}

function scaleSqrt() {
  d3.select("div#scaleType").selectAll("rect").remove();
  d3.select("div#scaleType").selectAll("g").remove();
  var xScale3 = d3.scale.sqrt()
    .domain([0, d3.max(data)])
    .range([padding, w - padding])
    .nice();

  var xAxis2 = d3.svg.axis()
    .scale(xScale3)
    .orient("bottom");

  svgScaleType.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h-20) + " )")
    .attr("font-size", "14px")
    .attr("fill", "none")
    .attr("stroke", "black")
    .call(xAxis2);

  svgScaleType.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", padding)
      .attr("y", function(d, i) { return i * 30; })
      .attr("width", function(d) { return xScale3(d) - padding; })
      .attr("height", 20)
      .attr("fill", "#1abc9c");
}

</script>
<button class="btn btn-info" onclick="scaleLinear()">
  Linear
</button>
<button class="btn btn-success" onclick="scaleSqrt()">
  Square Root
</button>

</div>

# scaleの種類(scale)

<pre class="brush: js">
  // 均等目盛
  var xScale = d3.scale.linear()
  // 開平目盛
  // var xScale = d3.scale.sqrt()
    .domain([0, d3.max(data)])
    .range([padding, w - padding])
    .nice();
</pre>


# D3.jsのレイアウト

Galleryにあったように、D3.jsでは複雑なグラフを作成することが出来ます。  
D3.jsでは複雑なグラフのレイアウトをあらかじめ提供していますので、紹介します。  

それぞれ使い方が異なりますので、APIリファレンスやサンプルから使い方を理解してください。

# D3.jsのレイアウト(Bundle)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="bundle" src="pictures/bundle.png" />
</div>

https://github.com/mbostock/d3/wiki/Bundle-Layout

# D3.jsのレイアウト(Chord)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="chord" src="pictures/chord.png" />
</div>

https://github.com/mbostock/d3/wiki/Chord-Layout

# D3.jsのレイアウト(Cluster)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="cluster" src="pictures/cluster.png" />
</div>

https://github.com/mbostock/d3/wiki/Cluster-Layout

# D3.jsのレイアウト(Force)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="force" src="pictures/force.png" />
</div>

https://github.com/mbostock/d3/wiki/Force-Layout

# D3.jsのレイアウト(Histogram)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="histogram" src="pictures/histogram.png" />
</div>

https://github.com/mbostock/d3/wiki/Histogram-Layout

# D3.jsのレイアウト(Pack)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="pack" src="pictures/pack.png" />
</div>

https://github.com/mbostock/d3/wiki/Pack-Layout

# D3.jsのレイアウト(Partition)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="partition" src="pictures/partition.png" />
</div>

https://github.com/mbostock/d3/wiki/Partition-Layout

# D3.jsのレイアウト(Pie)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="pie" src="pictures/pie.png" />
</div>

https://github.com/mbostock/d3/wiki/Partition-Layout

# D3.jsのレイアウト(Stack)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="stack" src="pictures/stack.png" />
</div>

https://github.com/mbostock/d3/wiki/Stack-Layout

# D3.jsのレイアウト(Tree)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="tree" src="pictures/diagonal.png" />
</div>

https://github.com/mbostock/d3/wiki/Tree-Layout

# D3.jsのレイアウト(Treemap)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:300px;">
  <img alt="treemap" src="pictures/treemap.png" />
</div>

https://github.com/mbostock/d3/wiki/Treemap-Layout


# Demo - 説明

* CSVダウンロード機能を持った既存の画面に対し、グラフ表示機能を追加するシーンを想定

# Demo - CSVダウンロード画面

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:400px;">
  <img alt="csv_app" src="pictures/csv_app.png" />
</div>

# Demo - データ

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:400px;">
  <img alt="csv" src="pictures/csv.png" />
</div>

# [Demo(D3.js)](./graph/d3/)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:400px;">
  <img alt="d3" src="pictures/sample_d3.jpg" />
</div>

# Demo(D3.js) - Code

<pre class="brush: js">
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

</pre>

# Demo(D3.js) - Code

<pre class="brush: js">

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
    .attr("transform", 
      "translate(" + margin.left + "," + margin.top + ")");
</pre>

# Demo(D3.js) - Code

<pre class="brush: js">

d3.csv("http://example.com/sales/csv", function(error, data) {
  // ドメイン毎の色の設定
  // filterでheaderのkeyが"年"のカラムを取り除く
  color.domain(d3.keys(data[0])
    .filter(function(key) { return key !== "年"; }));

  data.forEach(function(d) {
    // Date形式にparse
    d.year = d3.time.format("%Y").parse(d["年"]); });

  var industries = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {year: d.year, GDP: +d[name]}; })
    }; });
</pre>

# Demo(D3.js) - Code

<pre class="brush: js">
  // X軸、Y軸のラベルの範囲を最小、最大値から設定する
  x.domain(d3.extent(data, function(d) { return d.year; }));

  y.domain([
    d3.min(industries, function(j) {
      return d3.min(j.values, function(v) { return v.GDP; }); }),
    d3.max(industries, function(j) {
      return d3.max(j.values, function(v) { return v.GDP; }); })
  ]);

</pre>

# Demo(D3.js) - Code
<pre class="brush: js">

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

</pre>

# Demo(D3.js) - Code
<pre class="brush: js">
var industry = svg.selectAll(".industry")
  .data(industries)
  .enter().append("g")
    .attr("class", "industry");

// 各業種毎のライン
industry.append("path")
  .attr("class", "line")
  .attr("d", function(d) { return line(d.values); })
  .style("stroke", function(d) { return color(d.name); });
</pre>

# Demo(D3.js) - Code
<pre class="brush: js">
// 各ラインの業種
industry.append("text")
  .datum(function(d) {
    return {name: d.name, value: d.values[d.values.length - 1]}; })
  .attr("transform", function(d) {
     return "translate(" + x(d.value.year) + "," + y(d.value.GDP) + ")"; })
  .attr("x", 3)
  .attr("dy", ".35em")
  .text(function(d) { return d.name; });
});
</pre>

ﾀｲﾍﾝﾀﾞ(´・ω・｀)  
まだアニメーションもつけてない…

# D3.js関連ライブラリ紹介
* [NVD3.js](http://nvd3.org/)
* [dimple](http://dimplejs.org/)
* [Rickshaw](http://code.shutterstock.com/rickshaw/)
* [dc.js](http://nickqizhu.github.io/dc.js/)

# [Demo(dimple)](./graph/dimple/)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:400px;">
  <img alt="dimple" src="pictures/sample_dimple.jpg" />
</div>

# [Demo(NVD3.js)](./graph/nvd3/)

<div class="imgLiquidNoFill imgLiquid" style="width:700px; height:400px;">
  <img alt="nvd3" src="pictures/sample_nvd3.jpg" />
</div>


# まとめ

* D3.jsを使えばリッチでインタラクティブなグラフが作れる
  * 楽しい(╹◡╹)
* なんでも出来過ぎる
  * API把握しきれない(´・ω・｀)
* シンプルなグラフを作成したい場合はdimple.jsやNVD3.jsなどの利用を検討してみる

# 参考
* [D3.js](http://d3js.org/)
* [公式チュートリアル](https://github.com/mbostock/d3/wiki/Tutorials)
* [Gallery](https://github.com/mbostock/d3/wiki/Gallery)
* [D3チュートリアル スコット・マレイ](http://ja.d3js.info/alignedleft/tutorials/d3/)
* [Daily D3](http://daily.d3js.info/)
* [ドットインストール-D3.js入門](http://dotinstall.com/lessons/basic_d3js)
* [d3.js - 三つの小円](http://ja.d3js.node.ws/document/tutorial/circle.html)
* [D3 - セレクションの仕組み](http://ja.d3js.info/mike/selection/)
