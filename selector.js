// JavaScript Document
var citySelector = {
    _ListData_:null
}

//document.write('<div id="cityList" style="display:none; z-index:9999;top:-1;position:absolute"></div>');
var _CloseAdmit_ = true;
var _InputID_ = "";
var TrainNumber_InputID_ = "";
var _ListSelectID_ = 0;
var _ListSelectStr_ = "";
var _SetValueID=""; //显示选中城市

var _cityList = "";      //城市数据 上级标签
var _cityList_Div = "";  //城市数据 容器DIV
var _index_Div = "";     //出发 城市数据首页DIV
var intervalHandle;

document.onkeyup = function(event) {
    event = (event) ? event : window.event;//Mozilla浏览器中没有默认的event对象，只能在事件发生的现场使用。
    if (_InputID_ != "") {
        switch (event.keyCode)//火狐2.0版本未考虑
        {
            case 38:
                _ListMove_(-1);
                break;//↑
            case 40:
                _ListMove_(1);
                break;//↓
            case 13:
                _GetValue_(_InputID_, _ListSelectStr_.split(",")[_ListSelectID_]);
                return false;
                break;//Enter
            default:
        }
    } else {
        if (TrainNumber_InputID_ != "") {
            switch (event.keyCode)//火狐2.0版本未考虑
            {
                case 38:
                    TrainNumber_ListMove_(-1);
                    break;//↑
                case 40:
                    TrainNumber_ListMove_(1);
                    break;//↓
                case 13:
                    TrainNumber_GetValue_(
                        TrainNumber_InputID_,
                        TrainNumber_ListSelectStr_.split(",")[TrainNumber_ListSelectID_]);
                    return false;
                    break;//Enter
                default:
                    setTimeout("TrainNumber_UpdateList_()", 50);
            }
        }
    }
}

function _ListMove_(ID) {
    if (_ListSelectStr_ != "") {
        var StrArray = _ListSelectStr_.split(",")
        switch (ID) {
            case 1:
                if (_ListSelectID_ >= StrArray.length - 2) {
                    return;
                }
                break;
            case -1:
                if (_ListSelectID_ <= 0) {
                    return;
                }
                break;
            default:
                return;
        }
        document.getElementById("_ListID" + _ListSelectID_ + "_").style.backgroundColor = "";
        _ListSelectID_ = _ListSelectID_ + ID;
        document.getElementById("_ListID" + _ListSelectID_ + "_").style.backgroundColor = "#C5E7F6";
    }
}

function _UpdateList_()
{
    var Str =   document.getElementById(_InputID_).value.toLowerCase();
    var Len =   Str.length;
    var i   =   0;
    var ListStr =   "";
    _ListSelectID_  =   0;
    _ListSelectStr_ =   "";
    if(Str!="")
    {
        var _ListData_=citySelector._ListData_;
        for(var j=0;j<_ListData_.length;j++)
        {
            if(_ListData_[j][0].substr(0,Len)==Str||_ListData_[j][1].substr(0,Len)==Str||_ListData_[j][2].substr(0,Len)==Str)
            {
                ListStr =   ListStr+'<li><span data-id='+_SetValueID +' data-name='+_ListData_[j][0]+' data-key='+_ListData_[j][2]+'>'+_ListData_[j][0]+'('+_ListData_[j][1].toUpperCase()+')</span></li>';
                _ListSelectStr_=_ListSelectStr_+_ListData_[j][0]+',';

                if(i>=11)
                //提示12个
                {
                    break;
                }
                else
                {
                    i=i+1;
                }
            }
        }
        var _rmcsId = document.getElementById("rmcs");
        if(ListStr!="")
        {
            _ListSelectID_  =   0;
            ListStr='<ul>'+ListStr+'</ul>';
            //ListStr   =   '<table align="left" width="240" cellpadding="0" cellspacing="0" style="border:1px solid #999999;font-size:12px; font-family:Arial; color:#555555;background-color:#FFFFFF;filter:alpha(opacity=95);">'+ListStr+'</table>';
            if("undefiend" == _rmcsId || null == _rmcsId){
                document.getElementById(_cityList_Div).innerHTML    =   ListStr;
            }else{
                _rmcsId.innerHTML   =   ListStr;
            }
        }
        else
        {
            if("undefiend" == _rmcsId || null == _rmcsId){
                document.getElementById(_cityList_Div).innerHTML    =   "<span class='pt5 pb5 ml20 lh24 tl red'>您查找的城市不存在！</span>";;
            }else{
                _rmcsId.innerHTML   =   "";;
            }
        }
    }
}
// citiName 记录历史记录名称
function showCity(ID,citiName,inputId,indexDiv,cityDiv,rmcs)
{
    try
    {
        document.getElementById(inputId).value="";
        _CloseAdmit_    =   false;
        _InputID_       =   inputId;

        _SetValueID = ID;           //显示选中城市
        _cityList = rmcs;           //城市数据 上级标签
        _cityList_Div = cityDiv;    //城市数据 容器DIV
        _index_Div = indexDiv;      //出发 城市数据首页DIV


        var ListStr     =   '<section class="say">热门城市</section>';
        //var hotCityStr="北京@beijing，上海@shanghai，天津@tianjin，西安@xian，深圳@shenzhen，重庆@chongqing，武汉@wuhan，广州@guangzhou，苏州@suzhou，成都@chengdu，杭州@hangzhou，济南@jinan，南京@nanjing，郑州@zhenzhou，长春@changchun，哈尔滨@haerbin，东莞@dongguan，长沙@changsha，宁波@ningbo，温州@wenzhou，青岛@qingdao，徐州@xuzhou，乌鲁木齐南@wulumuqinan";
        var StrArray=hotCityStr.split("，");
        ListStr         =   ListStr+'<ul>';

        if(undefined != citiName && citiName != ''){
            $.each(StrArray, function(key, val) {
                if(undefined != val && val.indexOf(citiName) != -1){
                    var pinY = val.split("@")[1];
                    console.info(pinY);
                    ListStr =   ListStr+'<li><span data-id='+ID +' data-name='+citiName+' data-key='+pinY+'"><em>√</em>'+citiName+'</span></li>';
                    //StrArray.splice($.inArray(citiName,StrArray),1);
                    StrArray.splice(key,1);
                }
            });
            //StrArray.unshift(citiName);
        }

        for(var i=0;i<StrArray.length;i++)
        {
            ListStr     =   ListStr+'<li><span data-id='+ID +' data-name='+StrArray[i].split("@")[0]+' data-key='+StrArray[i].split("@")[1]+'>'+StrArray[i].split("@")[0]+'</span></li>';
        }
        ListStr         =   ListStr+'</ul>';
        var ListObj     =   document.getElementById(_cityList);
        ListObj.innerHTML   =   ListStr;
    }
    catch(Err)
    {
        alert(Err.description);
    }
}
// 新闻详情页面 搜素框
function showCityAtNews(ID,citiName,inputId,indexDiv,cityDiv,rmcs)
{
    try
    {
        document.getElementById(inputId).value="";
        _CloseAdmit_    =   false;
        _InputID_       =   inputId;

        _SetValueID = ID;           //显示选中城市
        _cityList = rmcs;           //城市数据 上级标签
        _cityList_Div = cityDiv;    //城市数据 容器DIV
        _index_Div = indexDiv;      //出发 城市数据首页DIV


        var ListStr     =   '';
        //var hotCityStr= gongjiaohotCityStr;
        var StrArray=hotCityStr.split("，");
        ListStr         =   ListStr+'<ul>';

        for(var i=0;i<StrArray.length;i++)
        {
            ListStr     =   ListStr+'<li><span data-id='+ID +' data-name='+StrArray[i].split("@")[0]+' data-key='+StrArray[i].split("@")[1]+'>'+StrArray[i].split("@")[0]+'</span></li>';
        }
        ListStr         =   ListStr+'</ul>';
        var ListObj     =   document.getElementById(_cityList);
        ListObj.innerHTML   =   ListStr;
    }
    catch(Err)
    {
        alert(Err.description);
    }
}
function _GetValue_(ID,Value,pinY)
{
    _CloseAdmit_    =   true;
    if(typeof(Value)=="string"&&Value!="")
    {
        document.getElementById(ID).value=Value;
        $("#"+ID).attr("pinY",pinY);
        $("#"+ID).trigger("change");
    }
    //$("#"+_InputID_).val('');
    document.getElementById(_cityList_Div).style.display    =   "none";
    // document.getElementById(_index_Div).style.display    =   "block";
    _HideList_();
    document.documentElement.scrollTop = document.body.scrollTop =0;
}
function _GetValueV2_(Value,pinY)
{
    var ID=document.getElementById("selectCityType").value;
    _GetValue_(ID,Value,pinY);
}
function _HideList_()
{
    if(_CloseAdmit_ )
    {
//      document.getElementById("indexDiv").style.display   =   "block";
//      document.getElementById("cityDiv").style.display    =   "none";
        _InputID_   ="";
    }
}
function hideCity()
{
    _CloseAdmit_    =   true;
    setTimeout("_HideList_()",200);
}