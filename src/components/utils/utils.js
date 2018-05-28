import bt from 'baidutemplate';

const getTimeFromStr = (format, timeStr) => {
    let startTime = timeStr.split('至')[0];
    let endTime = timeStr.split('至')[1];
    let startTimeFormatStr = format.split('至')[0];
    let endTimeFormatStr = format.split('至')[1];

    return {
        startTime: getTime(startTimeFormatStr, startTime),
        endTime: getTime(endTimeFormatStr, endTime)
    }
}

const getTime = (format, timeStr) => {
    if(!format || !timeStr) return null;

    let formatArr = format.split('');
    let year = '', month = '', date = '';

    formatArr.forEach((item, i)=>{
        if(item == 'y') {
            year += timeStr[i]
        }else if(item == 'm') {
            month += timeStr[i];
        }else if(item == 'd'){
            date += timeStr[i];
        }
    });

    let _date = new Date();

    _date.setFullYear(year);
    _date.setMonth(month - 1);
    _date.setDate(date);
    return _date;
}

const numToDuble = (num) => {
	if(num < 10) {
		return '0' + num;
	}else{
		return num + '';
	}
}

const animaShow = (el, type) => {
    let $el = $(el);

    if(!$el.hasClass('none')) return $el.removeClass(type);
    $el.removeClass(type);
    $el.removeClass('none').addClass(type).unbind('animationend').bind('animationend', function() {
        $el.removeClass(type);
    });
}

const animaHide = (el, type) => {
    let $el = $(el);


    if($el.hasClass('none')) return $el.removeClass(type);
    $el.removeClass(type);
    console.log(11);
    $el.addClass(type).unbind('animationend').bind('animationend', function() {
        $el.removeClass(type).addClass('none');
    });
}

const rndNum = () => {
    let str = Math.random() + '';

	return str.split('.')[1];
}

export default {
    bt,
    getTimeFromStr,
    numToDuble,
    animaShow,
    animaHide,
    rndNum
}
