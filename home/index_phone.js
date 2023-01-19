/*オートコンプリート機能を利用した予測変換と地図情報の取得*/
//デフォルトで表示するピンの情報
var map, begin, end, waypoint;
var directionsDisplay;
var directionsService;
var marker_d = [];
var marker_a = [];
var marker_e = [];
var infoWindow_d = [];
var dagerDate = [
  {
    lat: 38.259296,  lng: 140.880101
  },
  {
    lat: 38.259232, lng: 140.880762
  },
  {
    lat: 38.25941,	lng: 140.881189
  },
  {
    lat: 38.259266,	lng: 140.881311
  },
  {
    lat: 38.259631,	lng: 140.881012
  },
  {
    lat: 38.259266,	lng: 140.881311
  },
  {
    lat: 38.259631,	lng: 140.881012
  },
  {
    lat: 38.259537,	lng: 140.880497 

  },
  {
    lat: 38.259732,	lng: 140.880844 

  },
  {
    lat: 38.259992,	lng: 140.880723 

  },
  {
    lat: 38.259886,	lng: 140.880116 

  },
  {
    lat: 38.26003,	lng: 140.880789 

  },
  {
    lat: 38.260506,	lng: 140.881002 

  },
  {
    lat: 38.260489,	lng: 140.881794 

  },
  {
    lat: 38.260502,	lng: 140.881301 

  },
  {
    lat: 38.260261,	lng: 140.879488 

  },
  {
    lat: 38.261081,	lng: 140.880741 

  },
  {
    lat: 38.2614,	lng: 140.881849 

  },
  {
    lat: 38.261524,	lng: 140.880824 

  },
  {
    lat: 38.261672,	lng: 140.881636 

  },
  {
    lat: 38.261802,	lng: 140.881916 

  },
  {
    lat: 38.261796,	lng: 140.880774 

  },
  {
    lat: 38.261965,	lng: 140.880714 

  },
  {
    lat: 38.262465,	lng: 140.880878 

  },
  {
    lat: 38.263412,	lng: 140.880602 

  },
  {
    lat: 38.262939,	lng: 140.880979 

  },
  {
    lat: 38.263347,	lng: 140.881204 

  },
  {
    lat: 38.262941,	lng: 140.880981 

  },
  {
    lat: 38.259362,	lng: 140.883941 

  },
  {
    lat: 38.259528,	lng: 140.883989 

  },
  {
    lat: 38.259669,	lng: 140.884013 

  },
  {
    lat: 38.259262,	lng: 140.884332 

  },
  {
    lat: 38.25946,	lng: 140.883578 

  },
  {
    lat: 38.26072,	lng: 140.879917 

  },
  {
    lat: 38.260158,	lng: 140.879917 

  },
  {
    lat: 38.259458,	lng: 140.880597 

  },
  {
    lat: 38.260045,	lng: 140.875544 

  }
];
var elevatorDate = [
  {
    lat: 38.260137, lng: 140.879528
  },
  {
    lat: 38.259779, lng: 140.881742
  },
  {
    lat: 38.260334, lng: 140.879889
  },
  {
    lat: 38.260916, lng: 140.881815
  },
  {
    lat: 38.259826, lng: 140.881049
  },
  {
    lat: 38.259136, lng: 140.880721
  }
];
var markerData = [ // マーカーを立てる場所名・緯度・経度
  {
    name: '秋保温泉　ホテルきよ水',
    Address: '〒982-0244 宮城県仙台市太白区秋保町湯元字平倉1',
    detail: 'バリアフリー対応ユニバーサル和洋室自動ドア付トイレ,手すり付浴室,フラットな入口,車いす貸出',
    official_page: 'https://www.kiyo-mizu.jp/',
    lat: 38.23543186092411,
    lng: 140.70456511189812
  }, {
    name: '一苺一笑松森農場',
    Address: '〒981-3111 宮城県仙台市泉区松森字城前157-1',
    detail: 'ベビーカー入店可、車椅子での入店可能（貸出不可）',
    official_page: 'https://ichiichigo.jp/',
    lat: 38.31192992651354,
    lng: 140.9212697407362
  }, {
    name: '仙台市天文台',
    Address: '〒989-3123 宮城県仙台市青葉区錦ケ丘9-29-32',
    detail: '授乳室、オストメイト対応ひろびろトイレ、エレベーター、救護室',
    official_page: 'http://www.sendai-astro.jp/',
    lat: 38.25701117537709,
    lng: 140.75536778491642
  }, {
    name: '楽天生命パーク宮城',
    Address: '〒983-0045 宮城県仙台市宮城野区宮城野2-11-6',
    detail: '託児所、授乳室、車いす席',
    official_page: 'https://www.rakuteneagles.jp/stadium/',
    lat: 38.25664117783778,
    lng: 140.90268345608
  }, {
    name: '八木山動物公園フジサキの杜',
    Address: '〒982-0108 宮城県仙台市太白区八木山本町1-43',
    detail: 'ベビーカー貸出あり（150円）、おむつ交換シート（ひろびろトイレにあり）',
    official_page: 'https://www.city.sendai.jp/zoo/',
    lat: 38.24565631827855,
    lng: 140.84636141189833
  }, {
    name: '宮城県美術館',
    Address: '〒980-0861 宮城県仙台市青葉区川内元支倉34-1',
    detail: 'オストメイト対応多目的トイレ、車いす貸出、車いす対応エレベーター、自動ドアスロープ、ベビーカー貸出、授乳室、おむつ交換台',
    official_page: 'https://www.pref.miyagi.jp/site/mmoa/',
    lat: 38.2639165710877,
    lng: 140.85508641189887
  }, {
    name: '仙台うみの杜水族館',
    Address: '〒983-0013 宮城県仙台市宮城野区中野4-6',
    detail: '車いすの貸出、車いす利用可能トイレ、オストメイト対応トイレ、介護用ベッド、授乳室（ベビーベッド）',
    official_page: 'http://www.uminomori.jp/umino/index.html',
    lat: 38.27132056147977,
    lng: 140.9807388865904
  }, {
    name: '仙台PARCO2',
    Address: '〒980-0021 宮城県仙台市青葉区中央３丁目７−５',
    detail: '多目的トイレ（オストメイト対応）、車いす貸出し、ベビーカー貸出、ベビーカー休憩室',
    official_page: 'https://sendai.parco.jp/',
    lat: 38.259049926615056,
    lng: 140.8797022984077
  }
];

$(function () {
  $('#searchButton').click(function (e) {
    e.preventDefault();         // hrefが無効になり、画面遷移が行わない

    begin = $('#inputBegin').val();
    end = $('#inputEnd').val();
    waypoint  = $('#inputStop').val();
    // ルート説明をクリア
    $('#directionsPanel').text(' ');

    google.maps.event.addDomListener(window, 'load', initialize(begin, end, waypoint));
    google.maps.event.addDomListener(window, 'load', calcRoute(begin, end ,waypoint));
  });
});


function initialize(begin, end) {
  // インスタンス[geocoder]作成
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({
    // 起点のキーワード
    'address': begin

  }, function (result, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // 中心点を指定
      var latlng = result[0].geometry.location;

      // #map_canvasを取得し、[mapOptions]の内容の、地図のインスタンス([map])を作成する
      const map = new google.maps.Map(document.getElementById("map"),{
        //↓地図の表示を変更
        styles: [
          //全てのラベルを非表示
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
              { visibility: 'off' },
            ],
          },
        ]
      }
      );

      // 経路を取得
      directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('directionsPanel'));     // 経路詳細

      for (var i = 0; i < dagerDate.length; i++) {
        MyLatLng = new google.maps.LatLng({ lat: dagerDate[i]['lat'], lng: dagerDate[i]['lng'] }); // 緯度経度のデータ作成
        marker_a[i] = new google.maps.Marker({ // マーカーの追加
          position: MyLatLng, // マーカーを立てる位置を指定
          map: map, // マーカーを立てる地図を指定
          icon: {
            url: './kikenpoint.png',
            scaledSize: new google.maps.Size(50, 50), //マーカーのサイズを縮小
          }
        });
      };

      //エレベーターのピン
    for (var i = 0; i < elevatorDate.length; i++) {
      MyLatLng = new google.maps.LatLng({ lat: elevatorDate[i]['lat'], lng: elevatorDate[i]['lng'] }); // 緯度経度のデータ作成
      marker_e[i] = new google.maps.Marker({ // マーカーの追加
        position: MyLatLng, // マーカーを立てる位置を指定
        map: map, // マーカーを立てる地図を指定
        icon: {
          url: './tyui.png',
          scaledSize: new google.maps.Size(25, 25), //マーカーのサイズを縮小
        }
      });
    };

      // 場所
      $('#begin').text(begin);
      $('#end').text(end);
      $('#stop').val(waypoint);

    } else {
      alert('取得できませんでした…');
    }
  });
}

// ルート取得
function calcRoute(begin, end, waypoint) {
  if(waypoint !== ""){
  var request = {
      origin: begin,         // 開始地点
      destination: end,      // 終了地点
      waypoints: [{location: waypoint}], // 経由地
      travelMode: google.maps.TravelMode.WALKING,     // [歩き]でのルート
  };
}
else{
  var request = {
    origin: begin,         // 開始地点
    destination: end,      // 終了地点
    travelMode: google.maps.TravelMode.WALKING,     // [歩き]でのルート
};
}
  // インスタンス作成
  directionsService = new google.maps.DirectionsService();

  directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
      } else {
          alert('ルートが見つかりませんでした…');
      }
  });
}

function initAutocomplete() {
  var LatLngFrom = new google.maps.LatLng(38.370938, 140.590667);
  var LatLngTo = new google.maps.LatLng(38.158939, 141.028747);
  var bounds = new google.maps.LatLngBounds(LatLngFrom, LatLngTo);

  // gps に対応しているかチェック
  if (!navigator.geolocation) {
    alert('GPSに対応したブラウザでお試しください');
    return false;
  }

  alert('GPSデータを取得します...');

  // gps取得開始
  navigator.geolocation.getCurrentPosition(function (pos) {
    // gps 取得成功
    // google map 初期化
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 38.260260, lng: 140.879823 },
      zoom: 15,
      bounds: bounds,
      //↓地図の表示を変更
      styles: [
        //全てのラベルを非表示
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            { visibility: 'off' },
          ],
        },
      ]
    });

    // 現在位置にピンをたてる
    var icon_now = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    var currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    var currentMarker = new google.maps.Marker({
      position: currentPos,
      icon: icon_now

    });
    currentMarker.setMap(map);

    // 誤差を円で描く
    new google.maps.Circle({
      map: map,
      center: currentPos,
      radius: pos.coords.accuracy, // 単位はメートル
      strokeColor: '#0088ff',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#0088ff',
      fillOpacity: 0.2
    });

    // 現在地にスクロールさせる
    map.panTo(currentPos);
    //サービス提供施設のマーカー設置処理
    for (var i = 0; i < markerData.length; i++) {
      MyLatLng = new google.maps.LatLng({ lat: markerData[i]['lat'], lng: markerData[i]['lng'] }); // 緯度経度のデータ作成
      marker_d[i] = new google.maps.Marker({ // マーカーの追加
        position: MyLatLng, // マーカーを立てる位置を指定
        map: map, // マーカーを立てる地図を指定
        icon: {
          url: './BarrierFree.png',
          scaledSize: new google.maps.Size(40, 40), //マーカーのサイズを縮小
        }
      });
      //マーカーに表示する吹き出しの設定
      infoWindow_d[i] = new google.maps.InfoWindow({ // 吹き出しの追加
        url: markerData[i]['official_page'],
        content: '<div class="sample">' + markerData[i]['name'] + '<br/>' + markerData[i]['Address'] + '<br/>' +
          markerData[i]['detail'] + '<br/>' + "<a href =" + markerData[i]['official_page'] + " target ='_blank'>" + 'ホームページはこちら' + '</a>' + '</div>' // 吹き出しに表示する内容
      });

      markerEvent(i); //マーカーにクリックイベントを追加
    };


    //危険地点のピン
    for (var i = 0; i < dagerDate.length; i++) {
      MyLatLng = new google.maps.LatLng({ lat: dagerDate[i]['lat'], lng: dagerDate[i]['lng'] }); // 緯度経度のデータ作成
      marker_a[i] = new google.maps.Marker({ // マーカーの追加
        position: MyLatLng, // マーカーを立てる位置を指定
        map: map, // マーカーを立てる地図を指定
        icon: {
          url: './kikenpoint.png',
          scaledSize: new google.maps.Size(50, 50), //マーカーのサイズを縮小
        }
      });
    };
    //エレベーターのピン
    for (var i = 0; i < elevatorDate.length; i++) {
      MyLatLng = new google.maps.LatLng({ lat: elevatorDate[i]['lat'], lng: elevatorDate[i]['lng'] }); // 緯度経度のデータ作成
      marker_e[i] = new google.maps.Marker({ // マーカーの追加
        position: MyLatLng, // マーカーを立てる位置を指定
        map: map, // マーカーを立てる地図を指定
        icon: {
          url: './tyui.png',
          scaledSize: new google.maps.Size(25, 25), //マーカーのサイズを縮小
        }
      });
    };


    // 検索ボックスを作成し、UIとのリンク
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];

    // 予測変換を選択したときのイベント
    // 場所の詳細
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // 古いマーカーを消去
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // 場所ごとに、アイコン、名前、および場所を取得
      const bounds = new google.maps.LatLngBounds(LatLngFrom, LatLngTo);
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

        // マップ上にマーカーを表示
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // ジオコーダーのみが場所の情報を持つ
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      bounds.extend(marker.position);
      map.fitBounds(bounds);
    });

    // 予測変換
    const input_Begin = document.getElementById("inputBegin");
const input_End = document.getElementById("inputEnd");
const input_Stop = document.getElementById("inputStop");
const autocomplete_Begin = new google.maps.places.Autocomplete(input_Begin);
const autocomplete_End = new google.maps.places.Autocomplete(input_End);
const autocomplete_Stop = new google.maps.places.Autocomplete(input_Stop);
autocomplete_Begin.bindTo("bounds", map);
autocomplete_End.bindTo("bounds", map);
autocomplete_Stop.bindTo("bounds", map);

    //マーカーのクリックイベントの処理
    function markerEvent(i) {
      marker_d[i].addListener('click', function () { // マーカーをクリックしたとき
        infoWindow_d[i].open(map, marker_d[i]); // 吹き出しの表示
      });
    }
    //ここだけ？
    document.getElementById('search').addEventListener('click', initAutocomplete(), {

    })

  }, function () {
    // gps 取得失敗
    alert('GPSデータを取得できませんでした');

    return false;
  });


  function goFilter2() {
    var wTable = document.getElementById("sortTable");
    var value = '';

    // --- 選択されている商品のクラスを割り当てる ---
    if (document.getElementById("chkbaby").checked) { value += ' kbaby2'; }
    if (document.getElementById("chkkuruma").checked) { value += ' kuruma2'; }
    if (document.getElementById("chkknyutenok").checked) { value += ' knyutenok2'; }
    if (document.getElementById("chkksheet").checked) { value += ' ksheet2'; }
    if (document.getElementById("chkdansang").checked) { value += ' dansang2'; }
    if (document.getElementById("chkbabyroom").checked) { value += ' babyroom2'; }
    if (document.getElementById("chkkidsroom").checked) { value += ' kidsroom2'; }
    if (document.getElementById("chkomutu").checked) { value += ' omutu2'; }
    if (document.getElementById("chkkyukei").checked) { value += ' kyukei2'; }
    if (document.getElementById("chktesuri").checked) { value += ' tesuri2'; }
    if (document.getElementById("chkosuto").checked) { value += ' osuto2'; }
    if (document.getElementById("chkkyugo").checked) { value += ' kyugo2'; }



    if (value == '') {
      // --- 未選択はクラスをクリア ---
      wTable.className = '';
    } else {
      // --- タイトル以外のTRを非表示＋指定属性を持つTRのみ表示 ---
      wTable.className = 'allNoDisplay2 ' + value;
    }
  }
}
