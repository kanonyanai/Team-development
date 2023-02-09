/*オートコンプリート機能を利用した予測変換と地図情報の取得*/
//デフォルトで表示するピンの情報
var map, begin, end, waypoint;
var directionsDisplay;
var directionsService;
var marker_d = [];
var marker_a = [];
var marker_e = [];
//ペンギンの位置情報のリンク
var penguin_url = "https://script.google.com/macros/s/AKfycbxHoTHnw1OCPXBGW7nBFqHRHlkxHReRxTk5FZMBhnd8Ixk3Rfr4a0PhNSvWbcFV6DfoeA/exec";
//危険地点のリンク
var danger_url = "https://script.google.com/macros/s/AKfycbznFU8308mD_BFMO_WP_SV7YzTB1qRm1v4TEpTq2Pwz7_DH0b-OnVuYpmdyxHiCV3BW/exec";
//エレベーターのリンク
var elevator_url = "https://script.google.com/macros/s/AKfycbwpBIVc-sRXevSZfHtcKSPpbjNyBo1cxFYcBS5D9WkUqw_IFZCA5MVvPazZTxdRD6lq/exec";
var infoWindow_d = [];

$(function () {
  $('#searchButton').click(function (e) {
    e.preventDefault();         // hrefが無効になり、画面遷移が行わない

    begin = $('#inputBegin').val();
    end = $('#inputEnd').val();
    waypoint = $('#inputStop').val();
    // ルート説明をクリア
    $('#directionsPanel').text(' ');

    google.maps.event.addDomListener(window, 'load', initialize(begin, end, waypoint));
    google.maps.event.addDomListener(window, 'load', calcRoute(begin, end, waypoint));
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
      const map = new google.maps.Map(document.getElementById("map"), {
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

      fetch(danger_url)
        .then(function (fetch_data) {
          return fetch_data.json();
        })
        .then(function (json) {
          //経路表示の際にピンの表示
          for (var i = 0; i < json.length; i++) {
            MyLatLng = new google.maps.LatLng({ lat: json[i].lat, lng: json[i].lng }); // 緯度経度のデータ作成
            marker_a[i] = new google.maps.Marker({ // マーカーの追加
              position: MyLatLng, // マーカーを立てる位置を指定
              map: map, // マーカーを立てる地図を指定
              icon: {
                url: './kikenpoint.png',
                scaledSize: new google.maps.Size(50, 50), //マーカーのサイズを縮小
              }
            });
          };
        });

      fetch(elevator_url)
        .then(function (fetch_data) {
          return fetch_data.json();
        })
        .then(function (json) {
          for (var i = 0; i < json.length; i++) {
            MyLatLng = new google.maps.LatLng({ lat: json[i].lat, lng: json[i].lng }); // 緯度経度のデータ作成
            marker_e[i] = new google.maps.Marker({ // マーカーの追加
              position: MyLatLng, // マーカーを立てる位置を指定
              map: map, // マーカーを立てる地図を指定
              icon: {
                url: './tyui.png',
                scaledSize: new google.maps.Size(25, 25), //マーカーのサイズを縮小
              }
            });
          };

        });

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
  if (waypoint !== "") {
    var request = {
      origin: begin,         // 開始地点
      destination: end,      // 終了地点
      waypoints: [{ location: waypoint }], // 経由地
      travelMode: google.maps.TravelMode.WALKING,     // [歩き]でのルート
    };
  }
  else {
    var request = {
      origin: begin,         // 開始地点
      destination: end,      // 終了地点
      travelMode: google.maps.TravelMode.WALKING,     // [歩き]でのルート
    };
  }
  // インスタンス作成
  directionsService = new google.maps.DirectionsService();

  directionsService.route(request, function (response, status) {
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

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.260260, lng: 140.879823 },
    zoom: 15,
    bounds: bounds,
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

  //ペンギン
  fetch(penguin_url)
    .then(function (fetch_data) {
      return fetch_data.json();
    })
    .then(function (json) {

      //サービス提供施設のマーカー設置処理
      for (var i = 0; i < json.length; i++) {
        MyLatLng = new google.maps.LatLng({ lat: json[i].lat, lng: json[i].lng }); // 緯度経度のデータ作成
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
          url: json[i].official_page,
          content: '<div class="sample">' + json[i].name + '<br/>' + json[i].Address + '<br/>' +
            json[i].detail + '<br/>' + "<a href =" + json[i].official_page + " target ='_blank'>" + 'ホームページはこちら' + '</a>' + '</div>' // 吹き出しに表示する内容
        });

        markerEvent(i); //マーカーにクリックイベントを追加
      };
    });

  //危険地点のピン
  fetch(danger_url)
    .then(function (fetch_data) {
      return fetch_data.json();
    })
    .then(function (json) {
      //経路表示の際にピンの表示
      for (var i = 0; i < json.length; i++) {
        MyLatLng = new google.maps.LatLng({ lat: json[i].lat, lng: json[i].lng }); // 緯度経度のデータ作成
        marker_a[i] = new google.maps.Marker({ // マーカーの追加
          position: MyLatLng, // マーカーを立てる位置を指定
          map: map, // マーカーを立てる地図を指定
          icon: {
            url: './kikenpoint.png',
            scaledSize: new google.maps.Size(50, 50), //マーカーのサイズを縮小
          }
        });
      };
    });


  //エレベーターのピン
  fetch(elevator_url)
    .then(function (fetch_data) {
      return fetch_data.json();
    })
    .then(function (json) {
      for (var i = 0; i < json.length; i++) {
        MyLatLng = new google.maps.LatLng({ lat: json[i].lat, lng: json[i].lng }); // 緯度経度のデータ作成
        marker_e[i] = new google.maps.Marker({ // マーカーの追加
          position: MyLatLng, // マーカーを立てる位置を指定
          map: map, // マーカーを立てる地図を指定
          icon: {
            url: './tyui.png',
            scaledSize: new google.maps.Size(25, 25), //マーカーのサイズを縮小
          }
        });
      };

    });

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

}
//マーカーのクリックイベントの処理
function markerEvent(i) {
  marker_d[i].addListener('click', function () { // マーカーをクリックしたとき
    infoWindow_d[i].open(map, marker_d[i]); // 吹き出しの表示
  });
}
//ここだけ？
document.getElementById('search').addEventListener('click', initAutocomplete(), {

})

//ソート機能
function goFilter2() {
  //　チェックされているチェックボックスの値を取得する
  let checkedValues = [];
  const inputs = document.querySelectorAll(".filter-input");
  for (let input of inputs) {
    if (input.checked) {
      checkedValues.push(input.value);
    }
  }

  // テーブルの行を取得する
  const list = document.querySelectorAll(".table-data");
  for (let row of list) {
    // 行のタグを配列として取得
    const rowTags = row.dataset.tags.split(",");

    let matchTags = [];
    for (let tag of rowTags) {
      // チェックされているタグに含まれていれば
      if (checkedValues.includes(tag)) {
        matchTags.push(tag);
      }
    }

    row.style = "";
    if (checkedValues.length !== matchTags.length) {
      row.style = "display: none;";
    }
  }
}
