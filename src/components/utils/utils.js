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

export default {
    bt,
    getTimeFromStr,
    numToDuble
}
