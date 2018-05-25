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
