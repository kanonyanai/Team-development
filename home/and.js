$(function(){
    $('[name=area],[name=city],[name=brand]').on('change',function(){
      var area=$('[name=area]').val()==""?"":'.'+$('[name=area]').val();
      var city=[];
      $('[name=city]:checked').each(function(){city.push('.'+$(this).val())});
      var brand=$('[name=brand]:checked').length>0?'.'+$('[name=brand]:checked').val():"";
      $('#err').remove();
      if(area=="" && city.length==0 && brand==""){
        $('#store-data table tbody tr').show();
      }else{
        var tr=$('#store-data table tbody tr').hide().filter(function(){
          return area==""?true:$(this).has(area).length>0;
        }).filter(function(){
          return (brand==""||brand==".all")?true:$(this).has(brand).length>0;
        }).filter(function(){
          return city.length==0?true:$(this).has(city.join(",")).length>0;
        }).show();
        if(tr.length==0){
          $("#store-data table").after($('<div>').attr('id','err').text("該当なし"));
        }
      }
    }).eq(0).trigger('change');
    $('#reset').on('click',function(e){
      $('[name=area]').prop('selectedIndex',0);
      $('[name=city]').prop('checked',false);
      $('[name=brand]').prop('checked',false).trigger('change');
    });
  });
  