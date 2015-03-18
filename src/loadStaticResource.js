var loadStaticResource = function(url, callback) {
    var config, head = document.head || document.getElementsByTagName('head')[0]; 
        config = {
            css : ["link", "href", "rel"],
            js : ["script", "src"]
        };

    function loader(){
        setTimeout(function(){
            var type, link, state = false;
            if(typeof url === 'string') {
                link = url;
            } else {
                link = url.shift();
                if(url.length > 0) {
                    state = true;
                 }
            }
            type = config[link.split('.').slice(-1)[0].split('?')[0]];
            eleNode = document.createElement(type[0]);
            // 判断是否支持html元素的readyState属性
            if(eleNode.readyState) {
                eleNode.onreadystatechange = function(e) {
                    var target = e.target || e.srcElement;
                    if(target.readyState === 'loaded' || target.readyState === 'complete') {
                        target.onreadystatechange = null;
                        if(state === true) {
                            loader();
                        } else {
                            if(typeof callback === 'function') {
                                callback();
                            }
                        }
                    }
                };
            } else {
                eleNode.onload = function(e) {
                    var target = e.target || e.srcElement;                        
                    target.onload = target = null;
                    if(state === true) {
                        loader();
                    } else {
                        if(typeof callback === 'function') {
                            callback();
                        }
                    }
                }
            }
            if(type.length > 2) {
                eleNode.rel = "stylesheet";
            }
            eleNode[type[1]] = link;
            head.appendChild(eleNode);
        }, 0);
    }
    loader();
};


