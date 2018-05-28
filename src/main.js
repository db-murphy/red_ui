require('./scss/main.scss');
import Utils from './components/utils/utils';

window.RedUI = {};
$.extend(window.RedUI, Utils);

const cpArr = [
    // 导航
    require('cp/nav/nav'),

    // 日历
    require('cp/datePicker/datePicker')
];

cpArr.forEach((item, index)=>{
    item();
});

$(document).bind('click', function(ev) {
    let target = $(ev.target);
    let datePicker = target.closest('.redui-date-picker');

    if(target.closest('.picker-content').length) return;
    if(datePicker.length) {
        let dataid = datePicker.attr('data-id');

        $('.redui-date-picker').each((index, item)=>{
            if($(item).attr('data-id') != datePicker.attr('data-id')) {
                if(!$(item).find('.picker-content').hasClass('none')) {
                    RedUI.animaHide($(item).find('.picker-content'), 'redui-zoom-out-top');
                }
            }
        });
    }else{
        $('.picker-content').each((index, item)=>{
            RedUI.animaHide($(item), 'redui-zoom-out-top');
        });
    }
});
