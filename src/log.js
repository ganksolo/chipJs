var log ＝ function(options) {

    var date = new Date().getTime(),
        urlArr = [],
        label = 'log__' + date,
        c = window[label] = new Image();

    // 配置参数
    rid =   options.rid || '';
    ca = options.ca || '';
    tpl = options.tpl || '';
    url = options.url || '';
    rf = encodeURIComponent(document.referrer) || options.rf;
    host = options.host || '';
    city = options.city || '';
    pid = options.pid || '';
    uf = options.uf || '';
    abclass = options.abclass || '';
    ga_csr = options.ga_csr || '';
    ga_ccn = options.ga_ccn || '';
    ga_cmd = options.ga_cmd || '';
    ga_ctr = options.ga_ctr || '';
    rtm = options.rtm || '';
    channel = options.channel || '';
    page_name = encodeURIComponent(options.page_name) || '';
    ext = encodeURIComponent(options.ext) || '';
    domain = options.domain ? options.domain : '//g.rong360.com/u.gif';

    // 将onload 和onerror 事件处理程序指定为同一个函数, 无论是什么响应，只要请求完成，便释放该对象。
    c.onload = c.onerror = function(){ window[label] = null; };

    urlArr.push(encodeURIComponent(domain));
    urlArr.push('?rid=' + rid);
    urlArr.push('&ca=' + ca);
    urlArr.push('&tpl=' + tpl);
    urlArr.push('&url=' + url);
    urlArr.push('&rf=' + rf );
    urlArr.push('&host=' + host);
    urlArr.push('&city=' + city);
    urlArr.push('&pid=' + pid);
    urlArr.push('&uf=' + uf);
    urlArr.push('&abclass=' + abclass);
    urlArr.push('&ga_csr=' + ga_csr);
    urlArr.push('&ga_ccn=' + ga_ccn);
    urlArr.push('&ga_cmd=' + ga_cmd);
    urlArr.push('&ga_ctr=' + ga_ctr);
    urlArr.push('&rtm=' + rtm);
    urlArr.push('&channel=' + channel);
    urlArr.push('&page_name=' + page_name);
    urlArr.push('&ext=' + ext);

    c.src = urlArr.join('');
    urlArr.length = 0;
    c = null;
}

