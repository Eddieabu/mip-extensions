jQuery(function($){
    var lastDate = $("#lastDate").val();
    var firstDate = $("#firstDate").val();
    citySelector._ListData_=cityDataList.trainData;
});
// 选择城市
function showRmcs(obj){
    intervalHandle=self.setInterval('_UpdateList_()', 600);
    var id = obj.id;
    var rmcs = "startRmcs";
    if(id == "startCity"){
        rmcs = "startRmcs";
    }else if(id == "endCity"){
        rmcs = "endRmcs";
    }else if(id == "fromCity"){
        rmcs = "fromRmcs";
    }else if(id == "busCity"){
        rmcs = "busRmcs";
    }
    var objA = document.getElementsByClassName("rmcs");
    var objB = document.getElementById("dateDiv");
    if (objA.length > 0) {
        objA.style.display = "none";
    }
    if (objB != undefined) {
        objB.style.display = "none";
    }
    showCityAtNews(id, '', id, 'yuding', rmcs, rmcs);
    document.getElementById(rmcs).style.display = "block";

}

function showDate(){
    var $dateDiv = $("#dateDiv");
    $dateDiv.slideToggle("normal");
}
