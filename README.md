# chipJs （杂货铺）



#目录

     - 倒计时
     - 静态资源加载器
     - slide幻灯片
     - log统计

##倒计时
``` html
<p>默认倒计时（只需要传入容器ID和截止时间）</p>    
<div id="time1"></div>
```
**基本使用：**

``` javascript
countdown({
    containerId : 'time1',
    endTime : '2014/12/20 18:20:30' // 2014-12-20    18:20:30
});
``` 

**完整使用：**

``` javascript
countdown({
    containerId : 'time1',
    unit : ['周', '日', '时', '分', '秒']
    endTime : '2014/12/20 18:20:30',
    format : 'd:h:m:s', // d-h-m-s
    displayUnit : true,
    displayWeek : true,
    timeClass : 'timeWrap',
    unitClass : 'unitWrap',
    callback : function(){}
});
``` 
##静态资源加载器
`loadStaticResource(string[Array], callback)`

**参数说明**：

| 参数  | 描述   |
| -----   | ---  |
| String[Array]     | `String`为单个url; `Array`多个url，以数组形式传入;|
| callback        |   加载完成后，回调函数   |


**使用方法**：
``` javascript
var js1 = 'http://www.xxxx.com/static/resource/xx1.js',
    js2 = 'http://www.xxxx.com/static/resource/xx2.js',
    css3 = 'http://www.xxxx.com/static/resource/css3.js'
    loadStaticResource([js1, js2, css3], function(){
        console.log('js done');
    });
```
``` javascript

loadStaticResource("../css／ff14footer.css", function(){
    var footerHtml = '';
    footerHtml = '<div class="footerwrapper">\
                <div class="footer">\
                    <span>©2014 BAIDU 北京****科技有限公司 文网文[2010]1xx号 京ICP证xxx号</span>\
                </div>\
            </div>';

    document.getElementsByTagName("body")[0].appendChild(footerHtml);
});
```
## slide 幻灯片

## log 统计

## 作者

 - Pom
 - email : f2engineer@outlook.com

