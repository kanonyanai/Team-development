$(function() {
    var lists = $('.result tr');
    $(document).on('change', '.select colTitle th categori', function() {
        lists.show();
        for (var i = 0; i < $('.select colTitle th categori').length; i++) {
            // 絞り込みの項目を取得
            var item = $('.select colTitle th categori').eq(i).attr('name');
            // 絞り込みの対象を取得
            var target = $('.select colTitle th categori').eq(i).val();
 
            if(target != '') {
                for (var j = 0; j < lists.length; j++) {
                    // 絞り込み対象でない場合は非表示
                    if(!lists.eq(j).find('.' + item).find('tr').hasClass(target)) {
                        lists.eq(j).hide();
                    }
                };
            }
        };
    });
});