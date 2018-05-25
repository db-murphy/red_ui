(function() {
    var nav = $('.reddata-nav').createReddataNav({
        theme: 'them-reddata',
        dataSrc: {
            menu: [
                {
                    name: '首页',
                    link: '//red.jd.com',
                    target: '_blank'
                },
                {
                    name: '运营分析',
                    link: '',
                    target: '_blank',
                    child: [
                        {
                            name: '流量分析',
                            link: '',
                            target: ''
                        },
                        {
                            name: '商品分析',
                            link: '//vip.com',
                            target: '_blank'
                        }
                    ]
                },
                {
                    name: '实时洞察',
                    link: '',
                    target: '_blank',
                    child: [
                        {
                            name: '流量分析',
                            link: '//taobao.com',
                            target: '_blank'
                        }
                    ]
                },
                {
                    name: '自助分析',
                    link: '//baidu.com',
                    target: '_blank'
                }
            ],
            userName: '',
            jumpToLogin: '//passport.jd.com/new/login.aspx'
        }
    });

    // nav.setUserName('huangxiaolong8');

    $('.redui-date-picker').redUiDatePicker({
        theme: 'them-reddata',
        customClass: 'customClass',
        dataSrc: {
            value: '2018-06-17',
            type: 'date',
            format: 'yyyy-mm-dd'
        },
        change: function(val) {

        }
    });
})();
