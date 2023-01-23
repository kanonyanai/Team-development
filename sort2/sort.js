var searchBox = '.search-box';//1回目と二回目
var searchItem = '.search-box input';
//var searchItem2 = '.search-box2 input';
var listItem = '.cat_image';  //えらばれるやつ
var hideClass = 'is-hide';

$(function() {//クリックされたときに実行
	$(searchItem).on('change', function() {  //最初にサーチアイテム実行で次にサーチフィルタ実行
		search_filter();
	});
});

function search_filter() {
	$(listItem).removeClass(hideClass); //表示されなくなるクラスをすべてから削除(全て表示状態)
	
	for (var i = 0; i < $(searchBox).length; i++) { //クラス名「searchBox」の数だけ繰り返す
		var name = $(searchBox).eq(i).find('input').attr('name'); //name=サーチボックスの中のインプットの中のname
		var searchData = selected_items(name);
		console.log('1回目' + searchData);

		
		if(searchData.length === 0 || searchData[0] === '') {  //valueが何もなかったら
			continue;
		}
		
		for (var j = 0; j < $(listItem).length; j++) {  //valueがあったら　一覧の数だけまわすたび　and 一致するもの
			var itemData = $(listItem).eq(j).data(name); //カテゴリの名前を一つずつitemdataに
			
			if(searchData.indexOf(itemData) === -1) {  //一致していないものの行なら非表示クラスに
				$(listItem).eq(j).addClass(hideClass);
			}
			
			
	    }  
    }

	function selected_items(name) {  //チェックされているもののvalueを配列に格納(searchData = [])
		var searchData = [];
		$('input[name=' + name + ']:checked').each(function() {
			searchData.push($(this).val());
		});
		console.log('a')
		return searchData;
	}

}
