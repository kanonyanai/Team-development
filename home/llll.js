let marker = [];
let infoWindow = [];
let markerData = [];

// 地図初期表示
function initMap() {

  const target = document.getElementById('target');
  const centerp = {lat: 37.67229496806523, lng: 137.88838989062504};

  map = new google.maps.Map(target, {
    center: centerp,
    zoom: 5,
  });

  // Function:地図データの取得
  getMapdata();

}

// Function:地図データの取得
function getMapdata(){

  //APIにてデータを取得して、位置とマーカーをセットするfunctionを呼び出す
  const request = new XMLHttpRequest();
  const bookid = '1qneiQqjKGuETplJ3te9rQkEIq7nonzuxm56uGNA3syU'; //スプレッドシートのID
  const sheetname = 'slist1';  //使うシートの名前
  const googleapi = 'AIzaSyDCxB7soVwXRhs9uoztFPbTi3FveFDtYzw';//スプレッドシートのAPIキー
  
  const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + bookid + '/values/' + sheetname + '?key=' + googleapi;
  //トータルでのアクセスURL

  request.open('GET', url, true);
  request.responseType = 'json';

  request.onload = function () {
    const data = this.response;     // 取得できた値を格納
    markerData = parseData(data);   // Function:データ変換
    setData(markerData);            // Function:位置とマーカーをセット
  };

  request.send();

}

// Function:データ変換
function parseData(data) {
  const keys = data.values[0];
  const parsemarkerData = [];
  data.values.forEach(function(value, i) {
    if (i > 0) {
      const hash = {};
      value.forEach(function(d, j) {
        hash[keys[j]] = d;
      });
      parsemarkerData.push(hash);
    }
  });
  return parsemarkerData;
}

// Function:位置とマーカーをセット
function setData(markerData){

  // 初期化
  let sidebar_html = "";
  marker = [];

  for (let i = 0; i < markerData.length; i++) {

    // マーカー位置のセット
    const markerLatLng = new google.maps.LatLng({
      lat: Number(markerData[i]['lat']),
      lng: Number(markerData[i]['lng'])
    });

    // マーカーアイコンのセット
    const tagno = markerData[i]['tag'].charAt(0)
    iconcolor = './icon_tag/tag' + tagno + '.png'
    const icon = new google.maps.MarkerImage(iconcolor);

    // マーカーのセット
    marker[i] = new google.maps.Marker({
      position: markerLatLng,          // マーカーを立てる位置を指定
      map: map,                        // マーカーを立てる地図を指定
      icon: icon                       // アイコン指定
    });

    // 吹き出しへのデータセット
    const done = markerData[i]['done'];
    const tag = markerData[i]['tag'];
    const name = markerData[i]['name'];
    const img = markerData[i]['img'];

    let setHtml;
    if (done === 'y'){
      setHtml = tag + '<br><br>' + name + '<br><img src=' + img + ' width="200" height="150"><br>';
    } else {
      setHtml = tag + '<br><br>' + name + '<br><br>';
    }

    // 吹き出しのセット
    infoWindow[i] = new google.maps.InfoWindow({
      content: setHtml
    });

    
    // Function:マーカーにクリックイベントを追加
    markerEvent(i);
  }

}

// Function:マーカーにクリックイベントを追加
function markerEvent(i) {
  marker[i].addListener('click', function() {
    myclick(i);     // Function: 吹き出しのオープン・クローズ
  });
}

// Function: 吹き出しのオープン・クローズ
let openWindow;
function myclick(i) {
  if(openWindow){
    openWindow.close();
  }
  infoWindow[i].open(map, marker[i]);
  openWindow = infoWindow[i];
}


  // 地図の初期表示
  const target = document.getElementById('target');
  const centerp = {lat: 37.67229496806523, lng: 137.88838989062504};

  map = new google.maps.Map(target, {
    center: centerp,
    zoom: 5,
  });

  // Function:位置とマーカーをセット（タグを絞り込みしたデータ）
  setData(tagmarkerData);


