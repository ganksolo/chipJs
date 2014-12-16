# chipJs （功能片段）


----------

#目录

     - 倒计时
     - 静态资源加载器
     - slide幻灯片
     - log统计

------
##倒计时
基本使用：

``` javascript
countdown({
    containerId : 'time1',
    endTime : '2014/12/20 18:20:30' // 2014-12-20    18:20:30
});
``` 
完整使用：
``` javascript
countdown({
    containerId : 'time6',
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
