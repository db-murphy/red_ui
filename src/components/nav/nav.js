require('./nav.scss');
const tpl = require('./tpl.html');

const main = (opts) => {
	$.fn.createReddataNav = function(options) {
		let opts = $.extend({}, $.fn.createReddataNav.defaults, options);

		fucBind(this);

		return this.each(function() {
			var el = $(this);

            entryFuc(el, opts);
		});
	};

	$.fn.createReddataNav.defaults = {};
}

const entryFuc = (el, opts) => {
	el.addClass(opts.theme?opts.theme: 'them-reddata');

	// 整理数据
	dataFormat(opts.dataSrc.menu);

	// 渲染dom
    renderHtml(el, opts.dataSrc);

	// 交互
	newMsg(el);
}

const newMsg = (el) => {
	// el.find('.redicon').hover(function(){
	// 	console.log(1);
	// }, function() {
	// 	console.log(2);
	// });
}

const dataFormat = (data) => {
	data.forEach((item, i)=>{
		item.link = item.link?item.link: 'javascript:;';
		item.target = item.target?item.target: '_blank';

		if(item.child) {
			dataFormat(item.child);
		}
	});
}

const renderHtml = (el, data) => {
	let _html = RedUI.bt.template(tpl, data);

    el.append(_html);
}

const fucBind = function($el) {
	// 设置用户名
	$el.setUserName = function(name) {
		$el.find('.user-msg').html('<a href="javascript:;" class="user-name">'+ name +'</a>');
	}
}

module.exports = main;
