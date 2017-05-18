/**
 * Created by Administrator on 15-1-21.
 */
$('.hcz').focus(function(){
    var h=$(this).offset();
    var hei=h.top-30;
    $('.hotcity_hcz').css("top",hei);
});
$('.text-from').click(function(){
    citySelector._ListData_=cityDataList.trainData;
    hotCityStr = hotCityStr;
    $('#startCity').focus();
    $('.city-list-from').animate({right:0},300);
});
$('.text-reach').click(function(){
    citySelector._ListData_=cityDataList.trainData;
    hotCityStr = hotCityStr;
    $('#endCity').focus();
    $('.city-list-reach').animate({right:0},300);
});
$('.bus-btn').click(function(){
    citySelector._ListData_=gongjiaoDataList.trainData;
    hotCityStr = bushotCityStr;
    $('#busCity').focus();
    $('.city-list-bus').animate({right:0},300);
   });
$('.ic-arrow-le-white').click(function(){
    $('.city-list-reach').animate({right:-100+'%'},300);
    $('.city-list-from').animate({right:-100+'%'},300);
    $('.city-list-bus').animate({right:-100+'%'},300);
});
$('#startRmcs').click(function(){
    $('.city-list-reach').animate({right:-100+'%'},300);
    $('.city-list-from').animate({right:-100+'%'},300);
    setTimeout(function(){
        $(".text-from").val($('#startCity').val());
    },20);
});
$('#endRmcs').on("click","span",function() {
    _GetValue_($(this).data("id"),$(this).data("name"),$(this).data("key"));
    $('.city-list-reach').animate({right:-100+'%'},300);
    $('.city-list-from').animate({right:-100+'%'},300);
    setTimeout(function(){
        $(".text-reach").val($('#endCity').val());
        if(typeof tianqifuzhi!='undefined' && tianqifuzhi instanceof Function){ 
            //用于天气的跳转 
            tianqifuzhi($('#endCity').val());  
       }
    },20); 
});

$('#busRmcs').click(function(){
    $('.city-list-reach').animate({right:-100+'%'},300);
    $('.city-list-from').animate({right:-100+'%'},300);
    $('.city-list-bus').animate({right:-100+'%'},300);
    setTimeout(function(){
        window.location.href = '/bus/city_'+$('#busCity').attr('piny')+'/';
        $(".gj-from").text($('#busCity').val());
    },20);
});

    //post城市
    function tianqifuzhi(str){
        if(!str)return false;
        //ajax获取数据  
        $.post('/tianqi/',{city:str},function(data){
        var obj = eval("("+data+")");
        if(obj.status ==1){
            window.location.href='/tianqi/'+obj.msg+'/';
        }else{
            alert("您选择的城市地区不存在");return false;
        }
    })      
}
