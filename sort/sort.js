function goFilter2(){
    var wTable = document.getElementById("sortTable");
    var value  = '';
  
    // --- 選択されている商品のクラスを割り当てる ---
    if(document.getElementById("chkbaby").checked)    {value += ' kbaby2';}
    if(document.getElementById("chkkuruma").checked){value += ' kuruma2';}
    if(document.getElementById("chkknyutenok").checked)     {value += ' knyutenok2';}
    if(document.getElementById("chkksheet").checked)    {value += ' ksheet2';}
    if(document.getElementById("chkdansang").checked)    {value += ' dansang2';}
    if(document.getElementById("chkbabyroom").checked)    {value += ' babyroom2';}
    if(document.getElementById("chkkidsroom").checked)    {value += ' kidsroom2';}
    if(document.getElementById("chkomutu").checked)    {value += ' omutu2';}
    if(document.getElementById("chkkyukei").checked)    {value += ' kyukei2';}
    if(document.getElementById("chktesuri").checked)    {value += ' tesuri2';}
    if(document.getElementById("chkosuto").checked)    {value += ' osuto2';}
    if(document.getElementById("chkkyugo").checked)    {value += ' kyugo2';}
    

  
    if(value == ''){
      // --- 未選択はクラスをクリア ---
      wTable.className = '';
    }else{
      // --- タイトル以外のTRを非表示＋指定属性を持つTRのみ表示 ---
      wTable.className = 'allNoDisplay2 ' + value;
    }
  }