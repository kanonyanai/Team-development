var directions; //ルートのインスタンス
    var map;      //マップのインスタンス
    var ds = google.maps.DirectionsStatus;//ルート結果のステータス
    var directionsErr = new Array(); //ルート結果のエラーメッセージ
    directionsErr[ds.INVALID_REQUEST] = "指定された DirectionsRequest が無効です。";
    directionsErr[ds.MAX_WAYPOINTS_EXCEEDED] = "DirectionsRequest に指定された DirectionsWaypoint が多すぎます。ウェイポイントの最大許容数は 8 に出発地点と到着地点を加えた数です。";
    directionsErr[ds.NOT_FOUND] = "出発地点、到着地点、ウェイポイントのうち、少なくとも 1 つがジオコード化できませんでした。";
    directionsErr[ds.OVER_QUERY_LIMIT] = "ウェブページは、短期間にリクエストの制限回数を超えました。";
    directionsErr[ds.REQUEST_DENIED] = "ウェブページではルート サービスを使用できません。";
    directionsErr[ds.UNKNOWN_ERROR] = "サーバー エラーのため、ルート リクエストを処理できませんでした。もう一度試すと正常に処理される可能性があります。";
    directionsErr[ds.ZERO_RESULTS] = "出発地点と到着地点間でルートを見つけられませんでした。";
    
    // Onload時処理
    function initialize() {
        // ルートの生成
        directions = new google.maps.DirectionsService();
        // Google Mapで利用する初期設定用の変数
        var mapOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(38.260247,140.879723)
        };
        // GoogleMapの生成
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
    // [検索]ボタン処理
    function searchRoute() {
        // テキストボックスから検索の出発・到着を取得
        var origin = document.getElementById("origin").value;
        var destination = document.getElementById("destination").value;
        // ルート検索を依頼する
        directions.route(
            { // ルート リクエスト
              'origin'     : origin,     //出発地点
              'destination': destination,//到着地点
              'travelMode' : google.maps.DirectionsTravelMode.WALKING //ルートタイプ:徒歩
            },
            function(results, status) { // ルート結果callback関数
              if (status == ds.OK) {  // 結果がOK ??
                // ポリライン(折れ線)を生成し、マップに表示
                var poly = new google.maps.Polyline({
                  map: map,              //マップ
                  path: results.routes[0].overview_path,//ポリラインの座標の列
                  strokeWeight: 5,       //ストローク幅(ピクセル単位)
                  strokeColor: "#f01010",//16進数形式のストロークの色
                  strokeOpacity: 0.5     //ストロークの不透明度(0.0～1.0)
                });
                // 検索結果の中心設定
                map.setCenter(results.routes[0].bounds.getCenter());
              } else {
                  // 結果がOKではない場合
                  alert("ルート検索が失敗しました。理由: " + directionsErr[status]);
              }
            });
    }