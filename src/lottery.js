var lottery = (function(){
    
    function Lottery(options) {
        this.configs = {
            isNumber : true,
            num: 10,
            store : []
        };
        this.options = options;
        this.settings = null;
    };

    Lottery.prototype = {
        // 判断是否为数组
        isArray : function(obj) {
            return obj !== undefined && obj !== null && Object.prototype.toString.call(obj).slice(8, -1) === 'Array';
        },
        // 合并参数
        extend : function(target, options, deep) {
            var prop, clone;
            for(prop in options) {
                if(options.hasOwnProperty(prop)) {
                    if(deep && (this.isObject(options[prop]) || this.isArray(options[prop]))) {
                        if(this.isObject(options[prop])) {
                            clone = target[prop] && this.isObject(target[prop]) ? target[prop] : {};
                        } else {
                            clone = target[prop] && this.isArray(target[prop]) ? target[prop] : [];
                        }
                        target[prop] = this.extend(clone, options[prop], deep);
                    } else { 
                        target[prop] = options[prop];
                    }
                }
            }
            return target;
        },
        // 设置数据
        setData : function(num) {
            if (this.settings.isNumber) {
                for(var i = 0; i < num; i ++) {
                    this.settings.store[i] = i + 1;
                }
            }
        },

        lottery : function(personNum) {
            var win = [],
                random;
            if(data.length <= 0) {
                alert('done');
                return;
            }
            for(var i = 0; i < personNum; i++) {
                random = Math.floor(Math.random() * data.length);
                win.push((data.splice(random, 1)).join(''));
            }
            document.querySelector('#box').innerHTML = '中奖号码为: ' + win.join(',') + '号';
        }, 

        init : function() {
            var that = this;
            // 合并参数
            this.settings = this.extend(this.configs, this.options, true);
            this.setData(this.settings.num);
            document.querySelector('#btn').addEventListener('click', function(){
               that.lottery(document.querySelector('#num').value);
            }, false);
        }
    };

    return function(options){
        return new Lottery.init(options);
    }

})(window);