/*! created by chhuangxiaolong@jd.com */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/baidutemplate/BaiduTemplate.js":
/*!*****************************************************!*\
  !*** ./node_modules/baidutemplate/BaiduTemplate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * baiduTemplate简单好用的Javascript模板引擎 1.0.5 版本
 * http://baidufe.github.com/BaiduTemplate
 * 开源协议：BSD License
 * 浏览器环境占用命名空间 baidu.template ，nodejs环境直接安装 npm install baidutemplate
 * @param str{String} dom结点ID，或者模板string
 * @param data{Object} 需要渲染的json对象，可以为空。当data为{}时，仍然返回html。
 * @return 如果无data，直接返回编译后的函数；如果有data，返回html。
 * @author wangxiao 
 * @email 1988wangxiao@gmail.com
*/

;(function(){

    //取得浏览器环境的baidu命名空间，非浏览器环境符合commonjs规范exports出去
    var baidu =  false ? (undefined) : module.exports;

    //用来存储页面中的js代码(用于nodejs环境)
    var jsStr = '';

    //模板函数
    baidu.template = function(str, data){

        //检查是否有该id的元素存在，如果有元素则获取元素的innerHTML/value，否则认为字符串为模板
        var fn = (function(){

            //判断如果没有document，则为非浏览器环境
            if(!this.document){
                return bt._compile(str);
            };

            //HTML5规定ID可以由任何不包含空格字符的字符串组成
            var element = document.getElementById(str);
            if (element) {
                    
                //取到对应id的dom，缓存其编译后的HTML模板函数
                if (bt.cache[str]) {
                    return bt.cache[str];
                };

                //textarea或input则取value，其它情况取innerHTML
                var tpl = /^(textarea|input)$/i.test(element.nodeName) ? element.value : element.innerHTML;
                return bt._compile(tpl);

            }else{

                //是模板字符串，则生成一个函数
                //如果直接传入字符串作为模板，则可能变化过多，因此不考虑缓存
                return bt._compile(str);
            };

        })();

        //jsStr 是将页面中<script>标签中的js代码放回页面中
        var html = fn(data);
        html = html.replace("</body>",jsStr+"</body>");

        //有数据则返回HTML字符串，没有数据则返回函数 支持data={}的情况
        var result = bt._isObject(data) ? html : fn;
        html = null;
        fn = null;

        return result;
    };

    //取得命名空间 baidu.template
    bt = baidu.template;

    //缓存  将对应id模板生成的函数缓存下来。
    bt.cache = {};
    
    //自定义分隔符，可以含有正则中的字符，可以是HTML注释开头 <! !>
    bt.LEFT_DELIMITER = bt.LEFT_DELIMITER||'<%';
    bt.RIGHT_DELIMITER = bt.RIGHT_DELIMITER||'%>';

    //自定义默认是否转义，默认为默认自动转义
    bt.ESCAPE = true;

    //HTML转义
    bt._encodeHTML = function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/\\/g,'&#92;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    };

    //转义影响正则的字符
    bt._encodeReg = function (source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g,'\\$1');
    };

    //转义UI UI变量使用在HTML页面标签onclick等事件函数参数中
    bt._encodeEventHTML = function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;')
            .replace(/\\/g,'\\\\')
            .replace(/\//g,'\\\/')
            .replace(/\n/g,'\\n')
            .replace(/\r/g,'\\r');
    };

    //将字符串拼接生成函数，即编译过程(compile)
    bt._compile = function(str){
        var funBody = "var _template_fun_array=[];\nvar fn=(function(data){\nvar _template_varName='';\nfor(name in data){\n_template_varName+=('var '+name+'=data[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('"+bt._analysisStr(str)+"');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";
        return new Function("_template_object",funBody);
    };

    //判断是否是Object类型
    bt._isObject = function (source) {
        return 'function' === typeof source || !!(source && 'object' === typeof source);
    };

    //解析模板字符串
    bt._analysisStr = function(str){

        //取得分隔符
        var _left_ = bt.LEFT_DELIMITER;
        var _right_ = bt.RIGHT_DELIMITER;

        //对分隔符进行转义，支持正则中的元字符，可以是HTML注释 <!  !>
        var _left = bt._encodeReg(_left_);
        var _right = bt._encodeReg(_right_);

        str = String(str).replace(/<script\s+type\s*=\s*['|"]text\/javascript['|"]\s*>[\s\S]*?<\/script>/g,function(item,$1){
           jsStr += (item+'\n');
           return '';
        });
        
        str = str
            
            //去掉分隔符中js注释
            .replace(new RegExp("("+_left+"[^"+_right+"]*)//.*\n","g"), "$1")

            //去掉注释内容  <%* 这里可以任意的注释 *%>
            //默认支持HTML注释，将HTML注释匹配掉的原因是用户有可能用 <! !>来做分割符
            .replace(new RegExp("<!--.*?-->", "g"),"")
            .replace(new RegExp(_left+"\\*.*?\\*"+_right, "g"),"")

            //把所有换行去掉  \r回车符 \t制表符 \n换行符
            .replace(new RegExp("[\\r\\t\\n]","g"), "")

            //用来处理非分隔符内部的内容中含有 斜杠 \ 单引号 ‘ ，处理办法为HTML转义
            .replace(new RegExp(_left+"(?:(?!"+_right+")[\\s\\S])*"+_right+"|((?:(?!"+_left+")[\\s\\S])+)","g"),function (item, $1) {
                var str = '';
                if($1){

                    //将 斜杠 单引 HTML转义
                    str = $1.replace(/\\/g,"&#92;").replace(/'/g,'&#39;');
                    while(/<[^<]*?&#39;[^<]*?>/g.test(str)){

                        //将标签内的单引号转义为\r  结合最后一步，替换为\'
                        str = str.replace(/(<[^<]*?)&#39;([^<]*?>)/g,'$1\r$2')
                    };
                }else{
                    str = item;
                }
                return str ;
            })

            //对变量后面的分号做容错(包括转义模式 如<%:h=value%>)  <%=value;%> 排除掉函数的情况 <%fun1();%> 排除定义变量情况  <%var val='test';%>
            .replace(new RegExp("("+_left+":?[hvu]?[\\s]*?=[\\s]*?[^;|"+_right+"]*?);[\\s]*?"+_right,"g"),"$1"+_right_)

            //定义变量，如果没有分号，需要容错  <%var val='test'%>
            .replace(new RegExp("("+_left+"[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?"+_right,"g"),"$1;"+_right_)

            //按照 <% 分割为一个个数组，再用 \t 和在一起，相当于将 <% 替换为 \t
            //将模板按照<%分为一段一段的，再在每段的结尾加入 \t,即用 \t 将每个模板片段前面分隔开
            .split(_left_).join("\t");

        //支持用户配置默认是否自动转义
        if(bt.ESCAPE){
            str = str

                //找到 \t=任意一个字符%> 替换为 ‘，任意字符,'
                //即替换简单变量  \t=data%> 替换为 ',data,'
                //默认HTML转义  也支持HTML转义写法<%:h=value%>  
                //.replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'");
                .replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':$1,'");
        }else{
            str = str
                
                //默认不转义HTML转义
                .replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':$1,'");
        };

        str = str

            //支持HTML转义写法<%:h=value%>  
            //.replace(new RegExp("\\t:h=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'")
            .replace(new RegExp("\\t:h=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':$1,'")

            //支持不转义写法 <%:=value%>和<%-value%>
            .replace(new RegExp("\\t(?::=|-)(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':$1,'")

            //支持url转义 <%:u=value%>
            .replace(new RegExp("\\t:u=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':encodeURIComponent($1),'")

            //支持UI 变量使用在HTML页面标签onclick等事件函数参数中  <%:v=value%>
            //.replace(new RegExp("\\t:v=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'")
            .replace(new RegExp("\\t:v=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':$1,'")

            //将字符串按照 \t 分成为数组，在用'); 将其合并，即替换掉结尾的 \t 为 ');
            //在if，for等语句前面加上 '); ，形成 ');if  ');for  的形式
            .split("\t").join("');")

            //将 %> 替换为_template_fun_array.push('
            //即去掉结尾符，生成函数中的push方法
            //如：if(list.length=5){%><h2>',list[4],'</h2>');}
            //会被替换为 if(list.length=5){_template_fun_array.push('<h2>',list[4],'</h2>');}
            .split(_right_).join("_template_fun_array.push('")

            //将 \r 替换为 \
            .split("\r").join("\\'");
        
        return str;
    };

})();

/***/ }),

/***/ "./src/components/datePicker/dateList.html":
/*!*************************************************!*\
  !*** ./src/components/datePicker/dateList.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<%for(var i = 0; i < liArr.length; i++){%>\n    <li class=\"<%if(liArr[i].active){%>active<%}%> <%if(liArr[i].start){%>start<%}%> <%if(liArr[i].end){%>end<%}%>\">\n        <div class=\"left\"></div>\n        <div class=\"date-num\"><%=liArr[i].num%></div>\n        <div class=\"right\"></div>\n    </li>\n<%}%>\n";

/***/ }),

/***/ "./src/components/datePicker/datePicker.js":
/*!*************************************************!*\
  !*** ./src/components/datePicker/datePicker.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./datePicker.scss */ "./src/components/datePicker/datePicker.scss");
var tpl = __webpack_require__(/*! ./tpl.html */ "./src/components/datePicker/tpl.html");
var dateListTpl = __webpack_require__(/*! ./dateList.html */ "./src/components/datePicker/dateList.html");

var main = function main(opts) {
	$.fn.redUiDatePicker = function (options) {
		var opts = $.extend({}, $.fn.redUiDatePicker.defaults, options);

		return this.each(function () {
			var el = $(this);

			entryFuc(el, opts);
		});
	};

	$.fn.redUiDatePicker.defaults = {};
};

var entryFuc = function entryFuc(el, opts) {
	el.addClass(opts.theme ? opts.theme : 'them-reddata');
	el.addClass(opts.customClass ? opts.customClass : '');
	opts.dataSrc.dateNowCache = RedUI.getTimeFromStr(opts.dataSrc.format, opts.dataSrc.value).startTime;

	// 渲染dom
	renderHtml(el, opts.dataSrc);

	// 类型选择
	typeSelect(el, opts);

	// 渲染日期列表
	renderDateList(el, opts);

	// 日期翻页
	datePageJump(el, opts);

	// 日历定位
	setTimeout(function () {
		datePickerPos(el, opts);
	}, 300);

	$(window).bind('scroll', function () {
		datePickerPos(el, opts);
	});
};

var datePickerPos = function datePickerPos(el, opts) {
	// console.log(el.offset());
	// 计算控件底部剩余空间高度
	var clinetHeight = $(window).height();
	var clinetWidth = $(window).width();
	var scrollTop = $(window).scrollTop();
	var dateInputPos = el.offset();
	var leftBottomHeight = clinetHeight - (dateInputPos.top - scrollTop + el.outerHeight());
	var leftTopHeight = dateInputPos.top - scrollTop;
	var leftRight = clinetWidth - dateInputPos.left;
	var leftLeft = dateInputPos.left;

	var needHeight = el.find('.picker-content').outerHeight() + 10;
	var needWidth = el.find('.picker-content').outerWidth();
	var top = false;
	var bottom = false;
	var right = false;
	var left = false;

	// 如果底部空间足够
	if (leftBottomHeight >= needHeight) {
		bottom = true;
	}

	// 如果顶部空间足够
	if (leftTopHeight >= needHeight) {
		top = true;
	}

	// 如果右侧空间足够
	if (leftRight >= needWidth) {
		right = true;
	}

	// 如果左侧空间足够
	if (leftLeft >= needWidth) {
		left = true;
	}

	if (top) {
		el.find('.picker-content').css({
			top: -needHeight - 10 + 'px'
		}).removeClass('top bottom').addClass('top');
	}

	if (bottom) {
		el.find('.picker-content').css({
			top: el.outerHeight() + 15 + 'px'
		}).removeClass('top bottom').addClass('bottom');
	}

	if (left) {
		el.find('.picker-content').removeClass('left right');
		el.find('.picker-content').css({
			left: -needWidth + el.outerWidth() + 'px'
		}).removeClass('left right').addClass('left');
	}

	if (right) {
		el.find('.picker-content').css({
			left: 0
		}).removeClass('left right').addClass('right');
	}

	if (!bottom && !top) {
		if (leftBottomHeight > leftTopHeight) {
			el.find('.picker-content').css({
				top: el.outerHeight() + 15 + 'px'
			}).removeClass('top bottom').addClass('bottom');
		} else {
			el.find('.picker-content').css({
				top: -needHeight - 10 + 'px'
			}).removeClass('top bottom').addClass('top');
		}
	}

	if (!left && !right) {
		if (leftRight > leftLeft) {
			el.find('.picker-content').css({
				left: 0
			}).removeClass('left right').addClass('right');
		} else {
			el.find('.picker-content').css({
				left: -needWidth + el.outerWidth() + 'px'
			}).removeClass('left right').addClass('left');
		}
	}

	console.log(leftBottomHeight);
};

var datePageJump = function datePageJump(el, opts) {
	var dateClone = new Date(opts.dataSrc.dateNowCache);

	el.find('.date-header .next').bind('click', function () {
		if (opts.dataSrc.type == 'date') {
			opts.dataSrc.dateNowCache = dateClone.setMonth(dateClone.getMonth() + 1);
			renderDateList(el, opts);
		}
	});

	el.find('.date-header .prev').bind('click', function () {
		if (opts.dataSrc.type == 'date') {
			opts.dataSrc.dateNowCache = dateClone.setMonth(dateClone.getMonth() - 1);
			renderDateList(el, opts);
		}
	});
};

var typeSelect = function typeSelect(el, opts) {
	el.find('.date-type').bind('click', function (ev) {
		var target = $(ev.target);
		var _typeLi = target.closest('.date-li');

		if (_typeLi.length) {
			var typeNow = _typeLi.attr('data-type');

			$(this).find('.date-li').removeClass('active');
			_typeLi.addClass('active');
			opts.dataSrc.type = typeNow;
			renderDateList(el, opts);
		}
	});
};

var renderDateList = function renderDateList(el, opts) {
	var dateNow = opts.dataSrc.value;
	var typeNow = opts.dataSrc.type;

	if (typeNow == 'date') {
		// 按天渲染
		renderDateHtml(el, opts);
	}
};

var renderDateHtml = function renderDateHtml(el, opts) {
	var targetTime = new Date(opts.dataSrc.dateNowCache);
	var targetTimeStr = targetTime.getFullYear() + '/' + targetTime.getMonth() + '/' + targetTime.getDate();
	var activeDate = RedUI.getTimeFromStr(opts.dataSrc.format, opts.dataSrc.value).startTime;
	var activeDateStr = activeDate.getFullYear() + '/' + activeDate.getMonth() + '/';

	el.find('.date-now').text(targetTime.getFullYear() + '-' + RedUI.numToDuble(targetTime.getMonth() + 1));
	targetTime.setMonth(targetTime.getMonth() + 1);
	targetTime.setDate(0);
	var totalDates = targetTime.getDate(); // 获取本月总共多少天
	var liArr = [];

	// 上个月日子统计
	var lastMonth = new Date(opts.dataSrc.dateNowCache);
	lastMonth.setDate(0);
	var lastMonthDate = lastMonth.getDate();
	var lastMonthDateArr = [];

	for (var i = 0; i < lastMonthDate; i++) {
		lastMonthDateArr.push({
			active: false,
			start: false,
			end: false,
			num: i + 1
		});
	}

	// 列出本月日子
	for (var _i = 0; _i < totalDates; _i++) {
		liArr.push({
			active: activeDateStr + (_i + 1) == targetTimeStr ? true : false,
			start: activeDateStr + (_i + 1) == targetTimeStr ? true : false,
			end: activeDateStr + (_i + 1) == targetTimeStr ? true : false,
			num: _i + 1
		});
	};

	// 下个月日子统计
	var nextMonth = new Date(opts.dataSrc.dateNowCache);
	nextMonth.setMonth(nextMonth.getMonth() + 2);
	nextMonth.setDate(0);
	var nextMonthDate = lastMonth.getDate();
	var nextMonthDateArr = [];

	for (var _i2 = 0; _i2 < lastMonthDate; _i2++) {
		nextMonthDateArr.push({
			active: false,
			start: false,
			end: false,
			num: _i2 + 1
		});
	}

	// 前补齐
	targetTime.setDate(1);
	var firttDay = targetTime.getDay();

	for (var _i3 = 0; _i3 < firttDay; _i3++) {
		liArr.unshift(lastMonthDateArr.pop());
	}

	// 后补齐
	targetTime.setDate(totalDates);
	var lastDay = targetTime.getDay();

	for (var _i4 = lastDay + 1; _i4 < 7; _i4++) {
		liArr.push(nextMonthDateArr.shift());
	}

	var dateListHtml = RedUI.bt.template(dateListTpl, { liArr: liArr });

	el.find('.date-list').html(dateListHtml);
};

var renderHtml = function renderHtml(el, data) {
	var _html = RedUI.bt.template(tpl, data);

	el.append(_html);
};

module.exports = main;

/***/ }),

/***/ "./src/components/datePicker/datePicker.scss":
/*!***************************************************!*\
  !*** ./src/components/datePicker/datePicker.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/datePicker/tpl.html":
/*!********************************************!*\
  !*** ./src/components/datePicker/tpl.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"redui-datepicker-inner\">\n    <i class=\"date-icon\"></i>\n    <p class=\"date-val\">2018-02-23</p>\n    <i class=\"arrow-down\"></i>\n    <div class=\"picker-content\">\n        <ul class=\"date-type\">\n            <li data-type=\"date\" class=\"date-li <%if(type == 'date'){%>active<%}%>\">按天查询</li>\n            <li data-type=\"day\" class=\"date-li <%if(type == 'day'){%>active<%}%>\">按周查询</li>\n            <li data-type=\"month\" class=\"date-li <%if(type == 'month'){%>active<%}%>\">按月查询</li>\n            <li data-type=\"custom\" class=\"date-li <%if(type == 'custom'){%>active<%}%>\">自定义时间段</li>\n        </ul>\n        <div class=\"date\">\n            <div class=\"date-header\">\n                <p class=\"date-now\">2018-4</p>\n                <div class=\"c\">\n                    <a href=\"javascript:;\" class=\"prev\"></a>\n                    <a href=\"javascript:;\" class=\"next\"></a>\n                </div>\n            </div>\n            <div class=\"date-con\">\n                <ul class=\"day-list clearfix\">\n                    <li>日</li>\n                    <li>一</li>\n                    <li>二</li>\n                    <li>三</li>\n                    <li>四</li>\n                    <li>五</li>\n                    <li>六</li>\n                </ul>\n                <ul class=\"date-list\"></ul>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ }),

/***/ "./src/components/nav/nav.js":
/*!***********************************!*\
  !*** ./src/components/nav/nav.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./nav.scss */ "./src/components/nav/nav.scss");
var tpl = __webpack_require__(/*! ./tpl.html */ "./src/components/nav/tpl.html");

var main = function main(opts) {
	$.fn.createReddataNav = function (options) {
		var opts = $.extend({}, $.fn.createReddataNav.defaults, options);

		fucBind(this);

		return this.each(function () {
			var el = $(this);

			entryFuc(el, opts);
		});
	};

	$.fn.createReddataNav.defaults = {};
};

var entryFuc = function entryFuc(el, opts) {
	el.addClass(opts.theme ? opts.theme : 'them-reddata');

	// 整理数据
	dataFormat(opts.dataSrc.menu);

	// 渲染dom
	renderHtml(el, opts.dataSrc);

	// 交互
	newMsg(el);
};

var newMsg = function newMsg(el) {
	// el.find('.redicon').hover(function(){
	// 	console.log(1);
	// }, function() {
	// 	console.log(2);
	// });
};

var dataFormat = function dataFormat(data) {
	data.forEach(function (item, i) {
		item.link = item.link ? item.link : 'javascript:;';
		item.target = item.target ? item.target : '_blank';

		if (item.child) {
			dataFormat(item.child);
		}
	});
};

var renderHtml = function renderHtml(el, data) {
	var _html = RedUI.bt.template(tpl, data);

	el.append(_html);
};

var fucBind = function fucBind($el) {
	// 设置用户名
	$el.setUserName = function (name) {
		$el.find('.user-msg').html('<a href="javascript:;" class="user-name">' + name + '</a>');
	};
};

module.exports = main;

/***/ }),

/***/ "./src/components/nav/nav.scss":
/*!*************************************!*\
  !*** ./src/components/nav/nav.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/nav/tpl.html":
/*!*************************************!*\
  !*** ./src/components/nav/tpl.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"inner\">\n    <h1></h1>\n    <nav class=\"clearfix\">\n        <%for(var i=0; i < menu.length; i++){%>\n            <li>\n                <a href=\"<%=menu[i].link%>\" target=\"<%=menu[i].target%>\"><%=menu[i].name%></a>\n                <%if(menu[i].child){%>\n                    <ul class=\"second-nav\">\n                        <%for(var j = 0; j < menu[i].child.length; j++){%>\n                            <li>\n                                <a href=\"<%=menu[i].child[j].link%>\" target=\"<%=menu[i].child[j].target%>\"><%=menu[i].child[j].name%></a>\n                            </li>\n                        <%}%>\n                    </ul>\n                <%}%>\n            </li>\n        <%}%>\n    </nav>\n    <div class=\"user-msg\">\n        <!-- <i class=\"redicon redicon-msg mr17\" style=\"width: 20px; height: 20px;\"></i>\n        <i class=\"redicon redicon-help mr17\" style=\"width: 20px; height: 20px;\"></i> -->\n        <%if(userName){%>\n            <a href=\"javascript:;\" class=\"user-name\"><%=userName%></a>\n        <%}else{%>\n            <a href=\"<%=jumpToLogin%>\" class=\"need-login\">ERP登录</a>\n        <%}%>\n    </div>\n</div>\n";

/***/ }),

/***/ "./src/components/utils/utils.js":
/*!***************************************!*\
  !*** ./src/components/utils/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _baidutemplate = __webpack_require__(/*! baidutemplate */ "./node_modules/baidutemplate/BaiduTemplate.js");

var _baidutemplate2 = _interopRequireDefault(_baidutemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTimeFromStr = function getTimeFromStr(format, timeStr) {
    var startTime = timeStr.split('至')[0];
    var endTime = timeStr.split('至')[1];
    var startTimeFormatStr = format.split('至')[0];
    var endTimeFormatStr = format.split('至')[1];

    return {
        startTime: getTime(startTimeFormatStr, startTime),
        endTime: getTime(endTimeFormatStr, endTime)
    };
};

var getTime = function getTime(format, timeStr) {
    if (!format || !timeStr) return null;

    var formatArr = format.split('');
    var year = '',
        month = '',
        date = '';

    formatArr.forEach(function (item, i) {
        if (item == 'y') {
            year += timeStr[i];
        } else if (item == 'm') {
            month += timeStr[i];
        } else if (item == 'd') {
            date += timeStr[i];
        }
    });

    var _date = new Date();

    _date.setFullYear(year);
    _date.setMonth(month - 1);
    _date.setDate(date);
    return _date;
};

var numToDuble = function numToDuble(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num + '';
    }
};

exports.default = {
    bt: _baidutemplate2.default,
    getTimeFromStr: getTimeFromStr,
    numToDuble: numToDuble
};

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./components/utils/utils */ "./src/components/utils/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! ./scss/main.scss */ "./src/scss/main.scss");


window.RedUI = {};
$.extend(window.RedUI, _utils2.default);

var cpArr = [
// 导航
__webpack_require__(/*! cp/nav/nav */ "./src/components/nav/nav.js"),

// 日历
__webpack_require__(/*! cp/datePicker/datePicker */ "./src/components/datePicker/datePicker.js")];

cpArr.forEach(function (item, index) {
    item();
});

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=red_ui.js.map