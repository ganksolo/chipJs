/**
 * @file slide组件
 * @author jiayulong(jiayulong@baidu.com)
 */
$.fn.pureSlide = function( option ) {
    
    var option = $.extend({}, $.fn.pureSlide.option, option);
    return this.each(function(){
        // 方便集中申明变量将.control的html操作提前
        $('.' + option.container, $(this)).children().wrapAll('<div class="slides_control"/>');

        var ele = $(this),
            container = $('.' + option.container, ele),
            control = $('.slides_control', ele),
            children = control.children(),
            total = children.length,
            width = children.outerWidth(),
            height = children.outerHeight(),
            start = option.start - 1,
            number = 0, next = 0, refPoint = 0, current = 0, refPosition = width, 
            prevStatus, nextStatus, pageIndex, direction, beginPosition, endPosition, playInterval, pauseTImeout, imgDesc;

        var Slides = {

            init : function() {
                this.setStyle();
                this.verifyParams();
                this.createHtml();
                // 初始化start slides
                children.eq(start).fadeIn(option.fadeSpeed);
                this.autoPlay();
                this.subscibeEvents();
            },

            // 设置容器以及单个slide的样式
            setStyle : function() {
                if(option.slideType === 'bgImg') {
                    children.each(function(){
                        $(this).css({
                            'background-image' : 'url('+ $(this).attr('data-bg') +')'
                        });
                    });

                    control.css({
                        position : 'relative',
                        left : 0,
                        height : height
                    });

                    children.css({
                        position : 'absolute',
                        zIndex : 0,
                        top : 0,
                        left : 0,
                        display : 'none'
                    });

                } else {
                    control.css({
                        position : 'relative',
                        width : width * 3 ,
                        left : - width,
                        height : height
                    });

                    children.css({
                        position : 'absolute',
                        zIndex : 0,
                        top : 0,
                        left : refPosition,
                        display : 'none'
                    });
                }

                container.css({
                    overflow : 'hidden',
                    position : 'relative'   // for ie6,7
                });

                // show slide view
                container.css({
                    display : 'block'
                });

            },

            verifyParams : function() {
                if(total < 2) {
                    $('.' + option.next +', .' + option.prev).fadeOut(0);
                    return false;
                }

                if(start > total) {
                    start = total - 1;
                }

                if(start < 0) {
                    start = 0;
                }

                if(option.start) {
                    current = start; 
                }
            },

            autoPlay : function() {
                var that = this;
                if(option.play) {
                    playInterval = setInterval(function(){
                        that.animation('next', option.effect);
                    }, option.play);
                    ele.data('interval', playInterval);
                }
            },

            // 创建分页next/prev; 图片说明; 
            createHtml : function(){
                if(option.createPagination === true) {
                    $('<ul class="'+ option.paginationClass +'"/>').insertAfter(container);
                    for(var number = 0; number < total; number++) {
                       $('.' + option.paginationClass, ele).append($('<li><a href="#'+ number +'">'+ (number + 1) +'</a></li>'))
                    }
                    // 标记start位置
                    $('.' + option.paginationClass, ele).children().eq(start).addClass(option.currentClass);
                }

                if(option.createNextPrev === true) {
                    $('<a href="#" class="'+ option.next +'">next</a>').insertAfter(container);
                    $('<a href="#" class="'+ option.prev +'">prev</a>').insertAfter(container);
                }

                if(option.createImgDesc === true) {
                    children.each(function(){
                       imgDesc = $(this).find('img').attr('alt') || $(this).find('img').attr('title');
                       $(this).append('<p class="imgDesc">'+ imgDesc +'</p>');
                    });
                }
            },

            // 播放的动画
            animation : function(direction, effect, pageIndex) {
                if(!prevStatus && !nextStatus){
                    prevStatus = nextStatus = true;

                    if(direction === 'next') {
                        refPoint = current;     // 标记参考点
                        next = current + 1;
                        next = next === total ? 0 : next;

                        // next slide起始位置
                        beginPosition = width * 2;

                        // current slide 结束位置
                        endPosition = 0;
                        current = next;

                    } else if (direction === 'prev') {
                        refPoint = current;     // 标记参考点
                        // 下一步就是往后走了
                        next = current - 1;
                        next = next === -1 ? total - 1 : next;

                        // next slide 起始位置
                        beginPosition = 0;
                        // current slide 结束位置
                        endPosition = width * 2;
                        current = next;

                    } else if (direction === 'pagination') {
                        // 标记参考点
                        refPoint = $('.' + option.paginationClass + ' li.' + option.currentClass + ' a', ele).attr('href').match(/\d+/).join('');
                        next = pageIndex;
                        if(next > refPoint) {   // next 方向同理
                            beginPosition = width * 2;
                            endPosition = 0;
                        } else {                // prev 方向同理
                            beginPosition = 0;
                            endPosition = width * 2;
                        }
                        
                        current = next;
                    }

                    // 强制设置effect
                    if(option.slideType === 'bgImg') {
                        effect = 'fade';
                    } 

                    // slide effect
                    if(effect === 'fade') {

                        option.slideType === 'bgImg' ? children.eq(next).css({left : 0, display : 'none'}) : children.eq(next).css({left : refPosition, display : 'none'});

                        children.eq(refPoint).fadeOut(option.slideSpeed, function(){
                            prevStatus = false;
                        });
                        children.eq(next).fadeIn(option.slideSpeed, function(){
                            nextStatus = false;
                        });

                    } else {
                        // 将下一个播放的图片预定好位置。
                        children
                            .eq(next)
                                .css({
                                    left : beginPosition,
                                    display : 'block'
                                })
                                .animate({
                                    left : refPosition,
                                    zIndex : 5
                                }, option.slideSpeed, function() {
                                    
                                    // 动画执行完的状态
                                    nextStatus = false;
                                });

                        children
                            .eq(refPoint)
                                .animate({
                                    left : endPosition
                                }, option.slideSpeed, function() {
                                    // reset postion
                                    $(this).css({
                                        left: refPosition,
                                        display: 'none',
                                        zIndex: 0
                                    });

                                    // 动画执行完的状态
                                    prevStatus = false;
                                });

                    }

                    // 标记当前页
                    if(option.paginationClass) {

                        $('.' + option.paginationClass, ele).children().removeClass(option.currentClass);
                        // add currentClass to next
                        $('.' + option.paginationClass, ele).children().eq(next).addClass(option.currentClass);
                    }
                }
            },

            stop : function() {
                clearInterval(ele.data('interval'));
            },
            // 暂停函数
            pause : function() {
                var that = this;
                direction = direction || 'next';
                // 暂停超时后继续播放
                if(option.hoverPause === true && option.hoverPauseTime !== 0) {
                    // 清除暂定间隔 和 播放间隔
                    clearTimeout(ele.data('pause'));
                    clearInterval(ele.data('interval'));

                    pauseTImeout = setTimeout(function(){
                        // 清除暂停间隔
                        clearTimeout(ele.data('pause'));
                        // 开始播放在暂停之后
                        playInterval = setInterval(function(){
                            that.animation(direction, option.effect);
                        }, option.play);
                        // 储存播放间隔
                        ele.data('interval', playInterval);
                    }, option.hoverPauseTime);

                    // 储存暂停间隔
                    ele.data('pause', pauseTImeout);
                } else {
                    // 如果没有设置暂停时间，则停止自动播放
                    this.stop();
                }
            },

            // 订阅事件
            subscibeEvents : function() {
                var that = this;
                // bind events for next
                $('.' + option.next, ele).on('click', function(e){
                    e.preventDefault();
                    if(option.play) {
                        // 如果设置了暂停时间，暂停超时后会自动播放
                        // 因此 next/prev 每次触发都会重置暂停超时时间，autoplay 异步队列排后
                        that.pause();
                    }
                    that.animation('next', option.effect);
                });

                $('.' + option.prev, ele).on('click', function(e){
                    e.preventDefault();
                    if(option.play) {
                        that.pause();
                    }
                    that.animation('prev', option.effect);
                });

                $('.' + option.paginationClass, ele).on(option.bindPaginationEvent, 'a', function(e){
                    e.preventDefault();
                    pageIndex = $('.' + option.paginationClass + '>li', ele).index($(this).parent());
                    if(next !== pageIndex) {
                        that.animation('pagination', option.effect, pageIndex);
                    }
                });

                if(option.hoverPause && option.play) {
                    control.on('mouseover mouseleave', function(e){
                        var type = e.type;
                        if(type === 'mouseover') {
                            that.stop();
                        } else if(type === 'mouseleave') {
                            that.pause();
                        }
                    })
                }
            }

        };

        Slides.init();
    });

};

// config option
$.fn.pureSlide.option = {
    slideType : 'normal',                   // string slide 类型 支持普通(normal), 背景图(bgImg), 缩略图(thumbnail)
    container : 'slides_container',         // string slide容器class
    createNextPrev : true,                  // boolean 是否生成prev,next
    next : 'next',                          // string next的class
    prev : 'prev',                          // string prev的class
    createPagination : true,                // boolean 是否生成分页
    paginationClass : 'pagination',         // string 分页容器的class
    currentClass : 'current',               // string 当前分页的class
    effect : 'slide',                       // string 幻灯片播放效果
    slideSpeed : 'normal',                  // string or number  'fast, normal, slow' or number
    fadeSpeed : 'slow',                     // string or number  'fast, normal, slow' or number
    hoverPause : true,                      // boolean 鼠标hover上去是否暂停;
    hoverPauseTime : 1000,                  // number 鼠标离开几秒后开始播放 单位是毫秒
    start : 1,                              // number 从第几个开始
    play : 3000,                            // number 间隔时间
    createImgDesc : false,                  // boolean 是否创建图片说明
    bindPaginationEvent : 'click'           // string 绑定分页的事件类型
};

