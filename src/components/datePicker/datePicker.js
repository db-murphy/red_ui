require('./datePicker.scss');
const tpl = require('./tpl.html');
const dateListTpl = require('./dateList.html');

const main = (opts) => {
	$.fn.redUiDatePicker = function(options) {
		let opts = $.extend({}, $.fn.redUiDatePicker.defaults, options);

		return this.each(function() {
			var el = $(this);

            entryFuc(el, opts);
		});
	};

	$.fn.redUiDatePicker.defaults = {};
}

const entryFuc = (el, opts) => {
	el.addClass(opts.theme?opts.theme: 'them-reddata');
	el.addClass(opts.customClass?opts.customClass: '');
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
	setTimeout(function() {
		datePickerPos(el, opts);
	}, 300);

	$(window).bind('scroll', function() {
		datePickerPos(el, opts);
	});

	// 显示隐藏
	showOrHide(el, opts);
}

const showOrHide = (el, opts) => {
	el.find('.redui-datepicker-inner').bind('click', function(ev) {
		let target = $(ev.target);

		if(target.closest('.picker-content').length) return;
		if(el.find('.picker-content').css('display') == 'none') {
			el.find('.picker-content').css('display', 'block');
		}else{
			el.find('.picker-content').css('display', 'none');
		}
	});
}

const datePickerPos = (el, opts) => {
	// console.log(el.offset());
	// 计算控件底部剩余空间高度
	let clinetHeight = $(window).height();
	let clinetWidth = $(window).width();
	let scrollTop = $(window).scrollTop();
	let dateInputPos = el.offset();
	let leftBottomHeight = clinetHeight - (dateInputPos.top - scrollTop + el.outerHeight());
	let leftTopHeight = dateInputPos.top - scrollTop;
	let leftRight = clinetWidth - dateInputPos.left;
	let leftLeft = dateInputPos.left;

	let needHeight = el.find('.picker-content').outerHeight() + 10;
	let needWidth = el.find('.picker-content').outerWidth();
	let top = false;
	let bottom = false;
	let right = false;
	let left = false;

	// 如果底部空间足够
	if(leftBottomHeight >= needHeight) {
		bottom = true;
	}

	// 如果顶部空间足够
	if(leftTopHeight >= needHeight) {
		top = true;
	}

	// 如果右侧空间足够
	if(leftRight >= needWidth) {
		right = true;
	}

	// 如果左侧空间足够
	if(leftLeft >= needWidth) {
		left = true;
	}

	if(top) {
		el.find('.picker-content').css({
			top: -needHeight - 10 + 'px'
		}).removeClass('top bottom').addClass('top');
	}

	if(bottom) {
		el.find('.picker-content').css({
			top: el.outerHeight() + 15 + 'px'
		}).removeClass('top bottom').addClass('bottom');
	}

	if(left) {
		el.find('.picker-content').removeClass('left right');
		el.find('.picker-content').css({
			left: -needWidth + el.outerWidth() + 'px'
		}).removeClass('left right').addClass('left');
	}

	if(right) {
		el.find('.picker-content').css({
			left: 0
		}).removeClass('left right').addClass('right');
	}

	if(!bottom && !top) {
		if(leftBottomHeight > leftTopHeight) {
			el.find('.picker-content').css({
				top: el.outerHeight() + 15 + 'px'
			}).removeClass('top bottom').addClass('bottom');
		}else{
			el.find('.picker-content').css({
				top: -needHeight - 10 + 'px'
			}).removeClass('top bottom').addClass('top');
		}
	}

	if(!left && !right) {
		if(leftRight > leftLeft) {
			el.find('.picker-content').css({
				left: 0
			}).removeClass('left right').addClass('right');
		}else{
			el.find('.picker-content').css({
				left: -needWidth + el.outerWidth() + 'px'
			}).removeClass('left right').addClass('left');
		}
	}


	console.log(leftBottomHeight);
}

const datePageJump = (el, opts) => {
    let dateClone = new Date(opts.dataSrc.dateNowCache);

    el.find('.date-header .next').bind('click', function() {
        if(opts.dataSrc.type == 'date') {
            opts.dataSrc.dateNowCache = dateClone.setMonth(dateClone.getMonth() + 1);
            renderDateList(el, opts);
        }
    });

    el.find('.date-header .prev').bind('click', function() {
        if(opts.dataSrc.type == 'date') {
            opts.dataSrc.dateNowCache = dateClone.setMonth(dateClone.getMonth() - 1);
            renderDateList(el, opts);
        }
    });
}

const typeSelect = (el, opts) => {
    el.find('.date-type').bind('click', function(ev) {
        let target = $(ev.target);
        let _typeLi = target.closest('.date-li');

        if(_typeLi.length) {
            let typeNow = _typeLi.attr('data-type');

            $(this).find('.date-li').removeClass('active');
            _typeLi.addClass('active');
            opts.dataSrc.type = typeNow;
            renderDateList(el, opts);
        }
    });
}

const renderDateList = (el, opts) => {
    let dateNow = opts.dataSrc.value;
    let typeNow = opts.dataSrc.type;

    if(typeNow == 'date') {
        // 按天渲染
        renderDateHtml(el, opts);
    }
}

const renderDateHtml = (el, opts) => {
    let targetTime = new Date(opts.dataSrc.dateNowCache);
	let targetTimeStr = targetTime.getFullYear() + '/' + targetTime.getMonth() + '/' + targetTime.getDate();
	let activeDate = RedUI.getTimeFromStr(opts.dataSrc.format, opts.dataSrc.value).startTime;
	let activeDateStr = activeDate.getFullYear() + '/' + activeDate.getMonth() + '/';

    el.find('.date-now').text(targetTime.getFullYear() + '-' +  RedUI.numToDuble(targetTime.getMonth() + 1));
    targetTime.setMonth(targetTime.getMonth() + 1);
    targetTime.setDate(0);
    let totalDates = targetTime.getDate(); // 获取本月总共多少天
    let liArr = [];

    // 上个月日子统计
    let lastMonth = new Date(opts.dataSrc.dateNowCache);
    lastMonth.setDate(0);
    let lastMonthDate = lastMonth.getDate();
    let lastMonthDateArr = [];

    for(let i = 0; i < lastMonthDate; i++) {
		lastMonthDateArr.push({
			active: false,
			start: false,
			end: false,
			num: i + 1
		});
    }

    // 列出本月日子
    for(let i = 0; i < totalDates; i++) {
		liArr.push({
			active: activeDateStr + (i + 1) == targetTimeStr? true: false,
			start: activeDateStr + (i + 1) == targetTimeStr? true: false,
			end: activeDateStr + (i + 1) == targetTimeStr? true: false,
			num: i + 1
		});
    };

    // 下个月日子统计
    let nextMonth = new Date(opts.dataSrc.dateNowCache);
    nextMonth.setMonth(nextMonth.getMonth() + 2);
    nextMonth.setDate(0);
    let nextMonthDate = lastMonth.getDate();
    let nextMonthDateArr = [];

    for(let i = 0; i < lastMonthDate; i++) {
		nextMonthDateArr.push({
			active: false,
			start: false,
			end: false,
			num: i + 1
		});
    }

    // 前补齐
    targetTime.setDate(1);
    let firttDay = targetTime.getDay();

    for(let i = 0; i < firttDay; i++) {
        liArr.unshift(lastMonthDateArr.pop());
    }

    // 后补齐
    targetTime.setDate(totalDates);
    let lastDay = targetTime.getDay();

    for(let i = lastDay + 1; i < 7; i++) {
        liArr.push(nextMonthDateArr.shift());
    }

    let dateListHtml = RedUI.bt.template(dateListTpl, {liArr: liArr});

    el.find('.date-list').html(dateListHtml);
}

const renderHtml = (el, data) => {
	let _html = RedUI.bt.template(tpl, data);

    el.append(_html);
}

module.exports = main;
