$(function (){
    var $chkbxFilter_all = $('#all');

    
    //チェックボックスがクリックされた時の動作
    $("#select colTitle label input").click(function() {
        
        $(this).parent().toggleClass("selected");
        
        $.each($chkbxFilter_tags, function() {
            if($('#' + this).is(':checked')) {
                         $("#result " + $chkbxFilter_blocks + ":not(." + this + ")").addClass('hidden-not-' + this);
                         $chkbxFilter_all.prop('checked',false).parent().removeClass("selected");
                }
            else if($('#' + this).not(':checked')) {
                         $("#result " + $chkbxFilter_blocks + ":not(." + this + ")").removeClass('hidden-not-' + this);
                }
        });
        
        //チェックボックスが1つも選択されていない場合に、絞り込まないボタンにclass="selected"をつける
        if ($('.sort:checked').length == 0 ){
            $chkbxFilter_all.prop('checked',true).parent().addClass("selected");
            $(".sort").parent().removeClass("selected");
        };
	});     
});