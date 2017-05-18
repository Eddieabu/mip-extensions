# mip-city-search

mip-city-search 实现了一个简单的城市筛选功能，根据用户的输入试试筛选出对应相关的城市名称。

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-city-search/detail.js
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-city-search/selector.js
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-city-search/city_data.js
所需脚本|https://mipcache.bdstatic.com/static/v1/mip-city-search/new_busselect.js

## 示例

```html
    <mip-city-search class="city-list-reach">
        <h2><i class="ic-arrow-le-white fl ml15 mt25"></i>{if $end}{$end}{else}目的地{/if}</h2>
        <div class="col-xs-12 mt10">
            <input class="reach form-control hcz" type="text" placeholder="目的地:中文/全拼/首拼" onblur="window.clearInterval(intervalHandle);" id="endCity" onfocus="this.value='';showRmcs(this);" name="to" pinY="">
            <div id="endRmcs" class="hotcity_hcz" hidden="hidden"></div>
        </div>
    </mip-city-search>
```
##注意事项
1、所有id属性均不能有改动
2、所有class只是起到样式的效果，可自行进行编辑