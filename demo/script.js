function submitToAPI(e) {
    e.preventDefault();
    //設定したAPI GatewayのエンドポイントURLをここに入れます。
    var URL = "https://epgglro510.execute-api.ap-northeast-1.amazonaws.com/demo";

    //フォームの入力値をチェック
    var name = /[A-Za-z]{1}[A-Za-z]/;
    if (!name.test($("#name-input").val())) {
        alert("2文字以上記入してください。");
        return;
    }
    var subject = /[A-Za-z]{1}[A-Za-z]/;
    if (!subject.test($("#subject").val())) {
        alert("2文字以上記入してください。");
        return;
    }
    if ($("#email-input").val() == "") {
        alert("メールを入力してください。");
        return;
    }

    var email = /[A-Za-z]{1}[A-Za-z]/;
    if (!email.test($("#email-input").val())) {
        alert("メールアドレスは正しくありません。");
        return;
    }

    var name = $("#name-input").val();
    var subject = $("#subject").val();
    var email = $("#email-input").val();
    var desc = $("#description-input").val();
    var data = {
        name: name,
        subject: subject,
        email: email,
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