% Headers
title: 明日から使えるD3.js
author: @tenten0213
cover: d3.png
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

<div class="imgLiquidNoFill imgLiquid" style="width:600px; height:250px; float:right;">
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

# D3.jsの基礎
Galleryにあるサンプルは綺麗で参考にはなるのですが、  
複雑なのでまずは基礎から見ていきましょう。

![](pictures/complexity.jpg)

# これから説明すること
* セレクション
* 要素の追加
* メソッドチェイン
* Styleの設定 
* append,remove 
* データバインディング 
* update,enter,exit 
* 要素の描画 

# これから説明すること
* transition 
* イベント設定 
* scale 
* axis 
* D3.jsのレイアウト 
* 基本的なグラフの作成 
* Demo(説明もするし、3-5分) 
* CSVからグラフ描画 

# D3.jsを利用するには
* [D3.js](http://d3js.org/)のサイトからzipファイルを取得
* [Github](https://github.com/mbostock/d3) から取得
* 以下を記述

<pre class="brush: html">
  <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
</pre>

# セレクション
* D3はjQueryの様なセレクタを提供している
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

# select

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

<button class="btn btn-primary" onclick="
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

# selectAll

<div>
  <div id="TEXT2">
    <p>
      Hello! D3.js＼(^o^)／
    </p>
    <p>
      (๑･ิω･ิ๑)yー～
    </p>
  </div>
<button class="btn btn-primary" onclick="
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
⇧に以下のdivタグがいます
<div>
<pre class="brush: html">
  <div id="appendAndRemove"></div>
</pre>
<button class="btn btn-primary" onclick="
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

全てのp要素を配列fruitsの内容で上書きする


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
</script>
<button class="btn btn-info" onclick="updateFruits()">
  update
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

p要素の数より配列fruitsの要素数が多いので、多い分は追加する


# データバインディング(enter)

<div id="fruits">
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
    var p = d3.select('#fruits').selectAll('p');
    var update = p.data(fruits);
    var enter = update.enter();
    update.text(function(d) {return d;});
    enter.append('p').text(function(d) {return d;});
  }
</script>
<button class="btn btn-info" onclick="enterFruits()">
  enter
</button>
</div>

# データバインディング

要素がまだ無い場合

<pre class="brush: html">
  <div id="none"></div>
</pre>
<pre class="brush: js">
    var fruits = ["Apple", "Orange", "Banana"];
    var li = d3.select('#fruits').selectAll('li');
    li.data(fruits).text(function(d) {return d;});
</pre>

  <div id="none"></div>

# update,enter,exit

# 要素の描画

# transition

# イベント設定

# scale

# axis

# D3.jsのレイアウト

# 基本的なグラフの作成

# Demo(説明もするし、3-5分)

# CSVからグラフ描画

# 参考(公式)
* [D3.js](http://d3js.org/)
* [公式チュートリアル](https://github.com/mbostock/d3/wiki/Tutorials)
* [Gallery](https://github.com/mbostock/d3/wiki/Gallery)

# 日本語ドキュメント
* [D3.js(日本語)](http://ja.d3js.node.ws/)
* [D3チュートリアル スコット・マレイ](http://ja.d3js.info/alignedleft/tutorials/d3/)
* [Daily D3](http://daily.d3js.info/)
* [ドットインストール-D3.js入門](http://dotinstall.com/lessons/basic_d3js)

# 参考（あとで消す）
* [svg要素の基本的な使い方まとめ](http://www.h2.dion.ne.jp/~defghi/svgMemo/svgMemo_20.htm)
* [d3.js - 三つの小円](http://ja.d3js.node.ws/document/tutorial/circle.html)
* [コンソールでselect,data,enterメソッドを理解する](http://shimz.me/blog/d3-js/2619)
* [D3.jsとjQueryのセレクションメソッドの違い](http://shimz.me/blog/d3-js/2963)
* [D3 - セレクションの仕組み](http://ja.d3js.info/mike/selection/)
* [jsdo.it](http://jsdo.it/tag/d3.js)

# スコット・マレイのチュートリアル目次
* 要素の追加
* メソッドのチェイン
* データのバインディング
* データの使い方
* DIV 要素の描画
* data() の力

# スコット・マレイのチュートリアル目次
* SVG の基本
* SVG の描画
* データ型
* 棒グラフの作成
* 散布図の作成
* スケール
* 軸

# ドットインストール
* styleを設定してみよう
* append､removeを使ってみよう
* dataを使ってみよう
* update､enter､exitを理解しよう (1)
* update､enter､exitを理解しよう (2)
* SVG領域を設定してみよう
* データを使ってcircleを描画しよう

# ドットインストール
* transitionを使ってみよう
* eachを使ってみよう
* onでイベントを設定しよう
* 横棒グラフを描画してみよう
* scaleを使ってみよう
* axisを使ってみよう (1)
* axisを使ってみよう (2)

# svg要素の基本的な使い方まとめ
* svgによる図形の描画
* scaleオブジェクトによる値の変換
* attrメソッドの動作
* 基本的なグラフ作成
* D3.jsのレイアウト

# 【D3.js】超基本！ コンソールでselect,data,enterメソッドを理解する。
* データバインディング
* select
* data
* enter
