
    
    
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
            wTable.className = 'allNoDisplay2 ' + value1; //wTable.classNameに入ったら表示

            var name2 = value1;
            var str1 = String(name2);  //valueの中の要素を文字列でもつ
            
            var result = str1.split(' ');//その文字列を１単語ずつに分けてresultリストに追加

           //console.log('aa' + result[1]);//確認

           
            var mydiv1 = document.getElementById("id1")//それぞれのタグを一つずつリストに追加
            var result1 = (mydiv1.innerHTML).split(' ');
            

            var mydiv2 = document.getElementById("id2")//それぞれのタグを一つずつリストに追加
            var result2 = (mydiv2.innerHTML).split(' ');
            
           // console.log(result2);

            var mydiv3 = document.getElementById("id3")//それぞれのタグを一つずつリストに追加
            var result3 = (mydiv3.innerHTML).split(' ');
           
           // console.log(result3);

            var mydiv4 = document.getElementById("id4")//それぞれのタグを一つずつリストに追加
            var result4 = (mydiv1.innerHTML).split(' ');
           // console.log(result4);

            var mydiv5 = document.getElementById("id5")//それぞれのタグを一つずつリストに追加
            var result5 = (mydiv5.innerHTML).split(' ');
            //console.log(result5);

            var mydiv6 = document.getElementById("id6")//それぞれのタグを一つずつリストに追加
            var result6 = (mydiv6.innerHTML).split(' ');
            //console.log(result6);

            var mydiv7 = document.getElementById("id7")//それぞれのタグを一つずつリストに追加
            var result7 = (mydiv7.innerHTML).split(' ');
            //console.log(result7);

            var mydiv8 = document.getElementById("id8")//それぞれのタグを一つずつリストに追加
            var result8 = (mydiv8.innerHTML).split(' ');
           // console.log(result8);

            var mydiv9 = document.getElementById("id9")//それぞれのタグを一つずつリストに追加
            var result9 = (mydiv9.innerHTML).split(' ');
           // console.log(result9);

           var resultALL  = ['result1','result2','result3','result4','result5','result6',
                            'result7','result8','result9']; 

            console.log(resultALL[1]);


            var kekka = [];//施設ごとにどれくらい合ってるか
            var count = 0;//どのくらいあってるかのカウント用
           

            for(var i=1; result.length - 1 >=i; i++){  //チェックされた要素の数分回す
                console.log(i+ '回目'); //回った

                
                for(var y=1; resultALL[i-1].length >= y; y++){ //それぞれの数分
                    console.log(y+ '回目２'); //回ってない

                    if(result[i] == result+'i'[y]){  //一致してたらカウントに1
                        count =+ 1;
                    }
                    
                }

                kekka.push(count)
                console.log('結果：'+ kekka);

            }

            //あてはまる文字列が多いほど上に
        }
}
