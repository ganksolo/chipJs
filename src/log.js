var log ＝ function(tag, url) {
    var date = new Date().getTime(),
        label = 'log__' + date,
        c = window[label] = new Image();
    // 将onload 和onerror 事件处理程序指定为同一个函数, 无论是什么响应，只要请求完成，便释放该对象。
    c.onload = c.onerror = function(){ window[label] = null; };
    c.src =  url ? url : "http://xx.xxx.com/statics/tj.gif?type=clickStat&clickFlag=" + tag + "&from=" + encodeURIComponent(location.href) + "&time=" + encodeURIComponent(date.toString());
    c = null;
}