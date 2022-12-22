function submitToAPI(e) {
    e.preventDefault();
    //設定したAPI GatewayのエンドポイントURLをここに入れます。
    var URL = "https://epgglro510.execute-api.ap-northeast-1.amazonaws.com/demo";

    
   //コメントのテキストボックスと繋げる
    var desc = $(".textarea-con").val();
    var data = {
        desc: desc
    };

    $.ajax({
        type: "POST",
        //設定したAPI GatewayのエンドポイントURLをここに入れます。
        url: "https://epgglro510.execute-api.ap-northeast-1.amazonaws.com/demo",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),


        success: function() {
            // フォームをクリアし、送信成功のメッセージを表示する
            alert("メッセージが送信されました！");
            document.getElementById("contact-form").reset();
            location.reload();
        },
        error: function() {
            // 送信エラーのメッセージを表示する
            alert("メッセージ送信失敗！");
        }
    });
}