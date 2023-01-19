
    //var Array = [];//リストを作成
    
    function goFilter2(){
        
      
            var wTable = document.getElementById("sortTable");
        
        
            var value1  = '';
        
            // --- 選択されている商品のクラスを割り当てる ---
            if(document.getElementById("chkbaby").checked)    {value1 += ' k1';}
            if(document.getElementById("chkkuruma").checked){value1 += ' kuruma2';}
            if(document.getElementById("chkknyutenok").checked)     {value1 += ' knyutenok2';}
            if(document.getElementById("chkksheet").checked)    {value1 += ' ksheet2';}
            if(document.getElementById("chkdansang").checked)    {value1 += ' dansang2';}
            if(document.getElementById("chkbabyroom").checked)    {value1 += ' babyroom2';}
            if(document.getElementById("chkkidsroom").checked)    {value1 += ' kidsroom2';}
            if(document.getElementById("chkomutu").checked)    {value1 += ' omutu2';}
            if(document.getElementById("chkkyukei").checked)    {value1 += ' kyukei2';}
            if(document.getElementById("chktesuri").checked)    {value1 += ' tesuri2';}
            if(document.getElementById("chkosuto").checked)    {value1 += ' osuto2';}
            if(document.getElementById("chkkyugo").checked)    {value1 += ' kyugo2';}
            
        
            if(value1 == ''){
            // --- 未選択はクラスをクリア ---
            wTable.className = '';
            }
            
            else{
            // --- タイトル以外のTRを非表示＋指定属性を持つTRのみ表示 ---
            wTable.className = 'allNoDisplay2 ' + value1;

            var name2 = value1;
            var str1 = String(name2);  //valueの中の要素を文字列でもつ
            var result = str1.split(' ');//その文字列を１単語ずつに分ける

            //Array.push(str1);


            console.log(result);
            
           
           
           
            var mydiv1 = document.getElementById("id1")
            console.log(mydiv1.innerHTML);  //文字を取得

            var mydiv2 = document.getElementById("id2")
            console.log(mydiv2.innerHTML);  //文字数を取得 文字そのものも

            var mydiv3 = document.getElementById("id3")
            console.log(mydiv3.innerHTML);  //文字数を取得

            var mydiv4 = document.getElementById("id4")
            console.log(mydiv4.innerHTML);  //文字数を取得

            var mydiv5 = document.getElementById("id5")
            console.log(mydiv5.innerHTML);  //文字数を取得

            var mydiv6 = document.getElementById("id6")
            console.log(mydiv6.innerHTML);  //文字数を取得

            var mydiv7 = document.getElementById("id7")
            console.log(mydiv7.innerHTML);  //文字数を取得

            var mydiv8 = document.getElementById("id8")
            console.log(mydiv8.innerHTML);  //文字数を取得

            var mydiv9 = document.getElementById("id9")
            console.log(mydiv9.innerHTML);  //文字数を取得

            //あてはまる文字列が多いほど上に
        }
}
