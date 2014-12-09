/**
 * 倒计时
 * @author jiayulong(jiayulong@baidu.com)
 */
var countdown = (function(){
    /**
     * [Countdown 构造函数]
     * @param {Objct} options [参数集]
     */
    function Countdown (options) {
        this.weekFormula = 24 * 3600 * 1000 * 7;
        this.dayFormula = this.weekFormula / 7;
        this.hourFormula = this.dayFormula / 24;
        this.minuteFormula = this.hourFormula / 60;
        this.secondFormula = this.minuteFormula / 60;
        /**
         * [configs 参数对象]
         * @type {Object}
         * @param {String}      [format] [时间格式，并可设置分隔符]
         * @param {Array}       [unit] [时间单位]
         * @param {Boolean}     [displayUnit] [是否显示时间单位]
         * @param {Boolean}     [displayWeek] [是否显示周数]
         * @param {String}      [endTime] [截至时间,支持格式为"2014/12/20 18:20:30"或2014-12-20 18:20:30]
         * @param {String}      [containerId] [倒计时容器ID]
         * @param {String}      [timeClass] [时间容器的class]
         * @param {String}      [unitClass] [时间单位的class]
         * @param {Function}    [callback] [倒计时完成时的回调函数]
         */
        this.configs = {
            format : 'w:d:h:i:s',
            unit : ['周', '日', '时', '分', '秒'],
            displayUnit : false,
            displayWeek : false,
            endTime : null,
            containerId : 'timeBox',
            timeClass : 'time',
            unitClass : 'unit',
            callback : function(){}
        };
        this.clearTimeId = null;
        this.options = options;
        this.settings = null;
        this.time = 0;
        this.id;
        this.separator;
    }

    Countdown.prototype = {
        // 获取时间差
        getRemain : function() {
            return Date.parse(new Date(this.settings.endTime)) - Date.parse(new Date());
        },
        // 判断是否为数组
        isArray : function(obj) {
            return obj !== undefined && obj !== null && Object.prototype.toString.call(obj).slice(8, -1) === 'Array';
        },
        // 判断是否为对象
        isObject : function(obj) {
            return obj !== undefined && obj !== null && Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
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
                            // 数组合并不追加，直接清空
                            clone = target[prop] && this.isArray(target[prop]) ? target[prop] = [] : [];
                        }
                        target[prop] = this.extend(clone, options[prop], deep);
                    } else { 
                        target[prop] = options[prop];
                    }
                }
            }
            return target;
        },
        // 单个数字补位
        patchPlace : function(num) {
            num  = num.toString();
            if(num.length < 2) {
                return 0 + num;
            }
            return num;
        },
        // 设置分隔符
        setSeparator : function() {
            this.separator = /\W+/ig.exec(this.settings.format).join('');
            this.settings.format.split(this.separator);
        },
        // 获取单位数组
        getUnitArr : function() {
            var format = this.settings.format.split(this.separator), unit = this.settings.unit, result = [];
            if(format.length !== unit.length) {
                unit.splice(0, Math.abs(format.length - unit.length));
            }
            for(var i = 0; i < unit.length; ++i) {
                result.push('<span class="'+this.settings.unitClass+'">'+ unit[i] +'</span>');
            }
            return result;        
        },
        // 获取时间数组
        getDateArr : function() {
            var defaultArr = [], result = [], 
                format, weeks, days, hours, minutes, seconds, remain;
            remain = this.getRemain();
            format = this.settings.format.split(this.separator);

            weeks = Math.floor(remain / this.weekFormula); remain %= this.weekFormula;

            if(this.settings.displayWeek){
                days = Math.floor(remain / this.dayFormula); remain %= this.dayFormula;
            } else {
                days = Math.floor((remain / this.dayFormula) + weeks *7); remain %= this.dayFormula; weeks = 0;
            }
            hours = Math.floor(remain / this.hourFormula); remain %= this.hourFormula;
            minutes = Math.floor(remain / this.minuteFormula); remain %= this.minuteFormula;
            seconds = Math.floor(remain / this.secondFormula); remain %= this.secondFormula;
            defaultArr = [weeks, days, hours, minutes, seconds];
            defaultArr.splice(0, Math.abs(defaultArr.length - format.length));

            return defaultArr;
        },
        // 返回装饰后的时间数组
        updateDateArr : function() {
            var timeArr = this.getDateArr(), unit = this.getUnitArr(),
                len = timeArr.length, 
                result = [], 
                i;
            for(i = 0; i < len; ++i) {
                result.push('<span class="'+ this.settings.timeClass +'">'+ this.patchPlace(timeArr[i]) +'</span>');
                if(this.settings.displayUnit) {
                    result[i] += unit[i];
                }
            }
            return result;
        },
        // 倒计时开始
        startTime : function() {
            var time, ele;
            if(this.getRemain() >= 0) {
                time = this.updateDateArr();
                ele = document.getElementById(this.settings.containerId);
                ele.innerHTML = time.join(this.settings.displayUnit ? '' : this.separator);
            } else {
                this.clearTime();
                this.settings.callback();
            }
        },
        // 暂停
        clearTime : function() {
            clearInterval(this.clearTimeId);
            return this;
        },
        // 继续
        keepTime : function() {
            this.init();
        },
        // 初始化
        init : function () {
            var that = this;
            this.settings = this.extend(this.configs, this.options, true);
            this.setSeparator();
            this.startTime();
            // 超时后,避免二次调用回调
            if(this.getRemain() >= 0) {
                this.clearTimeId = setInterval(function(){
                    that.startTime();
                }, 1000);            
            }
            return this;
        }

    };
    // 实例化对象
    var countdown = function (options) {
        return new Countdown(options).init();
    };
    return countdown;
})();