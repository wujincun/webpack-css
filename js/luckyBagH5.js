
/**
 * Created by Administrator on 2017/1/4.
 */
import "./flexible.js";
import "./jquery.js";
var luckyBag = {
    $hrefArea : $('.hrefArea'),
    windowH : $(window).height(),
    init:function () {
        var _this = this;
        _this.$hrefArea.each(function (key,value) {
            var themeTop = $(value).offset().top;
            if(themeTop <=  _this.windowH){
                $(value).addClass('active')
            }
        });
        this.bind();
    },
    bind:function () {
        var _this = this;
        var $rule = $('.rule');
        var $rulePop = $('.rulePop');
        $(window).on('scroll',function () {
            var scrollTop = $(window).scrollTop();
            _this.$hrefArea.each(function (key,value) {
                var themeTop = $(value).offset().top;
                if(themeTop >= scrollTop && themeTop <= scrollTop + _this.windowH){
                    $(value).addClass('active')
                }
            });
        });
        $rule.on('click',function () {
            $rulePop.show()
        });
        $rulePop.on('click','.close',function () {
            $rulePop.hide()
        })
    }
};
luckyBag.init();
