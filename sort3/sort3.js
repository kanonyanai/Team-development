function goFilter2(){
    
    i=1; // ループの初期値(チェックボックスが12こあるので、12回回るようにする)

    
    //if文でまわすたび、いちいちチェックボックスを無効化していく　
        var wTable = document.getElementById("sortTable");
    
        if(i<12){
        var value1  = '';
    
        // --- 選択されている商品のクラスを割り当てる ---
        if(document.getElementById("chkbaby").checked)    {value1 += ' kbaby2';}
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
        
        var class1 = wTable.className;
        var value1 = class1;
       
        
    }
  
    }
}