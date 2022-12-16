<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<!--pc用とスマホ用に切り替えるボタンを付ける！-->


<!DOCTYPE html>
<html lang="ja">

<form method="post" action="">
  <head>
    <meta charset="UTF-8">
    <title>ベビーカー・車椅子地図マップ</title>
     

    <div class="h11">
        <h1>バリアフリーマップ</h1>
      </div>

      <div class="h22"><h2>ベビーカー・車いす利用者の不安を解消！</h2></div>
      
  </head>

  <body>

      <div>
        <button onclick="location.href='../Babycar_home/Babycar.html'"
          class="change_pc">PC用</button>       
      </div>



      <!--必ず入れる。idの名前は変えない！！！-->

      <div>
        <p id="start">出発地</p> 
        <input type="text" id="startword" placeholder="出発地を入力">
        <button type="submit" id="startconfirm">確定</button>
        <button type="reset" id="startclear">クリア</button>
      </div>

      <div>
        <p id="end">目的地</p> 
        <input type="search" id="endword" placeholder="目的地を入力">
        <button type="submit" id="endconfirm">確定</button>
        <button type="reset" id="endclear">クリア</button>
      </div>

      <!--ここまで-->

      

      <div>
        <input type="submit" id="submit" value="検索">
      </div>
      
      <div>        
        <input type="text"  id="search" placeholder="施設名を入力">      
      </div>     

      <div>
        <input type="button" onclick="location.href='C:/Users/190806/Team-development-10/opinion/opinion.html'"
        value="ご意見はこちらへ">
      </div>

  </body>


    <div id="map" ></div>
    <script type="text/javascript">
      function initMap() {
          map = new google.maps.Map(document.getElementById("map"),{
          zoom: 15,
          center:{lat: 38.260247,lng: 140.879723},
          mapId: '39f262e385f01678'
        });
      }
      </script>
    <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_Gakxu8FkBHY5fuXiJWq7smmLFXjUctg&callback=initMap">
    </script>



      <link rel="stylesheet" href="Babycar_pc.css">

      <!--phoneの仮のcss指定-->
      <!--<link rel="stylesheet" href="Babycar_phone.css">-->

    </form>

</html>